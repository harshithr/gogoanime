import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Color } from '../../../values';
import { TextField, Grid, Button } from '@material-ui/core';
import { loginUser } from '../../Functions/auth';
import { useDispatch } from 'react-redux';
import { setLoggedIn, toggleAuth } from '../../../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: Color.cardBackground,
    textAlign: 'center',
    marginTop: '-1.3em',
    paddingTop: '1em'
  },
  inputField: {
    width: '80%',
  },
  btn: {
    width: '80%'
  },
  regBtn: {
    width: '40%',
    marginTop: '1em'
  },
  responseDiv: {
    backgroundColor: Color.boldRed,
  },
  responseText: {
    padding: '0.5em 0'
  }
}));

const Login = () => {
  const classes = useStyles();
  const [response, setResponse] = useState(false);
  const dispatch = useDispatch();

  const userInput = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    let input = userInput.current.value;
    const response = await loginUser(input);
    
    if (response && response.status === "success") {
      dispatch(setLoggedIn(response.data));
      localStorage.setItem('username', JSON.stringify(response.data));
      dispatch(toggleAuth(null));
    }
    setResponse((typeof response !== "object") ? response : null);
  }

  return (
    <div className={classes.root}>
      <h1>Login</h1>
      <p>We only need username to login or register.</p>
      <Grid container >
        <Grid item md={2} lg={2} xl={2}></Grid>
        <Grid container xs={12} sm={12} md={8} lg={8} xl={8}>
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} >
            <TextField id="filled-basic" inputRef={userInput} className={classes.inputField} placeholder="Username Ex: Luffy" variant="outlined" />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
            <Button variant="outlined" className={classes.btn} onClick={(e) => handleLogin(e)}>Submit</Button>
          </Grid>
        </Grid>
        <Grid item md={2} lg={2} xl={2}></Grid>
      </Grid>
      <Button variant="container" className={classes.regBtn} onClick={() => dispatch(toggleAuth('register'))}>OR, REGISTER</Button>
      {response && (
        <div className={classes.responseDiv}>
          <h4 className={classes.responseText}>{response}</h4>
        </div>
      )}
    </div>
  )
}

export default Login;