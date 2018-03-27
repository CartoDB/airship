import React from 'react';
import Legend from './legend';
import renderer from 'react-test-renderer';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Legend>
        <Legend.Panel>Hello</Legend.Panel>
      </Legend>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with size', () => {
    const component = renderer.create(
      <Legend small>
        <Legend.Panel>Hello</Legend.Panel>
      </Legend>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
