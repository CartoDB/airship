import React from 'react';
import Dropdown from './Dropdown';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

describe('render', () => {
  jest.useFakeTimers();

  it('renders without crashing', () => {
    const component = renderer.create(
      <Dropdown>
        <Dropdown.Trigger>Click me</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Menu>
            <Dropdown.Item>All</Dropdown.Item>
            <Dropdown.Item>Open</Dropdown.Item>
            <Dropdown.Item>Fullfilled</Dropdown.Item>
            <Dropdown.Item>Close</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Content>
      </Dropdown>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('as parameter', () => {
    const component = renderer.create(
      <Dropdown as="span">
        <Dropdown.Trigger>Click me</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Menu>
            <Dropdown.Item>All</Dropdown.Item>
            <Dropdown.Item>Open</Dropdown.Item>
            <Dropdown.Item>Fullfilled</Dropdown.Item>
            <Dropdown.Item>Close</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Content>
      </Dropdown>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('click action', () => {
    const component = shallow(
      <Dropdown>
        <Dropdown.Trigger>Click me</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Menu>
            <Dropdown.Item>All</Dropdown.Item>
            <Dropdown.Item>Open</Dropdown.Item>
            <Dropdown.Item>Fullfilled</Dropdown.Item>
            <Dropdown.Item>Close</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Content>
      </Dropdown>
    );

    const button = component.find('[data-component="Dropdown.Trigger"]');
    button.simulate('click');

    expect(component.find('[data-component="Dropdown.Content"]').length).toBe(
      1
    );

    button.simulate('click');
    expect(component.find('[data-component="Dropdown.Content"]').length).toBe(
      0
    );
  });

  it('hover action', () => {
    const component = shallow(
      <Dropdown action="over">
        <Dropdown.Trigger>Click me</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Menu>
            <Dropdown.Item>All</Dropdown.Item>
            <Dropdown.Item>Open</Dropdown.Item>
            <Dropdown.Item>Fullfilled</Dropdown.Item>
            <Dropdown.Item>Close</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Content>
      </Dropdown>
    );

    const button = component.find('[data-component="Dropdown.Trigger"]');
    button.simulate('mouseenter');

    expect(component.find('[data-component="Dropdown.Content"]').length).toBe(
      1
    );

    button.simulate('mouseleave');
    jest.runTimersToTime(600);
    component.update();
    expect(component.find('[data-component="Dropdown.Content"]').length).toBe(
      0
    );
  });
});
