import React from 'react';
import renderer from 'react-test-renderer';
import Grid from './grid';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Grid />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with width param', () => {
    const component = renderer.create(<Grid width={300} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with gap param', () => {
    const component = renderer.create(<Grid gap={30} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with strings', () => {
    const component = renderer.create(<Grid width="300" gap="20" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
