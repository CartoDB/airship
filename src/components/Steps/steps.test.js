import React from 'react';
import Steps from './steps';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Steps>
        <Steps.Header>Header</Steps.Header>
        <Steps.Content>Content 1</Steps.Content>
        <Steps.Content>Content 2</Steps.Content>
        <Steps.Content>Content 3</Steps.Content>
        <Steps.Content>Content 4</Steps.Content>
      </Steps>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders step', () => {
    const component = renderer.create(
      <Steps step={2}>
        <Steps.Header>Header</Steps.Header>
        <Steps.Content>Content 1</Steps.Content>
        <Steps.Content>Content 2</Steps.Content>
        <Steps.Content>Content 3</Steps.Content>
        <Steps.Content>Content 4</Steps.Content>
      </Steps>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders one content', () => {
    const component = mount(
      <Steps step={2}>
        <Steps.Header>Header</Steps.Header>
        <Steps.Content>Content 1</Steps.Content>
        <Steps.Content>Content 2</Steps.Content>
        <Steps.Content>Content 3</Steps.Content>
        <Steps.Content>Content 4</Steps.Content>
      </Steps>
    );
    const Content = component.find(Steps.Content);
    expect(Content.length).toBe(1);
    expect(component.text()).toMatch(/Content 3/);
  });

  it('callback', () => {
    const spy = jest.fn();
    const component = mount(
      <Steps onChange={spy}>
        <Steps.Header>Header</Steps.Header>
        <Steps.Content>Content 1</Steps.Content>
        <Steps.Content>Content 2</Steps.Content>
        <Steps.Content>Content 3</Steps.Content>
        <Steps.Content>Content 4</Steps.Content>
      </Steps>
    );

    component.instance().up();

    expect(spy).toHaveBeenCalled();
  });
});
