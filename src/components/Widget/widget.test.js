import React from 'react';
import Widget from './widget';
import renderer from 'react-test-renderer';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Widget>
        <Widget.Title>Rick & Morty</Widget.Title>
        <Widget.Description>Season 3</Widget.Description>
      </Widget>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders children', () => {
    const component = renderer.create(
      <Widget>
        <Widget.Title>Rick & Morty</Widget.Title>
        <Widget.Description>Season 3</Widget.Description>

        <p>This is a children</p>
      </Widget>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
