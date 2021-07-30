import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import CardMovie from './card-movie.component';

test('CardMovie snaptest', () => {
  const props = {
    imdbID: '123',
    Poster: 'Poster',
    Title: 'Title',
    Type: 'Type',
    Year: 'Year',
    onClick: () => {},
    match: {
      path: 'path'
    },
  }
  const component = renderer.create(
    <BrowserRouter>
      <CardMovie {...props} />
    </BrowserRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});