import React from 'react';
import renderer from 'react-test-renderer';
import Loading from './loading';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Loading />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with size', () => {
    const component = renderer.create(<Loading size={32} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with negative', () => {
    const component = renderer.create(<Loading negative />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
