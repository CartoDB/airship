import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Histogram from './histogram';
import mockData from './histogram.fixtures';

describe('<Histogram />', () => {
  describe('render', () => {
    describe('when data passed in', () => {
      it('renders the correct amount of bars', () => {
        const component = renderer.create(<Histogram data={mockData} />);
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('renders the tooltip', () => {
        const component = mount(<Histogram data={mockData} />);

        component.setState({ tooltip: { d: { name: 'Leet', value: 1337 } } });
        component.update();

        expect(component.find('Tooltip').length).toEqual(1);
      });
    });
  });

  describe('update', () => {
    describe('when data changes', () => {
      it('should call the update method or the chart', () => {
        const component = renderer.create(<Histogram data={mockData} />);

        expect(component.toJSON()).toMatchSnapshot();

        // Changing properties should trigger a componentDidUpdate
        component.update(<Histogram data={[]} />);

        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });
});
