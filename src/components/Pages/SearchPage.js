import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../FetchDetails/Search.js';
import Head from '../LayoutDesign/Head.js';
import Body from '../LayoutDesign/BodySearchPage.js';
import NavHead from '../LayoutDesign/NavHead.js';
import HomePage from '../FetchDetails/HomePage.js';
import SearchPagination from '../FetchDetails/SearchPagination.js';
import { searchURL, onGoingSeries } from '../../values.js';

const StartPage = () => {

  let [ animeData, setAnimeData ] = useState([]);
  let [ onGoingAnime, setOnGoing ] = useState([]);
  let [ pagination, setPagination ] = useState([]);

  let { page, keyword } = useParams();
  //console.log(keyword);

  const handlePage = () => {
    return (page === undefined | page === null ) ? 1 : page;
  }

  useEffect(() => {
    document.title = 'Gogoanime | Search animes - both SUB and DUB';
    document.getElementsByTagName("meta")[3].content = 'Gogoanime, search anime from huge list';

    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    const anime = new Search(searchURL, keyword , handlePage());
    anime.loadAnime().then(data => setAnimeData(data));
  }, [window.location.pathname]);

  useEffect(() => {
    const anime = new HomePage(onGoingSeries, 1);
    anime.loadAnime().then(data => setOnGoing(data));
  }, [window.location.pathname]);

  useEffect(() => {
    const pagination = new SearchPagination(searchURL, keyword, handlePage());
    pagination.loadPagination().then(data => {
      setPagination(data);
    });
  }, [window.location.pathname]);


  //console.log(pagination);
  // console.log(animeData);

  return (
    <div>
      <Head  />
      <NavHead />
      <Body 
        data={animeData} 
        onGoingAnime={onGoingAnime[0]} 
        pagination={pagination} 
        paginationURL={`/search/keyword=${keyword}/page`} 
      />

    </div>
  );
}

export default StartPage;