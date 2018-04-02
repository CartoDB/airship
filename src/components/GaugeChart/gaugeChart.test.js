import GaugeChart from './gaugeChart';

const MOCK_DATA = {
  value: 1337,
  maxValue: 200,
  minValue: 0,
  label: 'Rick',
  backgroundColor: '#EEE',
  foregroundColor: '#FABADA',
  textColor: '#000',
};

describe('Gauge Chart', () => {
  let anchor;

  beforeEach(() => {
    anchor = document.createElement('div');
  });

  describe('create', () => {
    describe('when incorrect arguments are used', () => {
      describe('when the DOM element is not passed', () => {
        it('throws an error', () => {
          expect(() => {
            new GaugeChart(undefined, {});
          }).toThrowError('A root container is required');
        });
      });
    });

    describe('when proper arguments are passed', () => {
      let chart;

      beforeEach(() => {
        chart = new GaugeChart(anchor, MOCK_DATA);
      });

      it('sets the options to the chart', () => {

        expect(chart.options.value).toEqual(MOCK_DATA.value);
        expect(chart.options.maxValue).toEqual(MOCK_DATA.maxValue);
        expect(chart.options.minValue).toEqual(MOCK_DATA.minValue);
        expect(chart.options.label).toEqual(MOCK_DATA.label);
        expect(chart.options.backgroundColor).toEqual(MOCK_DATA.backgroundColor);
        expect(chart.options.foregroundColor).toEqual(MOCK_DATA.foregroundColor);
        expect(chart.options.textColor).toEqual(MOCK_DATA.textColor);
      });

      it('renders the chart label', () => {
        expect(anchor.innerHTML).toContain('Rick')
      });

      it('renders the chart value', () => {
        expect(anchor.innerHTML).toContain(1337)
      });
    });
  });

  describe('update', () => {
    it('updates the chart options with the new data', () => {
      const chart = new GaugeChart(anchor, { value: 50 });

      expect(chart.options.value).toEqual(50);

      chart.update({ value: 10 });

      expect(chart.options.value).toEqual(10);
    })
  });
});
