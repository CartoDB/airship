import React from 'react';
import renderer from 'react-test-renderer';
import Breadcrumb from './breadcrumb';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Foo</Breadcrumb.Item>
        <Breadcrumb.Item>Wadus</Breadcrumb.Item>
      </Breadcrumb>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with links', () => {
    const component = renderer.create(
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/">Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/foo">Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Wadus</Breadcrumb.Item>
      </Breadcrumb>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
