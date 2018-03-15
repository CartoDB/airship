import React from 'react';
import Loading from '../Loading/loading';
import Avatar from './avatar';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('render', () => {
  let originalFetch = global.fetch;

  beforeEach(() => {
    fetch.mockResponse(JSON.stringify({ image: 'wadus' }));
  });

  it('renders without crashing', () => {
    const component = shallow(<Avatar url="" />);
    expect(component).toMatchSnapshot();
  });

  it('renders with size', () => {
    const component = shallow(
      <Avatar
        size={32}
        url="https://avatars0.githubusercontent.com/u/1366843"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders without image', () => {
    const component = shallow(<Avatar url="" />);
    expect(component).toMatchSnapshot();
  });

  it('renders loading state', () => {
    const component = shallow(<Avatar url="" />);
    component.setState({ loaded: false });
    expect(component.find('StyledLoading').length).toBe(1);
    expect(component.find('StyledAvatar').length).toBe(0);
    component.setState({ loaded: true });
    expect(component.find('StyledAvatar').length).toBe(1);
    expect(component.find('StyledLoading').length).toBe(0);
  });
});
