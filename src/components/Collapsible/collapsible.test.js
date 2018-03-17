import React from 'react';
import Collapsible from './collapsible';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Collapsible>
        <Collapsible.Header>Header</Collapsible.Header>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders open', () => {
    const component = shallow(
      <Collapsible open={true}>
        <Collapsible.Header>Header</Collapsible.Header>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible>
    );
    expect(component.find(Collapsible.Content).length).toBe(1);
  });

  it('callback', () => {
    const spy = jest.fn();
    const component = mount(
      <Collapsible onChange={spy}>
        <Collapsible.Header>Header</Collapsible.Header>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible>
    );

    component.instance().toggle();

    expect(spy).toHaveBeenCalled();
  });
});
