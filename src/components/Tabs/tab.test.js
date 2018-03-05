import React from 'react';
import Tabs from './tab';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Tabs>
        <Tabs.Panel label="wadus">Hola</Tabs.Panel>
        <Tabs.Panel label="world">Mundo</Tabs.Panel>
      </Tabs>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with large param', () => {
    const component = renderer.create(
      <Tabs large>
        <Tabs.Panel label="wadus">Hola</Tabs.Panel>
        <Tabs.Panel label="world">Mundo</Tabs.Panel>
      </Tabs>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with selected as number', () => {
    const component = renderer.create(
      <Tabs selected={1}>
        <Tabs.Panel label="wadus">Hola</Tabs.Panel>
        <Tabs.Panel label="world">Mundo</Tabs.Panel>
      </Tabs>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with selected as string', () => {
    const component = renderer.create(
      <Tabs selected="world">
        <Tabs.Panel label="wadus">Hola</Tabs.Panel>
        <Tabs.Panel label="world">Mundo</Tabs.Panel>
      </Tabs>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call callback when changed', () => {
    const spy = jest.fn();
    const component = shallow(
      <Tabs selected="world" onChange={spy}>
        <Tabs.Panel label="wadus">Hola</Tabs.Panel>
        <Tabs.Panel label="world">Mundo</Tabs.Panel>
      </Tabs>
    );

    const button = component.find('StyledButton').first();
    button.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
