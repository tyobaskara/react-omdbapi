import React from 'react';
import renderer from 'react-test-renderer';
import Modal from './modal.component';

test('Modal snaptest', () => {
  const props = {
    children: 'children'
  };
  const component = renderer.create(
    <Modal {...props} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});