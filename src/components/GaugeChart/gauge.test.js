import React from 'react';
import { mount } from 'enzyme';
import Gauge from './gauge';
import GaugeChart from './gaugeChart';

jest.mock('./gaugeChart');

describe('<GaugeChart />', () => {
  afterEach(() => {
    GaugeChart.mockClear();
  });

  describe('render', () => {
    describe('when data passed in', () => {
      it('should call the create method or the chart', () => {
        mount(<Gauge />);

        expect(GaugeChart).toHaveBeenCalledTimes(1);
      });

      it('should call the create method or the chart with the container as the first argument', () => {
        const wrapper = mount(<Gauge />);

        const actual = GaugeChart.mock.calls[0][0];
        const expected = wrapper.instance().rootNode;

        expect(actual).toEqual(expected);
      });

      it('should call the create method or the chart with the configuration object as the second argument', () => {
        const wrapper = mount(<Gauge value={77} maxValue={100} />);

        const actual = GaugeChart.mock.calls[0][1];
        const expected = wrapper.instance().props;

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('update', () => {
    describe('when data changes', () => {
      it('should call the update method or the chart', () => {
        const wrapper = mount(<Gauge value={77} maxValue={100} />);

        // Changing properties should trigger a componentDidUpdate
        wrapper.setProps({ value: 30 });

        const actual = GaugeChart.mock.instances[0].update.mock.calls[0][0];
        const expected = wrapper.instance().props;

        expect(actual).toEqual(expected);
      });
    });
  });
});
