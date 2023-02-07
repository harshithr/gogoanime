import React, { useEffect, useState } from 'react';
import { Grid, Container, List, ListItem, Button, ListItemAvatar, ListItemText, Divider, Avatar } from '@material-ui/core';
import { CloudDone, NewReleases } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams } from 'react-router-dom';
// import FetchDownloadInfo from '../FetchDetails/FetchDownloadInfo.js';
import { URL2, Color, videoSaveTime } from '../../values.js';
import { storeVideo } from '../Functions/videoStorage.js';
import { useSelector } from 'react-redux';
import { saveEpisode, retriveAnime } from '../Functions/saveAnime';

const useStyles = makeStyles((theme) => ({
  sideBanner: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    },
  },
  responsive: {
    width: '100%',
    height: 0,
    overflow: 'hidden',
    paddingBottom: '57%',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: 0,
      paddingBottom: '80%',
      position: 'relative',
    }
  },
  iframe: {
    position: 'absolute',
    border: 0,
    width: '100%',
    height: '100%',
  },
  nameContainer: {
    padding: '5px'
  },
  summaryContainer: {
    padding: '5px',
    border: '1px solid',
    borderColor: 'grey'
  },
  buttonText: {
    color: 'green'
  },
  buttonContainer: {
    float: 'left',
    flexDirection: 'row',
  },
  button: {
    padding: 5,

  },
  singleButton: {
    marginTop: 3,
  },
  OGSList: {
    width: '100%',
    padding: 5,
    marginTop: 5,
    backgroundColor: Color.cardBackground,
  },
  OGSName: {
    fontSize: '12px'
  },
  navContainer: {
    width: '100%',
  },
  navItemPrevious: {
    display: 'inline-block',
    width: '33.33%',
  },
  navItemDownload: {
    display: 'inline-block',
    width: '33.33%',
    textAlign: 'center'
  },
  navItemNext: {
    display: 'inline-block',
    width: '33.33%',
    textAlign: 'right'
  },
  extLink: {
    marginTop: '10px',
    float: 'right',
    padding: '5px',
    backgroundColor: '#424242',
    borderRadius: '10px',
    textDecoration: 'underline',
    textDecorationColor: 'red'
  },
  iconStyle: {
    marginLeft: '1em'
  }
}));

