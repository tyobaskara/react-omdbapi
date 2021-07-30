import React from 'react';
import renderer from 'react-test-renderer';
import Spinner from './spinner.component';

test('Spinner snaptest', () => {
  const component = renderer.create(
    <Spinner/>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
