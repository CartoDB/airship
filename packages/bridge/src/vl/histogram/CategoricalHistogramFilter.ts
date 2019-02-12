import { HistogramSelection } from '../../../../components/src/components/as-histogram-widget/interfaces';
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

  /**
   * Creates an instance of CategoricalHistogramFilter.
   * @param {*} carto CARTO VL namespace
   * @param {*} layer CARTO VL layer
   * @param {(HTMLAsTimeSeriesWidgetElement | HTMLAsHistogramWidgetElement)} histogram
   * Airship histogram widget HTML element
   * @param {string} columnName The column to pull data from
   * @param {*} source CARTO VL source
   * @param {boolean} [readOnly=true] Whether this histogram allows filtering or not
   * @memberof CategoricalHistogramFilter
   */
  constructor(
    carto: any,
    layer: any,
    histogram: HTMLAsTimeSeriesWidgetElement | HTMLAsHistogramWidgetElement,
    columnName: string,
    source: any,
    readOnly: boolean = true
  ) {
    super('categorical', carto, layer, histogram, columnName, source, readOnly);
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
      return `$${this._column} in [${this._selection.map((value) => `'${value}'`).join(',')}]`;
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
    return s.viewportHistogram(s.prop(this._column));
  }

  protected bindDataLayer()  {
    this._dataLayer.on('updated', () => {
      const newHistogram = (this._dataLayer.viz.variables[this.name] as VLCategoricalHistogram);
      if (!newHistogram) {
        return;
      }

      if (this._lastHistogram === null || !isCategoricalHistogramEqual(this._lastHistogram, newHistogram)) {
        this._lastHistogram = { value: newHistogram.value };

        this._widget.data = conversion.categorical(newHistogram, this._legendData);
      }
    });
  }

  protected selectionChanged(evt: CustomEvent<HistogramSelection>) {
    if (evt.detail === null) {
      this._selection = null;
    } else {
      const selection = evt.detail.selection as string[];
      this._selection = selection.map((value) => value);
    }

    this._filterChanged();
  }

}
