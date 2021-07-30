import { MoviesActionTypes } from './movies.types';

export const setSearchQuery = payload => ({
  type: MoviesActionTypes.SET_SEARCH_QUERY,
  payload
});

export const setSearchOptions = payload => ({
  type: MoviesActionTypes.SET_SEARCH_OPTIONS,
  payload
});

export const setMoviesList = payload => ({
  type: MoviesActionTypes.SET_MOVIES_LIST,
  payload
});

export const setIsLoadingSearch = payload => ({
  type: MoviesActionTypes.SET_IS_LOADING_SEARCH,
  payload
});

export const setSearchError = payload => ({
  type: MoviesActionTypes.SET_SEARCH_ERROR,
  payload
});

export const setMoviesPage = payload => ({
  type: MoviesActionTypes.SET_MOVIES_PAGE,
  payload
});
