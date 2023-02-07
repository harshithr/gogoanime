import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CloudDone, MoreVert } from '@material-ui/icons';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { saveEpisode } from '../Functions/saveAnime';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAuth } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  vertIcon: {
    width: '15%',
    display: 'inline-block',
    verticalAlign: 'top',
    [theme.breakpoints.only('sm')]: {
      width: '20%'
    }
  },
  iconStyle: {
    marginLeft: '1em'
  }
}));

export const MenuButton = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(false);
  const globalData = useSelector(state => state);
  const dispatch = useDispatch();

  const handleMenuClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.preventDefault();
    setAnchorEl(null);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const { name, image, url } = props;
    if (name, image, url) {
      const data = { name, img: image, url };
      const user = JSON.parse(localStorage.getItem('username'));
      const status = await saveEpisode(data, user);

      (status) ? setStatus(true) : setStatus(false);
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(toggleAuth('login'));
    setAnchorEl(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" className={classes.vertIcon} onClick={handleMenuClick}><MoreVert /></IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {(globalData.checkLogged) ? (
          <MenuItem onClick={handleSave} disabled={status}>{(status ? "Saved" : "Save")} {" "} {(status && <CloudDone className={classes.iconStyle} />)}</MenuItem>
        ) : (
          <MenuItem onClick={handleLogin}>Login to save</MenuItem>
        )}
      </Menu>
    </>
  )
}
