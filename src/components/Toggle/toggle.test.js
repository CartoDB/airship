import React from 'react';
import Toggle from './toggle';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Toggle htmlFor="foo" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with checked param', () => {
    const component = renderer.create(<Toggle htmlFor="foo" checked />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call callback when changed', () => {
    const spy = jest.fn();
    const component = shallow(<Toggle htmlFor="foo" onChange={spy} />);

    const input = component.find('input').first();
    input.simulate('change');
    expect(spy).toHaveBeenCalled();
  });
});
