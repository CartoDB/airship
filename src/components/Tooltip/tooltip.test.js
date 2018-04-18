import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Tooltip from './tooltip';
import { nodeMock } from '../../utils';

jest.mock('./svgArrow', () => '#');

const RENDER_OPTIONS = {
  createNodeMock: nodeMock,
};

describe('<Tooltip />', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn(element => element);
  });

  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });

  it('renders without crashing', () => {
    const component = renderer.create(
      <Tooltip>
        <Tooltip.Content>Hola mundo</Tooltip.Content>
        <Tooltip.Trigger>tooltip</Tooltip.Trigger>
      </Tooltip>,
      RENDER_OPTIONS
    );
    expect(component.toJSON()).toMatchSnapshot();

    component.root.instance.setState({ visible: true });

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders with as param', () => {
    const component = renderer.create(
      <Tooltip as="div">
        <Tooltip.Content>Hola mundo</Tooltip.Content>
        <Tooltip.Trigger>tooltip</Tooltip.Trigger>
      </Tooltip>,
      RENDER_OPTIONS
    );
    expect(component.toJSON()).toMatchSnapshot();

    component.root.instance.setState({ visible: true });

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders with to param', () => {
    const component = renderer.create(
      <Tooltip to="bottom">
        <Tooltip.Content>Hola mundo</Tooltip.Content>
        <Tooltip.Trigger>tooltip</Tooltip.Trigger>
      </Tooltip>,
      RENDER_OPTIONS
    );
    expect(component.toJSON()).toMatchSnapshot();

    component.root.instance.setState({ visible: true });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
