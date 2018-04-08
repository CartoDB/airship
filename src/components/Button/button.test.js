import React from 'react';
import renderer from 'react-test-renderer';
import Button from './button';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Button>Button</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with large param', () => {
    const component = renderer.create(<Button large>Button</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with small param', () => {
    const component = renderer.create(<Button small>Button</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders secondary button', () => {
    const component = renderer.create(<Button secondary>Button</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders borderless button', () => {
    const component = renderer.create(<Button borderless>Button</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
