import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './PaginationComponent.css';

const SearchPageComponent = (props) => {

  const location = useParams();
  //console.log(location);
  const renderPage = (data) => {
    if (data.length !== null) {
      return (
        data.map((value, index) => (
          <Link key={Math.random()} to={`${props.pageURL}=${value}`} className={(location.page === value) ? 'active' : null} >{value}</Link>
        ))
      )
    } else {
      return console.log('data did not render');
    }
  }

  return (
    <div className="container">
      <div className="pagination">
        <a>&laquo;</a>
        {renderPage(props.pagination)}
        <a>&raquo;</a>
      </div>
    </div>
  );
}

export default SearchPageComponent;