import React from 'react';
import { connect } from 'react-redux';
import MoviesOverview from './movies-overview.component';

import { setMoviesPage } from '../../redux/movies/movies.actions';
import { 
  selectMoviesList, 
  selectMoviesPage, 
  selectIsLoadingSearch,
  selectSearchError
} from '../../redux/movies/movies.selectors';

const MoviesOverviewComponent = (props) => <MoviesOverview {...props} />;

const mapStateToProps = (state, ownProps) => ({
  moviesList: selectMoviesList(state),
  moviesPage: selectMoviesPage(state),
  isLoadingSearch: selectIsLoadingSearch(state),
  searchError: selectSearchError(state),
});

const mapDispatchToProps = dispatch => ({
  setMoviesPage: (param) => dispatch(setMoviesPage(param))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesOverviewComponent);
