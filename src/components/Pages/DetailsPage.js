import React, { useEffect, useState } from 'react';
import Head from '../LayoutDesign/Head.js';
import NavHead from '../LayoutDesign/NavHead.js';
import DetailsBody from '../LayoutDesign/DetailsBody.js';
import FetchDetailsPage from '../FetchDetails/FetchDetailsPage.js';
import HomePage from '../FetchDetails/HomePage.js';
import { URL } from '../../values.js';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { useSelector } from 'react-redux';
import Greet from '../Helper/Greet';

const DetailsPage = () => {
  const globalData = useSelector(state => state);

  const [ animeData, setAnime ] = useState([]);
  let [ recentRelease, setRecent ] = useState([]);

  useEffect(() => { 
    const details = new FetchDetailsPage(`${URL}${window.location.pathname}`);
    details.loadAnime().then((data) =>  {
      setAnime(data);
    });
  }, [window.location.pathname]);

  useEffect(() => {
    const anime = new HomePage(URL, 1);
    anime.loadAnime().then(data => setRecent(data));
  }, [window.location.pathname]);

  useEffect(() => {
    let anime = window.location.pathname.replace('/videos/', '');
    document.title = `Gogoanime | Watch ${anime} and Download`;
    document.getElementsByTagName("meta")[3].content = `Gogoanime, watch ${anime} and download in HD, animes are updated frequently`;
    
    window.scrollTo(0, 0)
  }, []);

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
      <Greet />
      <DetailsBody animeData={animeData} recentRelease={recentRelease} />
    </div>
  );
}

export default DetailsPage;