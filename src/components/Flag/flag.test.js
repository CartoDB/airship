import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Flag from './flag';

describe('render', () => {
  it('renders without crashing', () => {
    const spy = jest.fn();
    const component = renderer.create(
      <Flag onClick={spy}>
        <Flag.Icon>Icon</Flag.Icon>
        <Flag.Content>Content</Flag.Content>
      </Flag>
    );
    const tree = component.toJSON();
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
