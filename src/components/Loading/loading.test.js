import React from 'react';
import Loading from './loading';
import renderer from 'react-test-renderer';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Loading />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with size', () => {
    const component = renderer.create(<Loading size={32} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with negative', () => {
    const component = renderer.create(<Loading negative />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
