import React from 'react';
import Banner from './banner';
import renderer from 'react-test-renderer';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Banner color="red">
        <Banner.Icon>Icon</Banner.Icon>
        <Banner.Content>Content</Banner.Content>
      </Banner>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
