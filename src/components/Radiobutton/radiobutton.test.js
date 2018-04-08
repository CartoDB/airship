import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Radiobutton from './radiobutton';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Radiobutton value="wadus" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with label', () => {
    const component = renderer.create(
      <Radiobutton value="wadus">Wadus</Radiobutton>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders radio button group', () => {
    const component = renderer.create(
      <Radiobutton.Group name="wadus">
        <Radiobutton value="hola">Hola</Radiobutton>
        <Radiobutton value="mundo">Mundo</Radiobutton>
      </Radiobutton.Group>
    );
    const tree = component.toJSON();
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

  it('selected', () => {
    const component = mount(
      <Radiobutton.Group name="wadus" selected="mundo">
        <Radiobutton value="hola">Hola</Radiobutton>
        <Radiobutton value="mundo">Mundo</Radiobutton>
      </Radiobutton.Group>
    );

    const radio = component.find('input').at(1);
    expect(radio.props().checked).toBe(true);
  });
});
