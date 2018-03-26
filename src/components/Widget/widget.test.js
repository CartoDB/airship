import React from 'react';
import Widget from './widget';
import renderer from 'react-test-renderer';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Widget />
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with the title prop', () => {
    const component = renderer.create(
      <Widget title="Rick & Morty" />
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with the decription prop', () => {
    const component = renderer.create(
      <Widget description="Rick & Morty" />
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders children', () => {
    const component = renderer.create(
      <Widget>This is a children</Widget>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
