import DonutChart from './donutChart';
import mockData from './donut.fixtures';

const MOCK_DATA = {
  data: mockData,
  colors: ['#FABADA', '#FABADA', '#FABADA'],
  showLegend: true,
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
            new DonutChart(undefined, {}); // eslint-disable-line
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

      it('renders the legend based on options.showLegend', () => {
        expect(anchor.innerHTML).toContain('legend');

        chart.update({ showLegend: false });

        expect(anchor.innerHTML).not.toContain('legend');
      });
    });
  });

  describe('update', () => {
    it('updates the chart options with the new data', () => {
      const chart = new DonutChart(anchor, MOCK_DATA);

      expect(chart.options.data).toEqual(MOCK_DATA.data);

      chart.update({ data: [] });

      expect(chart.options.data).toEqual([]);
    });
  });
});
