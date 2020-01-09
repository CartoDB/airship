import mitt from 'mitt'
import { LegendData, LegendEntry } from '../../types';

/**
 * Base class for all possible CARTO VL Filters to be combined with Airship
 *
 * @export
 * @abstract
 * @class BaseFilter
 */
export abstract class BaseFilter {
  // Internal counter to prevent colission between filters for the same
  // column and the same type
  private static _counter: number = 0;

  protected _emitter: mitt.Emitter;
  protected _column: string;
  protected _layer: any;
  protected _source: any;
  protected _legendData: LegendEntry[];
  protected _mapColors: boolean;
  protected _widget: any;
  private _readOnly: boolean;
  private _name: string;

  /**
   * Creates an instance of BaseFilter.
   * @param {string} type A type describing what widget this filter represents
   * @param {string} column The column this filter is related to
   * @param {*} layer A CARTO VL layer
   * @param {*} source A CARTO VL source
   * @param {boolean} [readOnly=true] Whether this filter should be read only or not
   * @memberof BaseFilter
   */
  constructor(type: string, column: string, layer: any, source: any, readOnly: boolean = true) {
    this._emitter = mitt();

    this._name = `asbind_${type}_${column}_${BaseFilter._counter}`;
    this._column = column;
    this._layer = layer;
    this._source = source;
    this._readOnly = readOnly;

    BaseFilter._counter++;

    this._loadLegendData = this._loadLegendData.bind(this);
  }

  /**
   * Provide a CARTO VL layer to be used as the source of data for the filter.
   *
   * @abstract
   * @param {*} layer a CARTO VL layer
   * @memberof BaseFilter
   */
  public abstract setDataLayer(layer: any);

  /**
   * This function should be implemented by each filter to provide a valid filter for CARTO VL Viz objects.
   *
   * @readonly
   * @abstract
   * @type {string}
   * @memberof BaseFilter
   */
  public abstract get filter(): string;

  /**
   * This function should be implemented by each filter to create the appropriate data source expression. For instance
   * a histogram.
   *
   * @readonly
   * @abstract
   * @type {*}
   * @memberof BaseFilter
   */
  public abstract get expression(): any;

  /**
   * If the filter returns this, this expression will be assigned to a variable called this.name_global
   *
   * @readonly
   * @abstract
   * @type {*}
   * @memberof BaseFilter
   */
  public get globalExpression() {
    return null;
  }

  /**
   * Returns the name of the filter. The name is a compound of the type, the column and an internal counter to prevent
   * collisions. It will be used as the name for the VL variable containing BaseFilter.expression.
   *
   * @readonly
   * @type {string}
   * @memberof BaseFilter
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Get the column of the filter.
   *
   * @readonly
   * @type {string}
   * @memberof BaseFilter
   */
  public get column(): string {
    return this._column;
  }

  public get columnPropName(): string {
    return `${this._name}_col`;
  }

  /**
   * Get whether the filter is read only or not.
   *
   * @readonly
   * @type {boolean}
   * @memberof BaseFilter
   */
  public get readOnly(): boolean {
    return this._readOnly;
  }

  /**
   * Get the currently set CARTO VL Visualization layer.
   *
   * @readonly
   * @type {*}
   * @memberof BaseFilter
   */
  public get layer(): any {
    return this._layer;
  }

  /**
   * Get the current CARTO VL source.
   *
   * @readonly
   * @type {*}
   * @memberof BaseFilter
   */
  public get source(): any {
    return this._source;
  }

  /**
   * Bind to an event of the filter. Currently only `filterChanged` is supported.
   *
   * @param {string} type
   * @param {mitt.Handler} handler
   * @memberof BaseFilter
   */
  public on(type: string, handler: mitt.Handler) {
    this._emitter.on(type, handler);
  }

  /**
   * Set LegendData, which can be used by certain filter implementations to display colors
   * for certain values.
   *
   * @param {LegendData} legendData
   * @memberof BaseFilter
   */
  public setLegendData(legendData: LegendData) {
    this._legendData = legendData.data;
  }

  /**
   * Automatically extract LegendData from the CARTO VL Viz object. This requires the `color` property
   * in the Viz object to be a ramp.
   *
   * @memberof BaseFilter
   */
  public enableColorMapping() {
    this._mapColors = true;

    if (this._layer.viz) {
      this._loadLegendData();
    } else {
      this._layer.on('loaded', this._loadLegendData);
    }
  }

  /**
   * Trigger a filterChanged event
   *
   * @protected
   * @memberof BaseFilter
   */
  protected _filterChanged() {
    this._emitter.emit('filterChanged', this._name);
  }

  /**
   * Load the legend data from the Viz object. Used from `enableColorMapping`
   *
   * @protected
   * @returns
   * @memberof BaseFilter
   */
  protected _loadLegendData() {
    const color = this._layer.viz.color;

    if (!color.getLegendData) {
      return;
    }

    this.setLegendData(color.getLegendData(this._getLegendConfig()));
  }

  /**
   * Override this method on a specific filter to configure CARTO VL ramps getLegendData arguments
   *
   * @protected
   * @returns
   * @memberof BaseFilter
   */
  protected _getLegendConfig() {
    return undefined;
  }

}
