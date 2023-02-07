import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  Paper,
  InputBase,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { Search as SearchIcon, PersonPin, AccountCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import SideDrawer from './SideDrawer.js';
import SearchAutocomplete from '../FetchDetails/SearchAutocomplete.js';
import { searchURL } from '../../values.js';
import { Color } from '../../values.js';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAuth } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "auto",
    marginLeft: theme.spacing(1)
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  renderAutoComplete: {
    position: 'absolute',
    zIndex: 99,
    width: 'auto',
    marginTop: 50,
    marginLeft: theme.spacing(1),
  },
  accountIcon: {
    fontSize: '1.5em'
  },
  authIcon: {
    backgroundColor: '#424242',
    width: '2em'
  }
}));

const Head = () => {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [showAutoComplete, setAutoComplete] = useState(false);
  const [textInput, setInput] = useState('');
  const [animeData, setAnimeData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const wrapperRef = useRef(null);
  const globalData = useSelector(state => state);
  const dispatch = useDispatch();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleAccountClick = () => {
    if (globalData.signupOrLogin) {
      return dispatch(toggleAuth(null));
    }
    dispatch(toggleAuth('login'));
  }

  useEffect(() => {
    const search = new SearchAutocomplete(searchURL, textInput, "1");
    search.loadAnime().then(data => setAnimeData(data));
  }, [textInput]);

  // console.log(animeData);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setAutoComplete(false);
    }
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
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
      <MenuItem onClick={() => {
        (globalData.checkLogged) ? handleLogout() : handleAccountClick();
      }}>
        <p>{globalData.checkLogged ? "Logout" : "Login"}</p>
      </MenuItem>
      <MenuItem selected={(window.location.pathname === "/" | window.location.pathname.startsWith('/page')) ? true : false}>
        <Link to="/">
          <p>SUB Animes</p>
        </Link>
      </MenuItem>
      <MenuItem selected={(window.location.pathname === "/recent-dub") ? true : false} >
        <Link to="/recent-dub">
          <p>DUB Animes</p>
        </Link>
      </MenuItem>

    </Menu>
  );

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleAuthClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.reload();
  }

  const handleAuthIcon = (data) => {
    if (!data) {
      return (
        <IconButton onClick={() => handleAccountClick()}>
          <AccountCircle className={classes.accountIcon} />
        </IconButton>
      );
    } else {
      let user = (typeof data === "string") ? JSON.parse(data) : data;
      let firstLetter = user.name[0].toUpperCase();

      return (
        <div>
          <IconButton className={classes.authIcon} aria-controls="simple-menu" aria-haspopup="true" onClick={handleAuthClick}>
            {firstLetter}
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      )
    }
  }

  const renderAutoComplete = (data) => {
    if (showAutoComplete === true && data !== undefined) {
      return (
        <div style={{ display: 'block' }} className={classes.renderAutoComplete}>
          <Paper>
            <List component="nav" dense={true}>
              {data.map((value, index) => {
                if (index < 10) {
                  return (
                    <Link to={`${value.episodeURL}`}>
                      <ListItem>
                        <ListItemText primary={value.animeName} />
                      </ListItem>
                    </Link>
                  );
                }
              })}
            </List>
          </Paper>
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
  return (
    <div className={classes.grow} >
      <AppBar position="static" color="transparent">
        <Toolbar>
          <SideDrawer />
          <Typography className={classes.title} variant="h5" noWrap>
            <Link to="/">
              Gogoanime
            </Link>
          </Typography>
          <FormControl ref={wrapperRef} >
            <Paper component="form" className={classes.root} >
              <InputBase
                className={classes.input}
                placeholder="Search"
                color="secondary"
                value={textInput}
                onChange={(event) => { setInput(event.target.value) }}
                onClick={() => setAutoComplete(true)}
              />
              <Link to={`/search/keyword=${textInput}/page=1`}>
                <IconButton type="submit" className={classes.iconButton} >
                  <SearchIcon />
                </IconButton>
              </Link>
            </Paper>
            {renderAutoComplete(animeData)}
          </FormControl>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {handleAuthIcon(globalData.checkLogged)}
            <IconButton >
              <Link to="/">
                <span style={{ fontSize: '18px', color: (window.location.pathname === '/' | window.location.pathname.startsWith("/page")) ? Color.lightGreen : "white" }}>
                  SUB
                </span>
              </Link>
            </IconButton>
            <IconButton >
              <Link to="/recent-dub">
                <span
                  style={{ fontSize: '18px', color: (window.location.pathname.startsWith('/recent-dub')) ? Color.lightGreen : "white" }}>
                  DUB
                </span>
              </Link>
            </IconButton>

          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <PersonPin />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}

export default Head;