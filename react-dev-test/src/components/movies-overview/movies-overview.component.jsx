import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';

import FormSearch from '../form-search/form-search.container';
import CardMovie from '../card-movie/card-movie.component';
import Modal from '../modal/modal.component';
import Spinner from '../spinner/spinner.component';

import './movies-overview.styles.scss';

const MoviesOverview = (props) => {
  const { moviesList, moviesPage, setMoviesPage, isLoadingSearch, searchError } = props;
  const [ selectedMovie, setSelectedMovie ] = useState({});
  const [ showModal, setShowModal ] = useState(false);
  const loaderCheckpointRef = useRef(null);
  
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setMoviesPage({
        page: moviesPage.index + 1,
        shouldFetchMovies: true
      });
    }
  }, [moviesPage, setMoviesPage]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderCheckpointRef.current) observer.observe(loaderCheckpointRef.current);
  }, [handleObserver, moviesList]);

  const _onClick = (imdbID) => () => {
    const movie = moviesList.find(data => data.imdbID === imdbID);
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const _onCloseModal = () => {
    setShowModal(false);
  }

  const _renderPosterModal = () => {
    if (showModal) {
      return (
        <Modal 
          showModal={showModal}
          onCloseModal={_onCloseModal}
        >
          <img src={selectedMovie.Poster} alt={selectedMovie.Title}/>
        </Modal>
      )
    }

    return null;
  };

  return (
    <div className='movies-overview'>
      <FormSearch />

      <ul className='movies-list'>
        {moviesList.map((list, index) => {
          const loaderCheckpoint = (moviesPage.index * 5);

          return (
            <Fragment
              key={list.imdbID}
            >
              {index === loaderCheckpoint &&  (
                <li className='card-movie checkpoint' ref={loaderCheckpointRef} />
              )}
              <CardMovie 
                {...list}
                onClick={_onClick}
              />
            </Fragment>
          );
        })}
      </ul>

      {!!searchError && <p className='error'>Movies Not Found..</p>}
      {isLoadingSearch && <Spinner/>}
      {_renderPosterModal()}
    </div>
  );
};

export default MoviesOverview;
