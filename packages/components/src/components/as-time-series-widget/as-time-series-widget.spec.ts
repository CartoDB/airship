import { TimeSeriesWidget } from './as-time-series-widget';
import { prepareData } from './utils/data.service';

describe('as-time-series-widget', () => {
  let timeSeriesWidget;

  beforeEach(() => {
    timeSeriesWidget = new TimeSeriesWidget();
    timeSeriesWidget.data = numberData;
    timeSeriesWidget.render();
    timeSeriesWidget.componentDidLoad();
  });

  it('should parse time data into numeric data', () => {
    const newData = prepareData(timeData);

    expect(newData[0].start).toBe(0);
    expect(newData[0].end).toBe(1);
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
