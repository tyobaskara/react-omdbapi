import { MoviesActionTypes } from './movies.types';

export const INITIAL_STATE = {
  searchQuery: '',
  searchOptions: [],
  list: [],
  isLoadingSearch: false,
  searchError: '',
  page: {
    index: 1,
    shouldFetchMovies: false
  }
};

const moviesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MoviesActionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      };
    case MoviesActionTypes.SET_SEARCH_OPTIONS:
      return {
        ...state,
        searchOptions: action.payload
      };
    case MoviesActionTypes.SET_MOVIES_LIST:
      return {
        ...state,
        list: action.payload
      };
    case MoviesActionTypes.SET_IS_LOADING_SEARCH:
      return {
        ...state,
        isLoadingSearch: action.payload
      };
    case MoviesActionTypes.SET_SEARCH_ERROR:
      return {
        ...state,
        searchError: action.payload
      };
    case MoviesActionTypes.SET_MOVIES_PAGE:
      return {
        ...state,
        page: {
          index: action.payload.page || state.page.index,
          shouldFetchMovies: action.payload.shouldFetchMovies
        }
      };
    default:
      return state;
  }
};

export default moviesReducer;
