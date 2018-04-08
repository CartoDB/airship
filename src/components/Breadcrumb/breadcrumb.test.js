import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Breadcrumb from './breadcrumb';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Breadcrumb>
        <Breadcrumb.Item path="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item path="/foo">Foo</Breadcrumb.Item>
        <Breadcrumb.Item>Wadus</Breadcrumb.Item>
      </Breadcrumb>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('links', () => {
    const component = mount(
      <Breadcrumb>
        <Breadcrumb.Item path="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item path="/foo">Foo</Breadcrumb.Item>
        <Breadcrumb.Item>Wadus</Breadcrumb.Item>
      </Breadcrumb>
    );

    expect(component.find('StyledItem').length).toBe(3);
    expect(component.find('a').length).toBe(2);
  });
});
