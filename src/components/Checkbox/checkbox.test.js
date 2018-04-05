import React from 'react';
import Checkbox from './checkbox';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Checkbox htmlFor="test" value="wadus" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with label', () => {
    const component = renderer.create(
      <Checkbox htmlFor="test" value="wadus" checked>
        Hola
      </Checkbox>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('uses htmlFor for the label, and adds it as the input id', () => {
    const component = renderer.create(<Checkbox htmlFor="test" label="Rick" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('onChange', () => {
    const spy = jest.fn();
    const component = mount(
      <Checkbox htmlFor="test" value="wadus" onChange={spy}>
        Hola
      </Checkbox>
    );

    component.find('input').simulate('change');
    expect(spy).toHaveBeenCalled();
  });
});
