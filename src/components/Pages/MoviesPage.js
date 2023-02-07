import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HomePage from '../FetchDetails/HomePage.js';
import Head from '../LayoutDesign/Head.js';
import Body from '../LayoutDesign/BodyStartPage.js';
import NavHead from '../LayoutDesign/NavHead.js';
import { onGoingSeries, moviesURL } from '../../values.js';
import Pagination from '../FetchDetails/HomePagePagination.js';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { useSelector } from 'react-redux';
import Greet from '../Helper/Greet';

const MoviesPage = () => {
  const globalData = useSelector(state => state);

  let [ animeData, setAnimeData ] = useState([]);
  let [ onGoingAnime, setOnGoing ] = useState([]);
  let [ pagination, setPagination ] = useState([]);

  let { page } = useParams();
  //console.log(page);

  const handlePage = () => {
    return (page === undefined | page === null ) ? 1 : page;
  }

  useEffect(() => {
    document.title = 'Gogoanime | Watch anime movies in HD - both SUB and DUB';
    document.getElementsByTagName("meta")[3].content = 'Gogoanime, watch anime movies in HD, movies are updated frequently';
  }, []);

  useEffect(() => {
    const anime = new HomePage(moviesURL, handlePage());
    anime.loadAnime().then(data => setAnimeData(animeData = data));
  }, [window.location.pathname]);

  useEffect(() => {
    const anime = new HomePage(onGoingSeries, 1);
    anime.loadAnime().then(data => setOnGoing(data));
  }, [window.location.pathname]);

  useEffect(() => {
    const pagination = new Pagination(moviesURL, handlePage());
    pagination.loadPagination().then(data => {
      setPagination(data);
    });
  }, [window.location.pathname]);

  //console.log(animeData[0]);
  //console.log(pagination);

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
      <Body data={animeData[0]} onGoingAnime={onGoingAnime[0]} pagination={pagination} paginationURL={'/movies/page'} />
    </div>
  );
}

export default MoviesPage;