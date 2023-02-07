import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MoreVert as MoreIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import './NavHead.css';
import { Color } from '../../values.js';
import { useDispatch } from 'react-redux';
import { getLoggedIn } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  categories: {
    flexGrow: 1
  },
  showLogo: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'flex'
    },
    flexGrow: 1
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    },
    flexGrow: 1
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  appBar: {
    backgroundColor: Color.cardBackground,
  }
}));

const NavHead = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  useEffect(() => {
    dispatch(getLoggedIn());
  }, []);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const mobileMenuId = 'mobile-view';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem selected={(window.location.pathname === "/myanime") ? true : false}>
        <Link to="/myanime">
          <p>MyAnime</p>
        </Link>
      </MenuItem>
      <MenuItem selected={(window.location.pathname === "/") ? true : false}>
        <Link to="/">
          <p>Trending</p>
        </Link>
      </MenuItem>
      <MenuItem selected={(window.location.pathname === "/recent" | window.location.pathname.startsWith('/page')) ? true : false}>
        <Link to="/recent">
          <p>Recent Release</p>
        </Link>
      </MenuItem>
      <MenuItem selected={(window.location.pathname === "/movies") ? true : false}>
        <Link to="/movies">
          <p>Movies</p>
        </Link>
      </MenuItem>
      <MenuItem selected={(window.location.pathname === "/new-season") ? true : false}>
        <Link to="/new-season">
          <p>New Season</p>
        </Link>
      </MenuItem>
      <MenuItem selected={(window.location.pathname === "/popular") ? true : false}>
        <Link to="/popular">
          <p>Popular Anime</p>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} >
        <Toolbar>
          <Typography className={classes.showLogo}>
            <Link to="/">
              Gogoanime
            </Link>
          </Typography>
          <div className={classes.sectionDesktop}>
            <Typography className={classes.categories}>
              <Link to="/myanime">
                <span style={{ color: (window.location.pathname === "/myanime") ? Color.lightGreen : "white" }}>
                  MyAnime
                </span>
              </Link>
            </Typography>
            <Typography className={classes.categories}>
              <Link to="/">
                <span style={{ color: (window.location.pathname === "/") ? Color.lightGreen : "white" }}>
                  Trending
                </span>
              </Link>
            </Typography>
            <Typography className={classes.categories}>
              <Link to="/recent" >
                <span style={{ color: (window.location.pathname === "/recent" | window.location.pathname.startsWith('/page')) ? Color.lightGreen : "white" }}>
                  Recent Release
                </span>
              </Link>
            </Typography>
            <Typography className={classes.categories}  >
              <Link to="/movies" >
                <span style={{ color: window.location.pathname.startsWith('/movies') ? Color.lightGreen : "white" }}>
                  Movies
                </span>
              </Link>
            </Typography>
            <Typography className={classes.categories}  >
              <Link to="/new-season" >
                <span style={{ color: window.location.pathname.startsWith('/new-season') ? Color.lightGreen : "white" }}>
                  New Season
                </span>
              </Link>
            </Typography>
            <Typography className={classes.categories}  >
              <Link to="/popular" >
                <span style={{ color: window.location.pathname.startsWith('/popular') ? Color.lightGreen : "white" }}>
                  Popular Anime
                </span>
              </Link>
            </Typography>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}

export default NavHead;