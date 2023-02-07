import React, { useState, useEffect } from 'react';
import Head from '../LayoutDesign/Head.js';
import NavHead from '../LayoutDesign/NavHead.js';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { useSelector } from 'react-redux';
import { retriveAnime } from '../Functions/saveAnime.js';
import Body from '../LayoutDesign/MyAnime';

const MyAnime = () => {
  const globalData = useSelector(state => state);
  const [ animeData, setAnimeData ] = useState(null);

  useEffect(() => {
    if (globalData.checkLogged) {
      (async () => {
        const getAnime = await retriveAnime(globalData.checkLogged);
        (getAnime) ? setAnimeData(getAnime.data.anime) : setAnimeData(null);
      })();
    }
  }, [globalData.checkLogged]);

  const handleAuthToggle = (data) => {
    if (data === "login") {
      return <Login />
    } else if (data === "register") {
      return <Register />
    }
  }

  return (
    <div>
      <Head />
      <NavHead />
      {handleAuthToggle(globalData.signupOrLogin)}
      <Body animeData={animeData} />
    </div>
  );
}

export default MyAnime;