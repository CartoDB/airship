import { HistogramWidget } from './as-histogram-widget';

// TODO: Make histogram code testable
xdescribe('as-histogram-widget', () => {
  let histogramWidget;

  beforeEach(() => {
    histogramWidget = new HistogramWidget();
    histogramWidget.data = histogramData;
    histogramWidget.render();
    histogramWidget.componentDidLoad();
  });

  it('should emit an event with the selected range', async () => {
    const selectionChangedSpy = jest.fn();
    window.addEventListener('selectionChanged', selectionChangedSpy);


    await histogramWidget.setSelection([0, 20]);

    expect(selectionChangedSpy).toHaveReceivedEventDetail([0, 20]);
  });

  it('should set the selection', async () => {
    await histogramWidget.setSelection([0, 20]);
    const actual = await histogramWidget.getSelection();

    expect(actual.selection).toEqual([0, 20]);
  });

  it('should clear the selection', async () => {
    await histogramWidget.setSelection([0, 20]);
    await histogramWidget.clearSelection();

    const actual = await histogramWidget.getSelection();
    expect(actual).toEqual(null);
  });

  it('should adjust the selection to the closest buckets', async () => {
    await histogramWidget.setSelection([4, 22]);

    const actual = await histogramWidget.getSelection();
    expect(actual.selection).toEqual([0, 20]);
  });
});

const histogramData = [
  { start: 0, end: 10, value: 5 },
  { start: 10, end: 20, value: 10 },
  { start: 20, end: 30, value: 15 },
  { start: 30, end: 40, value: 20 },
];
