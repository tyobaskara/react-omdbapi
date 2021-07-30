import React from 'react';
import renderer from 'react-test-renderer';
import MovieDetail from './movie-detail.component';

test('MovieDetail snaptest', () => {
  const props = {
    detailData: {
      Poster: 'Poster',
      Title: 'Title',
      Plot: 'Plot',
      Genre: 'Genre',
      Country: 'Country',
      Director: 'Director',
      Released: 'Released',
      Actors: 'Actors',
      imdbRating: 'imdbRating',
      Writer: 'Writer',
      Production: 'Production'
    }
  }
  const component = renderer.create(
    <MovieDetail {...props} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});