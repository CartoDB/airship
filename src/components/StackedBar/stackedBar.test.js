import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import StackedBar from './stackedBar';
import mockData from './stackedBar.fixtures';

describe('<StackedBar />', () => {
  describe('render', () => {
    describe('when data passed in', () => {
      it('renders the correct amount of bars', () => {
        const component = renderer.create(
          <StackedBar
            data={mockData}
            keys={['private_rooms', 'shared_rooms', 'entire_homes']}
          />
        );
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('renders the tooltip', () => {
        const component = mount(
          <StackedBar
            data={mockData}
            keys={['private_rooms', 'shared_rooms', 'entire_homes']}
          />
        );

        // This is mocking D3 behaviour
        const d = [1, 2];
        d.data = { name: 'Embajadores', private_rooms: 3200, shared_rooms: 987, entire_homes: 421 };

        component.setState({ tooltip: { d } });
        component.update();

        expect(component.find('Tooltip').length).toEqual(1);
      });
    });
  });

  describe('update', () => {
    describe('when data changes', () => {
      it('should call the update method or the chart', () => {
        const component = renderer.create(
          <StackedBar
            data={mockData}
            keys={['private_rooms', 'shared_rooms', 'entire_homes']}
          />
        );

        expect(component.toJSON()).toMatchSnapshot();

        // Changing properties should trigger a componentDidUpdate
        component.update(
          <StackedBar
            data={[]}
            keys={['private_rooms', 'shared_rooms', 'entire_homes']}
          />
        );

        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });
});
