import axios from "axios";

export const saveEpisode = async (data, user) => {
  if (data && user) {
    const { img, name, url } = data;
    let dataToSend = {
      episodeTitle: name,
      imageUrl: img,
      episodeUrl: url.replace(/\/videos\//g, ''),
      username: user.name
    }
    const sendEpisode = await axios.post(`${process.env.REACT_APP_BACKEND}/user/addAnime`, dataToSend);
    if (sendEpisode.data === "Updated database") {
      return true;
    } else {
      return false;
    }
  }
}

export const retriveAnime = async (user) => {
  if (user) {
    let username = user.name;
    const animeList = await axios.get(`${process.env.REACT_APP_BACKEND}/user/getAnime/${username}`);

    if (animeList.data.name && animeList.data.anime.length) {
      return animeList;
    } else {
      return false;
    }
  }
}

export const trendingAnime = async () => {
  const animeList = await axios.get(`${process.env.REACT_APP_BACKEND}/anime/trending`);

  if (animeList && animeList.data.length) {
    return animeList;
  } else {
    return false;
  }
}