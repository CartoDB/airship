import React from 'react';
import { shallow } from 'enzyme';
import Avatar from './avatar';

describe('render', () => {
  it('renders without crashing', () => {
    const component = shallow(<Avatar url="" />);
    expect(component).toMatchSnapshot();
  });

  it('renders with size', () => {
    const component = shallow(
      <Avatar
        size={32}
        url="https://avatars3.githubusercontent.com/u/1799254"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders without image', () => {
    const component = shallow(<Avatar url="" />);
    expect(component).toMatchSnapshot();
  });
});
