import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { TrendingUp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'tachyons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAuth } from '../../redux/actions';

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
  notFound: {
    backgroundColor: 'forestgreen',
    padding: '1em',
    textAlign: 'center'
  },
  trendingContainer: {
    textAlign: 'center',
    display: 'flex',
    marginBottom: '1em'
  },
  trendingH4: {
    flexGrow: 1,
    textAlign: 'right'
  },
  trendingButton: {
    flexGrow: 1,
    backgroundColor: '#242424',
    boxShadow: '2px 2px 5px antiquewhite',
    marginTop: '1em',
    marginBottom: '1em',
    '&:hover': {
      backgroundColor: '#424242'
    }
  },
  trendIcon: {
    marginLeft: '1em'
  }
}));

const MyAnime = (props) => {
  const classes = useStyles();
  const globalData = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = () => {
    dispatch(toggleAuth('login'));
  }

  const renderAnime = (data, logged) => {
    if (data && logged) {
      return (
        <Grid container >
          <Grid item lg={1} xl={1} />
          <Grid item xs={12} sm={12} md={12} lg={10} xl={10} >
            <div className={classes.trendingContainer}>
              <Button onClick={() => history.push('/analytics')} className={classes.trendingButton}>See what's trending in gogoanime <TrendingUp className={classes.trendIcon} /></Button>
            </div>
            {data.map((value) => (
              <Link to={`/videos/${value.episodeUrl}`} id={value.episodeTitle} key={value.episodeTitle} className="videoLink">
                <div className={`bg-near-black grow bw2 shadow-5 ${classes.card}`} >
                  {(value.imageUrl !== "default") && (
                    <LazyLoadImage alt={value.episodeTitle} src={value.imageUrl} className={classes.cardImg} />
                  )}
                  <div>
                    {(value.imageUrl !== "default") ? (
                      <p className={classes.cardTitle}>{value.episodeTitle}</p>
                    ) : <h1 >{value.episodeTitle}</h1>}
                  </div>
                </div>
              </Link>
            ))}
          </Grid>
          <Grid item lg={1} xl={1} />
        </Grid>
      );
    } else if (logged) {
      return (
        <div className={classes.notFound}>
          <h2>Start saving anime to see here.</h2>
        </div>
      );
    } else {
      return (
        <div>
          <div className={classes.trendingContainer}>
            <Button onClick={() => history.push('/analytics')} className={classes.trendingButton}>See what's trending in gogoanime <TrendingUp className={classes.trendIcon} /></Button>
          </div>
          <div className={classes.notFound}>
            <h2>Please login to see your anime here. <Button variant="outlined" onClick={handleLogin}>Login</Button></h2>
          </div>
        </div>
      );
    }
  }

  return (
    <div >
      {renderAnime(props.animeData, globalData.checkLogged)}
    </div>
  );
}

export default MyAnime;