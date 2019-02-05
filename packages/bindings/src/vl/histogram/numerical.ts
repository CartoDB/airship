import { HistogramSelection } from '../../../../components/src/components/as-histogram-widget/interfaces';
import { isNumericalHistogramEqual } from '../utils/comparison/histogram/histogram';
import * as conversion from '../utils/conversion/histogram/histogram';
import { Histogram } from './histogram';


export class NumericalHistogram extends Histogram<[number, number]> {
  private _lastHistogram: VLNumericalHistogram = null;

  public get expression(): string {
    return `@${this.name}: viewportHistogram($${this._column}, ${this._buckets})`;
  }

  constructor(
    carto: any,
    layer: any,
    histogram: HTMLAsTimeSeriesWidgetElement | HTMLAsHistogramWidgetElement,
    columnName: string,
    nBuckets: number,
    source: any,
    readOnly: boolean = true
  ) {
    super('numerical', carto, layer, histogram, columnName, source, readOnly);
    this._buckets = nBuckets;
  }

  public get filter(): string {
    if (this._selection === null) {
      return null;
    } else {
      return `between($${this._column}, ${this._selection[0]}, ${this._selection[1]})`;
    }
  }

  protected bindDataLayer()  {
    this._dataLayer.on('updated', () => {
      const newHistogram = (this._dataLayer.viz.variables[this.name] as VLNumericalHistogram);
      if (!newHistogram) {
        return;
      }

      if (this._lastHistogram === null || !isNumericalHistogramEqual(this._lastHistogram, newHistogram)) {
        this._emitter.emit('rangeChanged', [
          newHistogram.value[0].x[0],
          newHistogram.value[newHistogram.value.length - 1].x[1]
        ]);

        this._lastHistogram = { value: newHistogram.value };

        this._widget.data = conversion.numerical(newHistogram);
      }
    });
  }

  protected selectionChanged(evt: CustomEvent<HistogramSelection>) {
    if (evt.detail === null) {
      this._selection = null;
    } else {
      const selection = evt.detail.selection as [number, number];
      this._selection = [Number(selection[0]), Number(selection[1])];
    }

    this._emitter.emit('rangeChanged', this._selection);

    this._filterChanged();
  }

}
