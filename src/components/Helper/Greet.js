import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import { useSelector } from 'react-redux';

const Greet = () => {
  const globalData = useSelector(state => state);
  const history = useHistory();

  const handleGreet = (data) => {
    if (data) {
      let user = (typeof data === "string") ? JSON.parse(data) : data;
      return (<h4 className="greet">Welcome <strong>{user.name}</strong>, Check saved animes on <strong className="greetMyAnime" onClick={() => history.push('/myanime')}>MyAnime</strong> menu</h4>);
    }
  }
  return (
    <div>
      {handleGreet(globalData.checkLogged)}
    </div>
  );
}

export default Greet;