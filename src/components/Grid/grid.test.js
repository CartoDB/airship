import React from 'react';
import Grid from './Grid';
import renderer from 'react-test-renderer';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Grid />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with width param', () => {
    const component = renderer.create(<Grid width={300} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with gap param', () => {
    const component = renderer.create(<Grid gap={30} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with strings', () => {
    const component = renderer.create(<Grid width="300" gap="20" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
