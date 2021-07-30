import React, { useEffect, useState } from 'react';

import MovieDetail from '../../components/movie-detail/movie-detail.component';
import Spinner from '../../components/spinner/spinner.component';

import { getMovieDetail } from './movie-page.utils';

import './movie.styles.scss';

const MoviePage = ({ imdbID }) => {
  const [ movieDetail, setMovieDetail ] = useState({});
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState('');

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsLoading(true);

      try {
        const result = await getMovieDetail(imdbID);
        setMovieDetail(result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError('Something Went Wrong, Try refresh page!');
      }
    }

    fetchMovieDetail();
  }, [imdbID]);

  const renderMovieDetail = () => {
    return isLoading ? (
      <Spinner /> 
    ) : (
      <MovieDetail 
        detailData={movieDetail}
      />
    );
  };

  const renderError = () => {
    return <div className='error-message'>{error}</div>
  }

  return (
    <div className='movie-page'>
      { error ? renderError() : renderMovieDetail()}
    </div>
  );
};

export default MoviePage;
