import { createSelector } from 'reselect';

const selectMovies = state => state.movies;

export const selectSearchQuery = createSelector(
  [selectMovies],
  movies => movies.searchQuery
);

export const selectMoviesList = createSelector(
  [selectMovies],
  movies => movies.list
);

export const selectIsLoadingSearch = createSelector(
  [selectMovies],
  movies => movies.isLoadingSearch
);

export const selectSearchError = createSelector(
  [selectMovies],
  movies => movies.searchError
);

export const selectSearchOptions = createSelector(
  [selectMovies],
  movies => movies.searchOptions
);

export const selectMoviesPage = createSelector(
  [selectMovies],
  movies => movies.page
);
