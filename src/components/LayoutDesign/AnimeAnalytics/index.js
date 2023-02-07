import React from 'react';
import classes from './animeAnalytics.module.css';
import { useHistory } from 'react-router-dom';

const AnimeAnalytics = ({ animeData }) => {

  const history = useHistory();

  const renderAnimes = (data) => {
    if (data) {
      return (
        <table className={classes.tableContainer}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Title</th>
              <th>Viewers</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => (
              <tr onClick={() => history.push(`/videos/${value.episodeUrl}`)}>
                <td>{index + 1}</td>
                <td>{value.title}</td>
                <td>{value.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    } else {
      return <p>Loading...</p>
    }
  }

  return (
    <>
      <h1>Trending animes on gogoanime.</h1>
      {renderAnimes(animeData)}
    </>
  )
}

export default AnimeAnalytics;