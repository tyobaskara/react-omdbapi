import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Header from './header.component';

test('Header snaptest', () => {
  const props = {};
  const component = renderer.create(
    <BrowserRouter>
      <Header {...props} />
    </BrowserRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});