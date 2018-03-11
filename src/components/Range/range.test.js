import React from 'react';
import Range from './range';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

describe('Range', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Range />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('maxValue', () => {
    const component = renderer.create(<Range maxValue={20} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('minValue', () => {
    const component = renderer.create(<Range minValue={10} maxValue={30} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('value', () => {
    const component = renderer.create(
      <Range value={20} minValue={10} maxValue={30} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('disabled', () => {
    const component = renderer.create(
      <Range disabled value={20} minValue={10} maxValue={30} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('multiple sliders', () => {
    const component = mount(
      <Range disabled value={{ min: 5, max: 15 }} minValue={10} maxValue={30} />
    );

    expect(component.find('Slider').length).toBe(2);
  });

  it('onChange callback', () => {
    const spy = jest.fn();
    const component = renderer.create(
      <Range onChange={spy} value={20} minValue={10} maxValue={30} />
    );
    component.getInstance().updateValues({ min: 10, max: 15 });
    expect(spy).toHaveBeenCalled();
  });
});
