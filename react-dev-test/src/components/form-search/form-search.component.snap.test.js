import React from 'react';
import renderer from 'react-test-renderer';
import FormSearch from './form-search.component';

jest
  .mock('../../redux/movies/movies.selectors', () => ({
    selectSearchQuery: () => '',
    selectSearchOptions: () => [],
    selectMoviesPage: () => {},
    selectMoviesList: () => []
  }));

test('FormSearch snaptest', () => {
  const props = {
    searchQuery: '', 
    searchOptions: [],  
    moviesPage: {},
    moviesList: [],
    setSearchQuery: () => {},
    setSearchOptions: () => {},
    setMoviesList: () => {},
    setIsLoadingSearch: () => {},
    setIsSearchError: () => {},
    setMoviesPage: () => {}
  };

  const component = renderer.create(
    <FormSearch {...props} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FormSearch render options snaptest', () => {
  const props = {
    searchQuery: '', 
    searchOptions: [{
      Title: 'Title',
      Year: 'Year',
      imdbID: 'imdbID'
    }],  
    moviesPage: {},
    moviesList: [],
    setSearchQuery: () => {},
    setSearchOptions: () => {},
    setMoviesList: () => {},
    setIsLoadingSearch: () => {},
    setIsSearchError: () => {},
    setMoviesPage: () => {}
  };

  const component = renderer.create(
    <FormSearch {...props} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});