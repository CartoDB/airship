import React from 'react';
import Button from './Button';
import renderer from 'react-test-renderer';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Button>Button</Button>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with large param', () => {
    const component = renderer.create(<Button large>Button</Button>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with small param', () => {
    const component = renderer.create(<Button small>Button</Button>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders secondary button', () => {
    const component = renderer.create(<Button secondary>Button</Button>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders borderless button', () => {
    const component = renderer.create(<Button borderless>Button</Button>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
