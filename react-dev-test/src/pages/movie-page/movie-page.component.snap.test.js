import React from 'react';
import renderer from 'react-test-renderer';
import MoviePage from './movie-page.component';

jest
  .mock('../../components/movie-detail/movie-detail.component', () => 'MovieDetail')
  .mock('../../components/spinner/spinner.component', () => 'Spinner');

test('MoviePage snaptest', () => {
  const props = {
    imdbID: '123'
  };
  const component = renderer.create(
    <MoviePage {...props} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
