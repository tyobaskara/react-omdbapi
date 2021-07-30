import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { 
  selectSearchQuery,
  selectSearchOptions,
  selectMoviesPage,
  selectMoviesList
} from '../../redux/movies/movies.selectors';

import { 
  setSearchQuery, 
  setSearchOptions,
  setMoviesList, 
  setIsLoadingSearch,
  setSearchError,
  setMoviesPage
} from '../../redux/movies/movies.actions';

import FormSearch from './form-search.component';

const FormSearchComponent = props => (<FormSearch {...props} />);

const mapStateToProps = createStructuredSelector({
  searchQuery: selectSearchQuery,
  searchOptions: selectSearchOptions,
  moviesPage: selectMoviesPage,
  moviesList: selectMoviesList
});

const mapDispatchToProps = dispatch => ({
  setSearchQuery: (value) => dispatch(setSearchQuery(value)),
  setSearchOptions: (value) => dispatch(setSearchOptions(value)),
  setMoviesList: (value) => dispatch(setMoviesList(value)),
  setIsLoadingSearch: (value) => dispatch(setIsLoadingSearch(value)),
  setSearchError: (value) => dispatch(setSearchError(value)),
  setMoviesPage: (param) => dispatch(setMoviesPage(param))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSearchComponent);