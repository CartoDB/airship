import React from 'react';
import renderer from 'react-test-renderer';
import GaugeChart from './gauge';

describe('<GaugeChart />', () => {
  describe('render', () => {
    describe('when data passed in', () => {
      it('renders the correct amount of bars', () => {
        const component = renderer.create(<GaugeChart value={12} />);
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('renders with a label', () => {
        const component = renderer.create(<GaugeChart value={12} label="Parsecs" />);
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('renders with max and min values', () => {
        const component = renderer.create(
          <GaugeChart
            minValue={0}
            maxValue={2000}
            value={1337}
            label="Leet"
          />
        );
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe('update', () => {
    describe('when data changes', () => {
      it('should call the update method or the chart', () => {
        const component = renderer.create(<GaugeChart value={12} />);

        expect(component.toJSON()).toMatchSnapshot();

        // Changing properties should trigger a componentDidUpdate
        component.update(<GaugeChart value={70} />);

        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });
});
