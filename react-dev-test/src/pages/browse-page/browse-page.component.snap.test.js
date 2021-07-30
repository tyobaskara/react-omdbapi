import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import BrowsePage from './browse-page.component';

jest
  .mock('../../components/movies-overview/movies-overview.container', () => 'MoviesOverview')
  .mock('../movie-page/movie-page.container', () => 'MoviePage');

test('BrowsePage snaptest', () => {
  const props = {
    match: {
      path: '/'
    }
  };
  const component = renderer.create(
    <BrowserRouter>
      <BrowsePage {...props} />
    </BrowserRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});