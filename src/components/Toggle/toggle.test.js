import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import Toggle from './toggle';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Toggle htmlFor="foo" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with checked param', () => {
    const component = renderer.create(<Toggle htmlFor="foo" checked />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should call callback when changed', () => {
    const spy = jest.fn();
    const component = shallow(<Toggle htmlFor="foo" onChange={spy} />);

    const input = component.find('input').first();
    input.simulate('change');

    expect(spy).toHaveBeenCalled();
  });

  it('sets \'checked\' state correcly when prop is changed', () => {
    const wrapper = mount(<Toggle htmlFor="foo" />);

    wrapper.setProps({ checked: true });

    expect(wrapper.state().checked).toBe(true);
  });
});
