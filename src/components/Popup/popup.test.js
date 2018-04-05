import React from 'react';
import Popup from './popup';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

const TEST_IMAGE = '';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Popup />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with a different background color', () => {
    const component = renderer.create(<Popup background="#fabada" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with content', () => {
    const component = renderer.create(
      <Popup>
        <p>Hello there</p>
        <p>General Kenobi</p>
      </Popup>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with an image and content', () => {
    const component = renderer.create(
      <Popup image="jarjar.jpg">
        <p>Hello there</p>
        <p>General Kenobi</p>
      </Popup>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with an image only', () => {
    const component = renderer.create(<Popup image="jarjar.jpg" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