const DetailsBody = (props) => {
  const classes = useStyles();

  const [animeData, setAnime] = useState([]);
  const [recentAnime, setRecent] = useState([]);
  const [downloadURL, setDownloadURL] = useState('');
  const [isMobile, setMobile] = useState(undefined);
  const globalData = useSelector(state => state);
  const [saveStatus, setSaveStatus] = useState(false);
  const [withAds, setWithAds] = useState(false);

  useEffect(() => {
    const userAgent = typeof navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    setMobile(mobile);
  }, []);

  const location = useParams();

  useEffect(() => {
    setAnime(props.animeData[0]);
  }, [props.animeData[0]]);

  useEffect(() => {
    setRecent(props.recentRelease[0]);
  }, [props.recentRelease[0]]);

  useEffect(() => {
    // const downloadInfo = new FetchDownloadInfo(`${URL2}/videos/${location.video}`);
    // downloadInfo.loadAnime().then(data => setDownloadURL(data));

    if (Array.isArray(animeData)) return;
    if (!animeData || !animeData.videoIframe) return;

    setDownloadURL(
      animeData.videoIframe.replace('streaming.php', 'download')
    )
    
  }, [animeData]);

  useEffect(() => {
    let time = setTimeout(() => {
      storeVideo(location);
    }, videoSaveTime);

    return () => clearTimeout(time);
  }, [location.video]);


  // console.log(animeData);
  //console.log(recentAnime);

  const nextText = (data) => {
    if (data !== undefined | data !== []) {
      let currentIndex;
      let url = data.episodeURL;

      if (url !== undefined) {
        url.map((value, index) => {
          if (value === `/videos/${location.video}`) {
            currentIndex = --index;
          }
        });
        return (<Link to={`${url[currentIndex]}`}>{(currentIndex !== -1) ? "Next EP >>" : ""}</Link>);
      }
    } else {
      return console.log('data did not render');
    }
  }

  const previousText = (data) => {
    if (data !== undefined | data !== []) {
      let currentIndex;
      let url = data.episodeURL;

      if (url !== undefined) {
        url.map((value, index) => {
          if (value === `/videos/${location.video}`) {
            currentIndex = ++index;
          }
        });
        return (<Link to={`${url[currentIndex]}`}>{(url[currentIndex] !== undefined) ? "<< Previous EP" : ""}</Link>);
      }
    } else {
      return console.log('data did not render');
    }
  }

  useEffect(() => {
    if (globalData.checkLogged) {
      let autoSaveAnime = setTimeout(async () => {
        const response = await retriveAnime(globalData.checkLogged);
      
        if (location && response) {
          let params = location.video.replace(/\/videos\/|-episode.+/g, "");
          let foundAnime = response.data.anime.find(value => params === value.episodeUrl.replace(/-episode.+/, ''));
      
          if (foundAnime && animeData && globalData.checkLogged) {
            let sendData = {
              name: animeData.episodeName,
              url: location.video,
              img: 'default'
            }

            const saveResponse = await saveEpisode(sendData, globalData.checkLogged);
            
            setSaveStatus(saveResponse);
          }
        }
      }, 5 * 60 * 1000);

      return () => clearTimeout(autoSaveAnime);
    }
  }, [animeData])

  const handleButtonHighlight = (data) => {
    //console.log(data);
    return (window.location.pathname === data) ? "secondary" : "inherit";
  }

  const handleSave = (data) => {
    if (globalData.checkLogged && data) {

      const handleEpisodeSave = async () => {
        const sendData = {
          name: data.episodeName,
          url: window.location.pathname,
          img: 'default'
        };

        const user = globalData.checkLogged;
        const status = await saveEpisode(sendData, user);

        (status) ? setSaveStatus(true) : setSaveStatus(false);
      }

      return (
        <Button size="small" variant="outlined" disabled={saveStatus} onClick={() => handleEpisodeSave(data)}>
          {(saveStatus) ? "Saved" : "Save"} {(saveStatus) && <CloudDone className={classes.iconStyle} />} 
        </Button>
      )
    } else {
      return null;
    }
  }

  const renderDetails = (data) => {
    if (data !== undefined) {
      let num = data.episodeNumber;
      let url = data.episodeURL;

      const iframeLink = withAds ? data.videoIframe : `${process.env.REACT_APP_GOGOANIMEHOME_API}/static/index.html?anime=${location.video}`;

      return (
        <Container>
          <div >
            <div className={classes.nameContainer}>
              <h2>{data.episodeName}</h2>
              <span><b>Anime Info:</b> {data.videoDetailName}</span>
            </div>
            {handleSave(data)}
            <div className={classes.extLink}>
              <a href={`https://v2.gogoanime.co.in/videos/${location.video}`}>Check out our new app for better experience, Watch in v2.gogoanime.co.in</a>
            </div>
            <div>
              <Button size='small' variant='contained' onClick={() => setWithAds(!withAds)}>{withAds ? 'Ads free' : 'with ads'}</Button>
            </div>
            <div className={classes.responsive}>
              <iframe src={iframeLink} target="_self" className={classes.iframe} allowFullScreen scrolling={withAds ? 'no' : 'yes'} />
            </div>
            <div className={classes.navContainer}>
              <div className={classes.navItemPrevious}>
                <p style={{ display: "inline-block", flexGrow: 1 }}>{previousText(animeData)}</p>
              </div>
              <div className={classes.navItemDownload} >
                <Button
                  size="small"
                  variant="contained"
                  style={{ display: "inline-block" }}
                  onClick={() => window.open(downloadURL, "_black")}
                >
                  Download
                </Button>
              </div>
              <div className={classes.navItemNext}>
                <p style={{ display: "inline-block", flexGrow: 1 }}>{nextText(animeData)}</p>
              </div>
            </div>
            <p className={classes.summaryContainer}><b>Summary:</b> {data.videoSummary}</p>
            <div>
              <List dense={true}>
                <div className={classes.buttonContainer}>
                  {(num !== undefined) ? num.map((value, index) => (
                    <Link to={url[index]} className={classes.button} >
                      <Button size="small" variant="outlined" color={handleButtonHighlight(data.episodeURL[index])} className={classes.singleButton}>
                        EP {value}
                      </Button>
                    </Link>
                  )) : console.log('nono')}
                </div>
              </List>
            </div>
          </div>
        </Container>
      );
    } else {
      return (
        <a href={`http://gogoanimehome.com/videos/${location.video}`}>If this site is slow, Watch in gogoanimehome.com</a>
      );
    }
  }

  const renderRecentRelease = (data) => {
    if (recentAnime !== undefined) {
      return (
        <List
          className={classes.OGSList}
          dense={true}
          subheader={<p><NewReleases /> Latest Episodes</p>}
        >
          {data.map((data, index) => {
            if (index < 10) {
              return (
                <div>
                  <Link to={`${data.url}`}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar variant="rounded" alt={data.name} src={data.img} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={<p className={classes.OGSName}>{data.name}</p>}
                      />
                    </ListItem>
                    <Divider variant="fullWidth" />
                  </Link>
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
        <Grid item className={classes.sideBanner} lg={1} xl={2} >
          <div ></div>
        </Grid>
        <Grid item lg={7} md={8} sm={12} xs={12} xl={6}>
          <div style={{ width: '100%' }}>
            {renderDetails(animeData)}
          </div>
        </Grid>
        <Grid item lg={3} md={4} sm={12} xs={12} xl={2}>
          <div style={{ width: "100%" }}>
            <div style={{ textAlign: 'center', border: '1px solid #424242' }}>
              <iframe srcDoc={`
              <script data-cfasync="false" type="text/javascript" src="http${(window.location.protocol === 'https:' ? 's' : '')}://www.linkonclick.com/a/display.php?r=4439087"></script>
            `} scrolling="no" style={{ width: '300px', height: '250px', border: 0 }}></iframe>
              {/* <iframe srcDoc={`<html><body><script type='text/javascript'>
                atOptions = {
                  'key' : '991db83fd03d839aca2c612d341a17af',
                  'format' : 'iframe',
                  'height' : 250,
                  'width' : 300,
                  'params' : {}
                }
                
                document.write('<scr' + 'ipt type="text/javascript" src="http${(window.location.protocol === 'https:' ? 's' : '')}://www.displaynetworkcontent.com/991db83fd03d839aca2c612d341a17af/invoke.js"></scr' + 'ipt>');
              </script></body></html>`} scrolling="no" style={{ width: '300px', height: '250px', border: 0 }}></iframe> */}
            </div>
            {(isMobile) ? null : renderRecentRelease(recentAnime)}
            {/* {renderRecentRelease(recentAnime)} */}
          </div>
        </Grid>
        {/* Put ads to the below empty grid */}
        <Grid item className={classes.sideBanner} lg={1} xl={2} >
          <div></div>
        </Grid>
      </Grid>

    </div>
  );
}

export default DetailsBody;