import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Badge from './badge';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Badge>Foo</Badge>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('color parameter', () => {
    const component = renderer.create(
      <Badge color="rgba(128, 182, 34, 0.24)">Foo</Badge>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('click action', () => {
    const spy = jest.fn();
    const component = shallow(
      <Badge closable onClose={spy}>
        Store 2
      </Badge>
    );

    const button = component.find('button');
    button.simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});
