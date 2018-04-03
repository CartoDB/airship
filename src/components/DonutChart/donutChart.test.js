import DonutChart from './donutChart';
import mockData from './donut.fixtures';

const MOCK_DATA = {
  data: mockData.categories,
  colors: ['#FABADA', '#FABADA', '#FABADA'],
};

describe('Donut Chart', () => {
  let anchor;

  beforeEach(() => {
    anchor = document.createElement('div');
  });

  describe('create', () => {
    describe('when incorrect arguments are used', () => {
      describe('when the DOM element is not passed', () => {
        it('throws an error', () => {
          expect(() => {
            new DonutChart(undefined, {});
          }).toThrowError('A root container is required');
        });
      });
    });

    describe('when proper arguments are passed', () => {
      let chart;

      beforeEach(() => {
        chart = new DonutChart(anchor, MOCK_DATA);
      });

      it('sets the options to the chart', () => {
        expect(chart.options.data).toEqual(MOCK_DATA.data);
      });
    });
  });

  describe('update', () => {
    it('updates the chart options with the new data', () => {
      const chart = new DonutChart(anchor, MOCK_DATA);

      expect(chart.options.data).toEqual(MOCK_DATA.data);

      chart.update({ data: [] });

      expect(chart.options.data).toEqual([]);
    })
  });
});
