import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Grid, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { StarBorderRounded } from '@material-ui/icons';
import PaginationComponent from './Pagination/PaginationComponent.js';
import { MenuButton } from '../Helper/MenuButton';

import Footer from './Footer.js';
import { Color } from '../../values.js';

const useStyles = makeStyles((theme) => ({
  sideBanner: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    },
  },
  epiName: {
    fontSize: '12px',
  },
  epiTime: {
    fontSize: '10px',
  },
  card: {
    flexDirection: 'row',
    float: 'left',
    width: '25%',
    padding: 5,
    marginTop: 5,
    borderRight: '2px solid #000000',
    borderBottom: '2px solid #00695c',
    height: 340,
    backgroundColor: Color.cardBackground,
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      padding: 5
    }
  },
  cardContent: {
    padding: 0, 
    textAlign: 'center',
    width: '85%',
    display: 'inline-block',
    [theme.breakpoints.only('sm')]: {
      width: '80%'
    }
  },
  OGSList: {
    width: '100%',
    padding: 5,
    marginTop: 5,
    marginLeft: 5,
    backgroundColor: Color.cardBackground,
  },
  OGSName: {
    fontSize: '12px'
  },
}));

const BodyStartPage = (props) => {
  const classes = useStyles();
  const [animeData, setAnime] = useState([]);
  const [onGoingSeries, setOnGoing] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [ isMobile, setMobile ] = useState(undefined);
  

  useEffect(() => {
    const userAgent = typeof navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    setMobile(mobile);
  }, []);

  useEffect(() => {
    setAnime(props.data);
  }, [props.data]);

  useEffect(() => {
    setOnGoing(props.onGoingAnime);
  }, [props.onGoingAnime]);

  useEffect(() => {
    setPagination(props.pagination);
  }, [props.pagination]);

  //console.log(pagination);



  // useEffect(() => {
  //   if (animeData !== undefined) {
  //     animeData.map((data) => console.log(data));
  //   }
  // });

  const renderItems = (data) => {
    if (animeData !== undefined) {
      return (
        data.map((data) => (
          <Link to={`${data.url}`} className="videoLink">
          <Card className={classes.card}>
            <CardMedia 
              component="img"
              height="240"
              image={data.img}
            />
            <CardContent className={classes.cardContent} >
              <p className={classes.epiName}>{data.name}</p>
              <span className={classes.epiTime}>{data.time}</span>
            </CardContent>
            <MenuButton name={data.name} url={data.url} image={data.img} />
          </Card>
          </Link>
        ))
      );
    } else {
      return console.log('Data did not render');
    }
  }

  const renderOnGoingSeries = (data) => {
    if ( onGoingSeries !== undefined) {
      return (
        <List 
          className={classes.OGSList} 
          dense={true}
          subheader={<p><StarBorderRounded /> Popular On-Going Series</p>}
        >
          { data.map((data, index) => {
            if (index < 15) {
            return (
            <div>
              <Link to={`${data.url}`} className="videoLink">
                <ListItem>
                  <ListItemAvatar>
                    <Avatar variant="rounded" alt={data.name} src={data.img} />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={<p className={classes.OGSName}>{data.name}</p>}
                  />
                </ListItem>
              </Link>
              <Divider variant="fullWidth" />
            </div>
            )
            } 
        })}
        </List>
      );
    } else {
      return console.log('Data did not render');
    }
  }

  return (
    <div>
      <Grid container={true}>
        {/* Put ads to the below empty grid */}
        <Grid item className={classes.sideBanner} lg={1} xl={1}  >
          <div ></div>
        </Grid>
        <Grid item lg={8} md={10} sm={12} xs={12} xl={8}>
          <div style={{ width: '100%'}}>
            {renderItems(animeData)}
          </div>
          <div style={{ flexDirection: 'column', float: "right" }}>
            <PaginationComponent pagination={pagination} pageURL={props.paginationURL} />
          </div>
        </Grid>
        <Grid item lg={2} md={2} sm={12} xs={12} xl={2}>
          <div style={{ width: "100%" }}>
            {(isMobile) ? null : renderOnGoingSeries(onGoingSeries)}
            {/* {renderOnGoingSeries(onGoingSeries)} */}
          </div>
        </Grid>
        {/* Put ads to the below empty grid */}
        <Grid item className={classes.sideBanner} lg={1} xl={1} >
          <div></div>
        </Grid>
      </Grid>
      
      <Footer />
    </div>
  );  
}

export default BodyStartPage;