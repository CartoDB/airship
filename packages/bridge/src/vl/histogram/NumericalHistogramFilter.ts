import { HistogramSelection } from '../../../../components/src/components/as-histogram-widget/interfaces';
import { isNumericalHistogramEqual } from '../utils/comparison/histogram';
import * as conversion from '../utils/conversion/histogram';
import { BaseHistogramFilter } from './BaseHistogramFilter';

export class NumericalHistogramFilter extends BaseHistogramFilter<[number, number]> {
  private _lastHistogram: VLNumericalHistogram = null;
  private _isTimeSeries: boolean;
  private _bucketRanges: BucketRange[];

  constructor(
    carto: any,
    layer: any,
    histogram: HTMLAsTimeSeriesWidgetElement | HTMLAsHistogramWidgetElement,
    columnName: string,
    nBuckets: number,
    source: any,
    bucketRanges: BucketRange[],
    readOnly: boolean = true
  ) {
    super('numerical', carto, layer, histogram, columnName, source, readOnly);
    this._buckets = bucketRanges !== undefined ? bucketRanges.length : nBuckets;
    this._bucketRanges = bucketRanges;
  }

  public get filter(): string {
    if (this._selection === null || this._isTimeSeries) {
      return null;
    }

    return `($${this._column} >= ${this._selection[0]} and $${this._column} < ${this._selection[1]})`;
  }

  public get expression(): string {
    const s = this._carto.expressions;

    return s.viewportHistogram(s.prop(this._column), this._bucketArg());
  }

  public setTimeSeries(value: boolean) {
    this._isTimeSeries = value;
  }

  public enableColorMapping() {
    throw new Error('Unsupported for numerical histograms');
  }

  public setLegendData() {
    throw new Error('Unsupported for numerical histograms');
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
      const selection = (this._isTimeSeries ? evt.detail : evt.detail.selection) as [number, number];
      this._selection = [Number(selection[0]), Number(selection[1])];
    }

    this._emitter.emit('rangeChanged', this._selection);

    this._filterChanged();
  }

  private _bucketArg() {
    if (this._bucketRanges !== undefined) {
      return this._bucketRanges;
    }

    return this._buckets;
  }

}
