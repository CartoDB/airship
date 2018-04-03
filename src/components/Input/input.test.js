import React from 'react';
import Input from './input';
import renderer from 'react-test-renderer';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Input />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with a different type', () => {
    const component = renderer.create(<Input type="password" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders disabled', () => {
    const component = renderer.create(<Input disabled />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders read only', () => {
    const component = renderer.create(<Input readOnly />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with an error', () => {
    const component = renderer.create(<Input error="This field is required" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with a label', () => {
    const component = renderer.create(<Input label="First Name" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with a value', () => {
    const component = renderer.create(<Input value="Wadus" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders a placeholder', () => {
    const component = renderer.create(<Input placeholder="Your first name" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('uses htmlFor for the label, and adds it as the input id', () => {
    const component = renderer.create(<Input htmlFor="first_name" label="First Name" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders a textarea', () => {
    const component = renderer.create(<Input multiline rows={5} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
