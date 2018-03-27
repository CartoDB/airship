import React from 'react';
import Flag from './flag';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

describe('render', () => {
  it('renders without crashing', () => {
    const spy = jest.fn();
    const component = renderer.create(
      <Flag onClick={spy}>
        <Flag.Icon>Icon</Flag.Icon>
        <Flag.Content>Content</Flag.Content>
      </Flag>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call callback when changed', () => {
    const spy = jest.fn();
    const component = shallow(
      <Flag onClick={spy}>
        <Flag.Icon>Icon</Flag.Icon>
        <Flag.Content>Content</Flag.Content>
      </Flag>
    );

    const input = component.find('button').first();
    input.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
