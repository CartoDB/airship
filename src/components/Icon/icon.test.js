import React from 'react';
import renderer from 'react-test-renderer';
import Icon from './icon';
import { ICONS } from '../../constants';

const ICON_LIST = Object.keys(ICONS).map(icon => icon.toLowerCase());

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Icon />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with custom color', () => {
    const component = renderer.create(
      <Icon color="#FABADA" />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with custom size', () => {
    const component = renderer.create(
      <Icon size={32} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders every icon', () => {
    const component = renderer.create(
      ICON_LIST.map(icon => <Icon key={icon} icon={icon} />)
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
