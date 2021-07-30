import React from 'react';

import './movie.detail.styles.scss';

const MovieDetail = ({ detailData }) => {
  const { Poster, Title, Plot, Genre, Country, Director,
    Released, Actors, imdbRating, Writer, Production } = detailData;

  return (
    <div className='movie-detail'>
      <img className='poster-image' src={Poster} alt={Title}/>

      <h1>{Title}</h1>
      <ul className='separating-info'>
        <li>Released: {Released}</li>
        <li>imdbRating: {imdbRating}</li>
        <li>Genre: {Genre}</li>
        <li>Production: {Production}</li>
        <li>{Country}</li>
      </ul>

      <br/>
      <p>Writer: {Writer}</p>
      <p>Director: {Director}</p>
      <p>Actors: {Actors}</p>

      <br/>
      <p>{Plot}</p>
    </div>
  )
};

export default MovieDetail;
