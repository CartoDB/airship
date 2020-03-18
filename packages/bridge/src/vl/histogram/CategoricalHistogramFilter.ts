import { VLCategoricalHistogram } from '../../types';
import { isCategoricalHistogramEqual } from '../utils/comparison/histogram';
import * as conversion from '../utils/conversion/histogram';
import { BaseHistogramFilter } from './BaseHistogramFilter';

/**
 * This class is an especialization of the HistogramFilter for categorical histograms, i.e. those
 * which instead of a numerical range, have a category for each bucket. The selection is an array
 * of strings, and the expression it provides for VL is a viewportHistogram with only a column.
 *
 * As for the filter, it uses the $column in [] expression of VL
 *
 * @export
 * @class CategoricalHistogramFilter
 * @extends {BaseHistogramFilter<string[]>}
 */
export class CategoricalHistogramFilter extends BaseHistogramFilter<string[]> {
  private _lastHistogram: VLCategoricalHistogram = null;
  private _globalHistogram: VLCategoricalHistogram;

  /**
   * Creates an instance of CategoricalHistogramFilter.
   * @param {*} carto CARTO VL namespace
   * @param {*} layer CARTO VL layer
   * @param {(any | string)} histogram Airship histogram widget HTML element or a selector
   * @param {string} columnName The column to pull data from
   * @param {*} source CARTO VL source
   * @param {boolean} [readOnly=true] Whether this histogram allows filtering or not
   * @param {weight} weight Value to weight by
   * @param {object} [inputExpression=null] VL Expression to use instead of s.prop for the histogram input
   * @memberof CategoricalHistogramFilter
   */
  constructor(
    carto: any,
    layer: any,
    histogram: any | string,
    columnName: string,
    source: any,
    readOnly: boolean = true,
    weight: number | string,
    showTotals: boolean = false,
    inputExpression: object = null
  ) {
    super('categorical', carto, layer, histogram, columnName, source, readOnly, weight, showTotals, inputExpression);
  }

  /**
   * Returns either null or an expression like: `$column in [_selection]`
   *
   * @readonly
   * @type {string}
   * @memberof CategoricalHistogramFilter
   */
  public get filter(): string {
    if (this._selection === null) {
      return null;
    } else {
      return `@${this.columnPropName} in [${this._selection.map((value) => `'${value}'`).join(',')}]`;
    }
  }

  /**
   * Returns a viewportHistogram with only the column as an argument (no buckets)
   *
   * @readonly
   * @type {*}
   * @memberof CategoricalHistogramFilter
   */
  public get expression(): any {
    const s = this._carto.expressions;

    return s.viewportHistogram(this._inputExpression ? this._inputExpression : s.prop(this._column), this._weight);
  }

  public get globalExpression(): any {
    if (!this._totals) {
      return null;
    }

    const s = this._carto.expressions;
    return s.globalHistogram(this._inputExpression ? this._inputExpression : s.prop(this._column), this._weight);
  }

  protected bindDataLayer()  {
    this._dataLayer.on('updated', () => {
      if (this._totals && !this._globalHistogram) {
        this._globalHistogram = (this._dataLayer.viz.variables[`${this.name}_global`] as VLCategoricalHistogram);

        this._widget.backgroundData = conversion.categorical(this._globalHistogram);
      }

      const newHistogram = (this._dataLayer.viz.variables[this.name] as VLCategoricalHistogram);
      if (!newHistogram) {
        return;
      }

      if (this._lastHistogram === null || !isCategoricalHistogramEqual(this._lastHistogram, newHistogram)) {
        this._lastHistogram = { value: newHistogram.value };

        if (this._globalHistogram) {
          const baseData = this._globalHistogram.value.map((data) => {
            const value = newHistogram.value.find((item) => item.x === data.x);
            return ({
              x: data.x,
              y: value ? value.y : 0
            });
          });

          this._widget.data = conversion.categorical({ value: baseData }, this._legendData);
        } else {
          this._widget.data = conversion.categorical(newHistogram, this._legendData);
        }

      }
    });
  }

  protected selectionChanged(evt: CustomEvent<any>) {
    if (evt.detail === null) {
      this._selection = null;
    } else {
      const selection = evt.detail.selection as string[];
      this._selection = selection.map((value) => value);
    }

    this._filterChanged();
  }

}
