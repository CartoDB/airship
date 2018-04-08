import React from 'react';
import renderer from 'react-test-renderer';
import Legend from './legend';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Legend>
        <Legend.Panel>Hello</Legend.Panel>
      </Legend>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with size', () => {
    const component = renderer.create(
      <Legend small>
        <Legend.Panel>Hello</Legend.Panel>
      </Legend>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
