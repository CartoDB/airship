import React from 'react';
import Badget from './badget';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Badget>Foo</Badget>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('color parameter', () => {
    const component = renderer.create(
      <Badget color="rgba(128, 182, 34, 0.24)">Foo</Badget>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('click action', () => {
    const spy = jest.fn();
    const component = shallow(
      <Badget closable onClose={spy}>
        Store 2
      </Badget>
    );

    const button = component.find('button');
    button.simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});
