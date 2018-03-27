import React from 'react';
import Tooltip from './tooltip';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Tooltip>
        <Tooltip.Content>Hola mundo</Tooltip.Content>
        <Tooltip.Trigger>tooltip</Tooltip.Trigger>
      </Tooltip>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with as param', () => {
    const component = renderer.create(
      <Tooltip as="div">
        <Tooltip.Content>Hola mundo</Tooltip.Content>
        <Tooltip.Trigger>tooltip</Tooltip.Trigger>
      </Tooltip>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should create portal', () => {
    const component = mount(
      <Tooltip>
        <Tooltip.Content>Hola mundo</Tooltip.Content>
        <Tooltip.Trigger>tooltip</Tooltip.Trigger>
      </Tooltip>
    );

    component.setState({ visible: true });
    component.update();

    expect(document.querySelector('#modals')).toBeTruthy();
    expect(document.querySelector('#modals').childNodes.length).toBe(1);
  });
});
