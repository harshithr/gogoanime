import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'tachyons';
import { Color } from '../../../values.js';
import axios from 'axios';
import InfoModal from '../../InfoModal';
import styles from '../../InfoModal/infoModal.module.css';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '25%',
    display: 'inline-block',
    verticalAlign: 'middle',
    height: "400px",
    textAlign: 'center',
    paddingBottom: 0,
    [theme.breakpoints.only('sm')]: {
      width: '33.33%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      height: '350px'
    },
    [theme.breakpoints.up('lg')]: {
      width: '20%',
      height: '400px'
    }
  },
  cardImg: {
    width: '80%',
    height: '84%',
    [theme.breakpoints.down('xs')]: {
      height: '75%',
      width: '90%'
    }
  },
  cardTitle: {
    fontSize: '14px'
  },
  watchListGrid: {
    padding: 5,
  },
  watchListDiv: {
    display: 'flex',
    backgroundColor: Color.cardBackground,
    height: '100%',
    padding: '2px',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  sideSection: {
    display: 'flex',
    gap: '10px',
    padding: '10px 0'
  },
  sideSectionTitle: {
    lineHeight: '0px'
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2em",
  },
  active: {
    backgroundColor: "#424242"
  },
  pageLink: {
    padding: "8px 16px"
  }

}));

var items = [
  {
    name: "Attack on Titans",
    description: "IMDB 8.9/10",
    image: '/images/attack-on-titans.jpg'
  },
  {
    name: "Record of Ragnarok",
    description: "IMDB 6.2/10",
    image: '/images/record-of-ragnarok.jpg'
  },
  {
    name: "Tokyo Ghoul",
    description: "IMDB 7.9/10",
    image: '/images/tokyo-ghoul.jpg'
  },
  {
    name: "Tower of God",
    description: "IMDB 7.9/10",
    image: '/images/tower-of-god.jpg'
  },
  {
    name: "Amnesia",
    description: "IMDB 6.1/10",
    image: '/images/idea-factory-amnesia-shin.jpg'
  },
  {
    name: "Death Note",
    description: "IMDB 9/10",
    image: '/images/death-note.jpg'
  },
]

const TrendingPage = () => {
  const classes = useStyles();

  const param = useParams();

  const [watchList, setWatchList] = useState(undefined);
  const [topList, setTopList] = useState(undefined);
  const [trendingData, setTrending] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  const page = (param.page) ? parseInt(param.page) : 1;

  useEffect(() => {
    let watch = JSON.parse(localStorage.getItem('watched'));

    if (watch) {
      let parsedList = watch.map(val => {
        return { title: val.replaceAll("-", " "), url: `videos/${val}` };
      });
      setWatchList(parsedList);
    }

    fetch(`${process.env.REACT_APP_API}/ani/most-viewed`).then(data => data.json()).then(data => {
      setTopList(data);
    });

    // axios.get(`https://gogoanime.co.in/trending2/${(param.page) ? param.page : 1}.json`)
    //   .then(data => setTrending(data.data));

    axios.get(`${process.env.REACT_APP_GOGOANIMEHOME_API}/anime/trending?page=${page}`)
      .then(data => (data.data.data) ? setTrending(data.data.data) : null);
  }, []);

  console.log(page)

  return (
    <div >
      {(!watchList) ? (
        <Carousel swipe indicators={false}>
          {items.map((item, i) => (
            <div key={item.name} style={{ backgroundImage: `url(${item.image})`, paddingTop: '35%', backgroundSize: 'cover' }}>
              <h1>{item.name}</h1>
              <h4>{item.description}</h4>
            </div>
          ))}
        </Carousel>
      ) : (
        <Grid container style={{ marginBottom: '30px' }}>
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
          <Grid container item xs={12} sm={12} md={10} lg={10} xl={10}>
            <h1 style={{ width: '100%' }}>Continue, what you were watching</h1>
            {watchList.map(value => (
              <Grid item xs={6} sm={4} md={3} lg={2} xl={2} key={value.title} className={classes.watchListGrid}>
                <Link to={value.url} className={classes.watchListDiv}>
                  <p className={classes.watchListTitle}>{value.title}</p>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
        </Grid>
      )}

      <Grid container >
        <Grid item lg={1} xl={1} />
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8} >
          {(trendingData.data) && trendingData.data.map((value) => (
            <Link to={`/videos/${value.id}-episode-1`} id={value.id} key={value.title} className={`videoLink ${styles.trendDiv}`}
              onTouchStart={() => setHoveredItem(value)}
              onTouchEnd={() => setHoveredItem(null)}
              onMouseEnter={() => setHoveredItem(value)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className={`bg-near-black grow bw2 shadow-5 ${classes.card}`}  >
                <LazyLoadImage alt={value.title} src={value.image} className={classes.cardImg} />
                <div >
                  <p className={classes.cardTitle}>{value.title}</p>
                </div>
              </div>
            </Link>
          ))}
          <div className={classes.pagination}>
            {(trendingData.pagination) && trendingData.pagination.pages.map(value => (
              <Link className={`${classes.pageLink} ${(page === value) && classes.active}`} to={`/page=${value}`}>{value}</Link>

            ))}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
          <>
            <h2 className={classes.sideSectionTitle}>Most Watched anime</h2>
            {topList?.map(value => (
              <Link to={`/search/keyword=${value.attributes.canonicalTitle}/page=1`} className={classes.sideSection}>
                <img src={value.attributes.posterImage.tiny} />
                <div>
                  <p>{value.attributes.canonicalTitle}</p>
                  <span>{value.attributes.secDescription.substring(0, 50)}...</span>
                </div>
              </Link>
            ))}
          </>
        </Grid>
        <Grid item lg={1} xl={1} />
      </Grid>
      {hoveredItem && (
        <InfoModal data={hoveredItem} />
      )}
    </div>
  );
}

export default TrendingPage;