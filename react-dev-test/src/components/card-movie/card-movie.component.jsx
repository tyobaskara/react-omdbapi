import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './card-movie.styles.scss';

const CardMovie = (props) => {
  const { imdbID, Poster, Title, Type, Year, onClick, match } = props;

  return (
    <li 
      key={imdbID}
      className='card-movie'
    >
      <div className='content-wrap'>
        <div onClick={onClick(imdbID)}>
          <img className='poster' src={Poster} alt={Title} />
        </div>
        
        <h2>{Title}</h2>
        <ul className='separating-info'>
          <li>{Type}</li>
          <li>{Year}</li>
        </ul>

        <Link 
          to={`${match.path}/${imdbID}`}
          className='link-more-info'
        >More Info</Link>
      </div>
    </li>
  );
};

export default withRouter(CardMovie);
