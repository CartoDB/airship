import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import Collapsible from './collapsible';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Collapsible>
        <Collapsible.Header>Header</Collapsible.Header>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders open', () => {
    const component = shallow(
      <Collapsible open>
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

  it('renders with overrides', () => {
    const overrides = {
      Collapsible: `
        background: #CCC;
        width: 400px;
      `,
      'Collapsible.Header': `
        background: #AAA;
        padding: 1rem;
      `,
      'Collapsible.Content': `
        padding: 1rem;
      `,
    };

    const component = shallow(
      <Collapsible open overrides={overrides}>
        <Collapsible.Header>Header</Collapsible.Header>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible>
    );
    expect(component.find(Collapsible.Content).length).toBe(1);
  });
});
