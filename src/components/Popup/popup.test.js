import React from 'react';
import renderer from 'react-test-renderer';
import Popup from './popup';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Popup />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with a different background color', () => {
    const component = renderer.create(<Popup background="#fabada" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with content', () => {
    const component = renderer.create(
      <Popup>
        <p>Hello there</p>
        <p>General Kenobi</p>
      </Popup>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with an image and content', () => {
    const component = renderer.create(
      <Popup image="jarjar.jpg">
        <p>Hello there</p>
        <p>General Kenobi</p>
      </Popup>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with an image only', () => {
    const component = renderer.create(<Popup image="jarjar.jpg" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
