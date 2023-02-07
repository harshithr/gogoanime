import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Color } from '../../values.js';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "relative",
    bottom: 0,
    width: '100%',
    height: 20,
    backgroundColor: Color.cardBackground,
    textAlign: 'center',
    flexGrow: 1,
    marginTop: 10
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      Gogoanime © Copyright 2020, All Rights Reserved
    </div>
  );
}

export default Footer;