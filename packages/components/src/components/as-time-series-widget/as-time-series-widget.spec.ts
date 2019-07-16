import { AUTO_FORMAT, DEFAULT_DATE_FORMAT, DEFAULT_NUMBER_FORMAT } from '../common/constants';
import { TimeSeriesWidget } from './as-time-series-widget';

describe('as-time-series-widget', () => {
  let timeSeriesWidget;

  beforeEach(() => {
    timeSeriesWidget = new TimeSeriesWidget();
  });

  it(`should set by default time format to "${DEFAULT_DATE_FORMAT}"`, () => {
    timeSeriesWidget.data = numberData;
    timeSeriesWidget.render();
    timeSeriesWidget.componentDidLoad();

    expect(timeSeriesWidget.timeFormat).toEqual(DEFAULT_DATE_FORMAT);
  });

  it('should set automatically number format to "%x" if data type is "number"', () => {
    timeSeriesWidget.timeFormat = AUTO_FORMAT;
    timeSeriesWidget.data = numberData;
    timeSeriesWidget.render();
    timeSeriesWidget.componentWillLoad();
    timeSeriesWidget.componentDidLoad();

    expect(timeSeriesWidget.timeFormat).toEqual(DEFAULT_NUMBER_FORMAT);
  });

  it('should set automatically time format to "%x" if data type is "date"', () => {
    timeSeriesWidget.timeFormat = AUTO_FORMAT;
    timeSeriesWidget.data = timeData;
    timeSeriesWidget.render();
    timeSeriesWidget.componentWillLoad();
    timeSeriesWidget.componentDidLoad();

    expect(timeSeriesWidget.timeFormat).toEqual(DEFAULT_DATE_FORMAT);
  });
});

const timeData = [];
const numberData = [];

for (let i = 0; i < 10; i++) {
  timeData.push({
    end: new Date(i + 1),
    start: new Date(i),
    value: i * 10
  });

  numberData.push({
    end: i,
    start: i + 1,
    value: i * 10
  });
}
