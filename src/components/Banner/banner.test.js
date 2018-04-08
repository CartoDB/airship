import React from 'react';
import renderer from 'react-test-renderer';
import Banner from './banner';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Banner color="red">
        <Banner.Icon>Icon</Banner.Icon>
        <Banner.Content>Content</Banner.Content>
      </Banner>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
