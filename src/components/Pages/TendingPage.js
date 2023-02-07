import React, { useEffect } from 'react';
import Head from '../LayoutDesign/Head.js';
import NavHead from '../LayoutDesign/NavHead.js';
import Body from '../LayoutDesign/Trending';
// import Body2 from '../LayoutDesign/Trending/Content';
import Login from './Auth/Login';
import Register from './Auth/Register';
import { useSelector } from 'react-redux';
import Greet from '../Helper/Greet';

const TrendingPage = () => {
  const globalData = useSelector(state => state);
  
  useEffect(() => {
    let link = document.createElement('link');
    link.rel = "canonical";
    link.href = "https://gogoanime.co.in";

    document.head.appendChild(link);
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
      <Body />
      {/* <Body2 /> */}
    </div>
  );
}

export default TrendingPage;