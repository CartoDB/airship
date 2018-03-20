import React from 'react';
import Radiobutton from './radiobutton';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Radiobutton value="wadus" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with label', () => {
    const component = renderer.create(
      <Radiobutton value="wadus">Wadus</Radiobutton>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders radio button group', () => {
    const component = renderer.create(
      <Radiobutton.Group name="wadus">
        <Radiobutton value="hola">Hola</Radiobutton>
        <Radiobutton value="mundo">Mundo</Radiobutton>
      </Radiobutton.Group>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('onChange', () => {
    const spy = jest.fn();
    const component = mount(
      <Radiobutton.Group name="wadus" onChange={spy}>
        <Radiobutton value="hola">Hola</Radiobutton>
        <Radiobutton value="mundo">Mundo</Radiobutton>
      </Radiobutton.Group>
    );

    component
      .find('input')
      .first()
      .simulate('change');
    expect(spy).toHaveBeenCalled();
  });
});
