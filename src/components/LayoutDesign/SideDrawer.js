import React, { useState } from 'react';
import { IconButton, SwipeableDrawer, List, ListItem, ListItemText, Divider, Avatar, ListItemAvatar, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { topAnime, Color } from '../../values.js';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawerList: {
    width: 250,
    backgroundColor: Color.cardBackground
  },
  sideHead: {
    padding: 5
  }
}));

const SideDrawer = () => {
  const classes = useStyles();

  const [ state, setState ] = useState(false);

  const toggleDrawer = ( open ) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  }

  return (
    <React.Fragment key="left">
      <IconButton
        edge="start"
        className={classes.menuButton}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div className={classes.drawerList}>
          <p className={classes.sideHead}><b>Hand Picked and Top Viewed Anime for you to watch</b></p>
          <List>
            {topAnime.map((value) => (
              <Link to={value.url}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar variant="square" src={value.img} />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={<span style={{ fontSize: 14 }}>{value.title}</span>}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </Link> 
            ))}
          </List>
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  );
}

export default SideDrawer;