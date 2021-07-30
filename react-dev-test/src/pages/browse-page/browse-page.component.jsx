import React from 'react';
import { Route } from 'react-router-dom';

import MoviesOverview from '../../components/movies-overview/movies-overview.container';
import MoviePage from '../movie-page/movie-page.container';

const BrowsePage = ({ match }) => (
  <div className='browse-page'>
    <Route exact path={`${match.path}`} component={MoviesOverview} />
    <Route path={`${match.path}/:imdbID`} component={MoviePage} />
  </div>
);

export default BrowsePage;
