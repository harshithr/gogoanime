import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HomePage from '../FetchDetails/HomePage.js';
import Head from '../LayoutDesign/Head.js';
import Body from '../LayoutDesign/BodyStartPage.js';
import NavHead from '../LayoutDesign/NavHead.js';
import { onGoingSeries, recentDUB } from '../../values.js';
import Pagination from '../FetchDetails/HomePagePagination.js';
import Greet from '../Helper/Greet';

const RecentDUB = () => {

  let [ animeData, setAnimeData ] = useState([]);
  let [ onGoingAnime, setOnGoing ] = useState([]);
  let [ pagination, setPagination ] = useState([]);

  let { page } = useParams();
  //console.log(page);

  const handlePage = () => {
    return (page === undefined | page === null ) ? 1 : page;
  }

  useEffect(() => {
    document.title = 'Gogoanime | Watch Recent DUB animes in HD - both SUB and DUB';
    document.getElementsByTagName("meta")[3].content = 'Gogoanime, watch recent dub anime in HD, animes are updated frequently';
  }, []);

  useEffect(() => {
    const anime = new HomePage(recentDUB, handlePage());
    anime.loadAnime().then(data => setAnimeData(animeData = data));
  }, [window.location.pathname]);

  useEffect(() => {
    const anime = new HomePage(onGoingSeries, 1);
    anime.loadAnime().then(data => setOnGoing(data));
  }, [window.location.pathname]);

  useEffect(() => {
    const pagination = new Pagination(recentDUB, handlePage());
    pagination.loadPagination().then(data => {
      setPagination(data);
    });
  }, [window.location.pathname]);

  //console.log(animeData[0]);
  //console.log(pagination);

  return (
    <div>
      <Head />
      <NavHead />
      <Greet />
      <Body data={animeData[0]} onGoingAnime={onGoingAnime[0]} pagination={pagination} paginationURL={'/page'} />
    </div>
  );
}

export default RecentDUB;