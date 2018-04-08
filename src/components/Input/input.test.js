import React from 'react';
import renderer from 'react-test-renderer';
import Input from './input';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Input htmlFor="first_name" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with a different type', () => {
    const component = renderer.create(<Input htmlFor="first_name" type="password" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders disabled', () => {
    const component = renderer.create(<Input htmlFor="first_name" disabled />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders read only', () => {
    const component = renderer.create(<Input htmlFor="first_name" readOnly />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with an error', () => {
    const component = renderer.create(<Input htmlFor="first_name" error="This field is required" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with a label', () => {
    const component = renderer.create(<Input htmlFor="first_name" label="First Name" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with a value', () => {
    const component = renderer.create(<Input htmlFor="first_name" value="Wadus" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders a placeholder', () => {
    const component = renderer.create(<Input htmlFor="first_name" placeholder="Your first name" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('uses htmlFor for the label, and adds it as the input id', () => {
    const component = renderer.create(<Input htmlFor="first_name" label="First Name" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders a textarea', () => {
    const component = renderer.create(<Input htmlFor="first_name" multiline rows={5} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
