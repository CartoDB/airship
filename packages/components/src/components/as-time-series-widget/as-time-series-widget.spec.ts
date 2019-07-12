import { TimeSeriesWidget } from './as-time-series-widget';

describe('as-time-series-widget', () => {
  let timeSeriesWidget;

  beforeEach(() => {
    timeSeriesWidget = new TimeSeriesWidget();
    timeSeriesWidget.data = numberData;
    timeSeriesWidget.render();
    timeSeriesWidget.componentDidLoad();
  });

  it('should set by default time format to "auto"', () => {
    expect(timeSeriesWidget.timeFormat).toEqual('auto');
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
