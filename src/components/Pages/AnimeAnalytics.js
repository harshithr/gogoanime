import React, { useState, useEffect, useMemo } from 'react';
import Head from '../LayoutDesign/Head.js';
import NavHead from '../LayoutDesign/NavHead.js';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { useSelector } from 'react-redux';
import { trendingAnime } from '../Functions/saveAnime.js';
import Body from '../LayoutDesign/AnimeAnalytics';

const MyAnime = () => {
  const globalData = useSelector(state => state);
  const [animeData, setAnimeData] = useState(null);

  useMemo(async () => {
    if (!animeData) {
      const getAnime = await trendingAnime();
      (getAnime && getAnime.data) ? setAnimeData(getAnime.data) : setAnimeData(null);
    }
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const getAnime = await trendingAnime();
  //     (getAnime && getAnime.data) ? setAnimeData(getAnime.data) : setAnimeData(null);
  //   })();
  // }, []);

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