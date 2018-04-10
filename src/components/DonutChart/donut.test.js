import React from 'react';
import renderer from 'react-test-renderer';
import DonutChart from './donut';
import mockData from './donut.fixtures';

describe('<DonutChart />', () => {
  describe('render', () => {
    describe('when data passed in', () => {
      it('renders the correct amount of bars', () => {
        const component = renderer.create(<DonutChart data={mockData} />);
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('renders without legend', () => {
        const component = renderer.create(<DonutChart data={mockData} showLegend={false} />);
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe('update', () => {
    describe('when data changes', () => {
      it('should call the update method or the chart', () => {
        const component = renderer.create(<DonutChart data={mockData} />);

        expect(component.toJSON()).toMatchSnapshot();

        // Changing properties should trigger a componentDidUpdate
        component.update(<DonutChart data={[]} />);

        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });
});
