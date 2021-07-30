import React from 'react';
import renderer from 'react-test-renderer';
import MoviesOverview from './movies-overview.component';

const observe = jest.fn();
const unobserve = jest.fn();

// you can also pass the mock implementation
// to jest.fn as an argument
window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
}))

jest
  .mock('../form-search/form-search.container', () => 'FormSearchComponent')
  .mock('../card-movie/card-movie.component', () => 'CardMovieComponent')
  .mock('../modal/modal.component', () => 'ModalComponent')
  .mock('../spinner/spinner.component', () => 'SpinnerComponent');

test('MoviesOverview snaptest', () => {
  const props = {
    moviesList: [{
      Title: 'Title',
      Year: 'Year',
      imdbID: 'imdbID',
    }],
    moviesPage: {
      Title: 'Title',
      Year: 'Year',
      imdbID: 'imdbID',
    },
    isLoadingSearch: false, 
    searchError: '',
    setMoviesPage: () => {}
  };

  const component = renderer.create(
    <MoviesOverview {...props} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('MoviesOverview error search snaptest', () => {
  const props = {
    moviesList: [],
    moviesPage: {},
    isLoadingSearch: false, 
    searchError: 'Something went wrong',
    setMoviesPage: () => {}
  };

  const component = renderer.create(
    <MoviesOverview {...props} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('MoviesOverview loading search snaptest', () => {
  const props = {
    moviesList: [],
    moviesPage: {},
    isLoadingSearch: true, 
    searchError: '',
    setMoviesPage: () => {}
  };

  const component = renderer.create(
    <MoviesOverview {...props} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});