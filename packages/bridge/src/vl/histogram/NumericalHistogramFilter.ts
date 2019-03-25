import { BucketRange, VLNumericalHistogram } from '../../types';
import { isNumericalHistogramEqual } from '../utils/comparison/histogram';
import * as conversion from '../utils/conversion/histogram';
import { BaseHistogramFilter } from './BaseHistogramFilter';

/**
 * This class is an especialization of the HistogramFilter for numerical histograms, i.e. those in
 * which each bucket have a start / end value. The selection is an array of numbers.
 *
 * The expression it provides for VL is a viewportHistogram with either a number of buckets, or an array
 * describing each buckets range. The latter is recommended for non-read-only ones.
 *
 * As for the filter, it uses the $column >= selection[0] && $column < selection[1]
 *
 * @export
 * @class NumericalHistogramFilter
 * @extends {BaseHistogramFilter<[number, number]>}
 */
export class NumericalHistogramFilter extends BaseHistogramFilter<[number, number]> {
  private _lastHistogram: VLNumericalHistogram = null;
  private _isTimeSeries: boolean;
  private _bucketRanges: BucketRange[];
  private _globalHistogram: VLNumericalHistogram;

  /**
   * Creates an instance of NumericalHistogramFilter.
   *
   * If an array of buckets (bucketRanges) is provided, nBuckets is ignored, and the number of buckets
   * is the length of said array.
   *
   * @param {*} carto CARTO VL namespace
   * @param {*} layer CARTO VL layer
   * @param {(any)} histogram Airship histogram / time series HTML element, or a selector
   * @param {string} columnName Column to pull data from
   * @param {number} nBuckets Number of buckets
   * @param {*} source CARTO VL source
   * @param {BucketRange[]} bucketRanges Array describing the bucket ranges. This has priority over nBuckets.
   * See https://carto.com/developers/carto-vl/reference/#cartoexpressionsviewporthistogram for more information
   * @param {boolean} [readOnly=true] Whether this histogram can filter the Visualization or not.
   * @param {object} [inputExpression=null] VL Expression to use instead of s.prop for the histogram input
   * @memberof NumericalHistogramFilter
   */
  constructor(
    carto: any,
    layer: any,
    histogram: any | string,
    columnName: string,
    nBuckets: number = 20,
    source: any,
    bucketRanges?: BucketRange[],
    readOnly: boolean = true,
    showTotals: boolean = false,
    inputExpression: object = null
  ) {
    super('numerical', carto, layer, histogram, columnName, source, readOnly, showTotals, inputExpression);
    this._buckets = bucketRanges !== undefined ? bucketRanges.length : nBuckets;
    this._bucketRanges = bucketRanges;
  }

  /**
   * Returns $column >= selection[0] && $column < selection[1]
   *
   * If this is used on a time series, it does not filter at all.
   *
   * @readonly
   * @type {string}
   * @memberof NumericalHistogramFilter
   */
  public get filter(): string {
    if (this._selection === null || this._isTimeSeries) {
      return null;
    }

    return `(@${this.columnPropName} >= ${this._selection[0]} and @${this.columnPropName} < ${this._selection[1]})`;
  }

  /**
   * Generates a viewportHistogram with either a number of buckets or an array of buckets.
   *
   * The array has priority over the number of buckets.
   *
   * @readonly
   * @type {string}
   * @memberof NumericalHistogramFilter
   */
  public get expression(): string {
    if (this._totals && !this._globalHistogram) {
      return null;
    }

    const s = this._carto.expressions;

    return s.viewportHistogram(
      this._inputExpression ? this._inputExpression : s.prop(this._column),
      this._bucketArg()
    );
  }

  public get globalExpression(): any {
    if (!this._totals) {
      return null;
    }

    const s = this._carto.expressions;
    return s.globalHistogram(this._inputExpression ? this._inputExpression : s.prop(this._column), this._bucketArg());
  }

  /**
   * Mark this histogram as a the source for a time-series.
   *
   * @param {boolean} value
   * @memberof NumericalHistogramFilter
   */
  public setTimeSeries(value: boolean) {
    this._isTimeSeries = value;
  }

  /**
   * Numerical Histograms do not support color mapping for now.
   *
   * @memberof NumericalHistogramFilter
   */
  public enableColorMapping() {
    throw new Error('Unsupported for numerical histograms');
  }

  /**
   * Numerical Histograms do not support legend data for now.
   *
   * @memberof NumericalHistogramFilter
   */
  public setLegendData() {
    throw new Error('Unsupported for numerical histograms');
  }

  protected bindDataLayer()  {
    this._dataLayer.on('updated', () => {
      if (this._totals && !this._globalHistogram) {
        this._globalHistogram = (this._dataLayer.viz.variables[`${this.name}_global`] as VLNumericalHistogram);

        if (this._globalHistogram) {
          this._bucketRanges = this._globalHistogram.value.map(
            (value) => ([value.x[0], value.x[1]] as [number, number])
          );

          this._emitter.emit('expressionReady', { name: this.name, expression: this.expression });
        }

        this._widget.backgroundData = conversion.numerical(this._globalHistogram);
      }

      const newHistogram = (this._dataLayer.viz.variables[this.name] as VLNumericalHistogram);
      if (!newHistogram) {
        return;
      }

      if (newHistogram.value !== null &&
          (this._lastHistogram === null || !isNumericalHistogramEqual(this._lastHistogram, newHistogram))) {
        this._emitter.emit('rangeChanged', [
          newHistogram.value[0].x[0],
          newHistogram.value[newHistogram.value.length - 1].x[1]
        ]);

        this._lastHistogram = { value: newHistogram.value };

        this._widget.data = conversion.numerical(newHistogram);
      }
    });
  }

  protected selectionChanged(evt: CustomEvent<any>) {
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
