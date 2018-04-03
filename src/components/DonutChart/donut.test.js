import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Donut from './donut';
import DonutChart from './donutChart';
import mockData from './donut.fixtures'

jest.mock('./donutChart')

describe('<DonutChart />', () => {
  afterEach(() => {
    DonutChart.mockClear();
  });

  describe('render', () => {
    describe('when data passed in', () => {
      it('should call the create method or the chart', () => {
        mount(<Donut />);

        expect(DonutChart).toHaveBeenCalledTimes(1);
      });

      it('should call the create method or the chart with the container as the first argument', () => {
        const wrapper = mount(<Donut />);

        const actual = DonutChart.mock.calls[0][0];
        const expected = wrapper.instance()._rootNode;

        expect(actual).toEqual(expected);
      });

      it('should call the create method or the chart with the configuration object as the second argument', () => {
        const wrapper = mount(<Donut data={mockData} />);

        const actual = DonutChart.mock.calls[0][1];
        const expected = wrapper.instance().props;

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('update', () => {
    describe('when data changes', () => {
      it('should call the update method or the chart', () => {
        const wrapper = mount(<Donut data={mockData} />);

        // Changing properties should trigger a componentDidUpdate
        wrapper.setProps({ data:[] });

        const actual = DonutChart.mock.instances[0].update.mock.calls[0][0];
        const expected = wrapper.instance().props;

        expect(actual).toEqual(expected);
      });
    });
  });
});
