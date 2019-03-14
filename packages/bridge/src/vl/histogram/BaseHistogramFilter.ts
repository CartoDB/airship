import { HistogramSelection } from '../../../../components/src/components/as-histogram-widget/interfaces';
import { select } from '../../util/Utils';
import { BaseFilter } from '../base/BaseFilter';

/**
 * Base class for Filters based on Airship Histogram Widgets
 *
 * @export
 * @abstract
 * @class BaseHistogramFilter
 * @extends {BaseFilter}
 * @template T Type of the selection. Typicall an array of number or strings
 */
export abstract class BaseHistogramFilter<T> extends BaseFilter {
  protected _buckets: number;
  protected _carto: any;
  protected _widget: HTMLAsTimeSeriesWidgetElement | HTMLAsHistogramWidgetElement;
  protected _selection: T = null;
  protected _dataLayer: any;

  /**
   * Creates an instance of BaseHistogramFilter.
   * @param {('categorical' | 'numerical')} type Whether it is a categorical or a numerical histogram
   * @param {*} carto The CARTO VL namespace
   * @param {*} layer A CARTO VL layer
   * @param {(HTMLAsTimeSeriesWidgetElement | HTMLAsHistogramWidgetElement)} histogram
   * An Airship Histogram or TimeSeries HTML element
   * @param {string} columnName The column to pull data from
   * @param {*} source A CARTO VL source
   * @param {boolean} [readOnly=true] Whether the widget will be able to filter the visualization or not
   * @memberof BaseHistogramFilter
   */
  constructor(
    type: 'categorical' | 'numerical',
    carto: any,
    layer: any,
    histogram: HTMLAsTimeSeriesWidgetElement | HTMLAsHistogramWidgetElement | string,
    columnName: string,
    source: any,
    readOnly: boolean = true
  ) {
    super(`histogram_${type}`, columnName, layer, source, readOnly);

    this._widget = select(histogram) as HTMLAsHistogramWidgetElement | HTMLAsTimeSeriesWidgetElement;
    this._carto = carto;

    this._widget.disableInteractivity = readOnly;
    this._widget.showClear = !readOnly;

    this.selectionChanged = this.selectionChanged.bind(this);

    if (!readOnly) {
      this._widget.addEventListener('selectionChanged', this.selectionChanged);
    }
  }

  public removeHistogramLayer() {
    this._layer.remove();
  }

  public setDataLayer(layer: any) {
    this._dataLayer = layer;

    this.bindDataLayer();
  }

  protected _getLegendConfig() {
    return {
      samples: this._buckets
    };
  }

  /**
   * Custom implementation of a histogram selection changed event. This differs on every type of histogram
   *
   * @protected
   * @abstract
   * @param {CustomEvent<HistogramSelection>} evt A Custom Event with the HistogramSelection
   * @memberof BaseHistogramFilter
   */
  protected abstract selectionChanged(evt: CustomEvent<HistogramSelection>);

  /**
   * Function called right after the Data Layer has been set, allows for each type of histogram filter to
   * customize the updated handling.
   *
   * @protected
   * @abstract
   * @memberof BaseHistogramFilter
   */
  protected abstract bindDataLayer();
}
