import semver from 'semver';
import { BaseFilter } from './base/BaseFilter';
import { CategoryFilter } from './category/CategoryFilter';
import { CategoricalHistogramFilter } from './histogram/CategoricalHistogramFilter';
import { NumericalHistogramFilter } from './histogram/NumericalHistogramFilter';
import { GlobalRangeFilter } from './range/GlobalRangeFilter';
import { TimeSeries } from './time-series/TimeSeries';

const VL_VERSION = '^1.1.0';

/**
 * This class is the main interface to bind a VL layer to one or more Airship widgets.
 *
 * The normal usage is create an instance and use its public methods to generate filters for
 * different widgets.
 *
 * After you have specified all the required filters, simply call the method `build` and all will be
 * handled for you. Internally, a new layer will be created with an invisible Viz, as a source for all
 * the widget's data.
 *
 * Some caveats:
 * - You can create as many filters for a column you want, but only one per widget.
 * - If you enable non-read-only capabilities, it is recommended that the Viz filter property not to
 * be changed, as it will be changed internally by each filter.
 *
 * @export
 * @class VLBridge
 */
export default class VLBridge {
  private _carto: any;
  private _map: any;
  private _layer: any;
  private _source: any;
  private _vizFilters: BaseFilter[] = [];
  private _readOnlyLayer: any;
  private _id: string;
  private _animation: TimeSeries;

  /**
   * Creates an instance of VLBridge.
   * @param {VLBridgeOptions} { carto, map, layer, source }
   *  - carto: CARTO VL namespace
   *  - map: CARTO VL map instance (Mapbox GL)
   *  - layer: CARTO VL layer
   *  - source: CARTO VL source
   * @memberof VLBridge
   */
  constructor({ carto, map, layer, source }: VLBridgeOptions) {
    this._carto = carto;
    this._map = map;
    this._layer = layer;
    this._source = source;

    this._id = this._layer.id;

    this._rebuildFilters = this._rebuildFilters.bind(this);
    this._updateDataLayerVariables = this._updateDataLayerVariables.bind(this);

    if (!this._carto.expressions.globalHistogram) {
      throw new Error(`Provided VL version ${this._carto.version} lacks globalHistogram support.`);
    }

    if (!semver.satisfies(this._carto.version, VL_VERSION)) {
      throw new Error(`Provided VL version ${this._carto.version} not supported. Must satisfy ${VL_VERSION}`);
    }
  }

  /**
   * Create a numerical histogram filter. See {@link NumericalHistogramOptions} for more details
   *
   * @param {(HTMLAsHistogramWidgetElement | HTMLAsTimeSeriesWidgetElement | string)} widget Your widget or a
   * selector to locate it
   * @param {string} column The column you want to pull data from
   * @param {NumericalHistogramOptions} [options={}] Options for the bridge
   * @returns {NumericalHistogramFilter}
   * @memberof VLBridge
   */
  public numericalHistogram(
    widget: HTMLAsHistogramWidgetElement | HTMLAsTimeSeriesWidgetElement | string,
    column: string,
    options: NumericalHistogramOptions = {}): NumericalHistogramFilter {
    const {
      buckets,
      bucketRanges,
      readOnly,
      totals
    } = options;

    const histogram = new NumericalHistogramFilter(
      this._carto,
      this._layer,
      widget,
      column,
      buckets,
      this._source,
      bucketRanges,
      readOnly,
      totals
    );

    this._addFilter(histogram);

    return histogram;
  }

  /**
   * Create a categorical histogram filter. See {@link CategoricalHistogramOptions} for more details
   *
   * @param {(HTMLAsHistogramWidgetElement | string)} widget Your widget or a selector to locate it
   * @param {string} column The column to pull data from
   * @param {CategoricalHistogramOptions} [options={}] Options for this particular filter
   * @returns {CategoricalHistogramFilter}
   * @memberof VLBridge
   */
  public categoricalHistogram(
    widget: HTMLAsHistogramWidgetElement | string,
    column: string,
    options: CategoricalHistogramOptions = {}): CategoricalHistogramFilter {
    const {
      readOnly
    } = options;

    const histogram = new CategoricalHistogramFilter(
      this._carto,
      this._layer,
      widget,
      column,
      this._source,
      readOnly
    );

    this._addFilter(histogram);

    return histogram;
  }

  /**
   * Creates a numerical or categorical histogram, depending on the arguments.
   *
   * If neither buckets or bucketRanges are provided, a categorical one will be created. A numerical one otherwise
   *
   * @param {(HTMLAsHistogramWidgetElement | HTMLAsTimeSeriesWidgetElement | string)} widget Your widget or a selector
   * @param {string} column The column to pull data from
   * @param {NumericalHistogramOptions} options Options for the Histogram
   * @returns {NumericalHistogramFilter | CategoricalHistogramFilter}
   * @memberof VLBridge
   */
  public histogram(
    widget: HTMLAsHistogramWidgetElement | HTMLAsTimeSeriesWidgetElement | string,
    column: string,
    options: NumericalHistogramOptions = {}): NumericalHistogramFilter | CategoricalHistogramFilter {
    const {
      buckets,
      bucketRanges,
      readOnly,
      totals
    } = options;

    if (buckets === undefined && bucketRanges === undefined) {
      const histogramWidget = widget as HTMLAsHistogramWidgetElement;
      return this.categoricalHistogram(histogramWidget, column, { readOnly });
    }

    return this.numericalHistogram(widget, column, { readOnly, buckets, bucketRanges, totals });
  }

  /**
   * Creates a category widget filter. See {@link CategoryOptions} for more details
   *
   * @param {CategoryOptions} options
   * @returns
   * @memberof VLBridge
   */
  public category(widget: HTMLAsCategoryWidgetElement, column: string, options: CategoryOptions = {}) {
    const {
      readOnly,
      button
    } = options;

    const category = new CategoryFilter(
      this._carto,
      this._layer,
      widget,
      column,
      this._source,
      readOnly,
      button
    );

    this._addFilter(category);

    return category;
  }

  /**
   * Creates a time series widget filter.
   *
   * Internally this creates a {@link NumericalHistogramFilter} and instances a {@link TimeSeries}.
   *
   * One will take care of the histogram part and the other of the animation parts.
   *
   * There can only be one animation per layer (per VLBridge instance)
   *
   * @param {(HTMLAsTimeSeriesWidgetElement | string)} widget The Time series widget, or a selector
   * @param {string} column The string to pull data from it
   * @param {NumericalHistogramOptions} [options={}]
   * @memberof VLBridge
   */
  public timeSeries(
    widget: HTMLAsTimeSeriesWidgetElement | string,
    column: string,
    options: NumericalHistogramOptions = {}) {
    if (this._animation) {
      throw new Error('There can only be one animation');
    }

    const {
      buckets,
      readOnly,
      totals
    } = options;

    this._animation = new TimeSeries(
      this._layer,
      widget,
      () => {
        this._rebuildFilters();
      }
    );

    const histogram = this.numericalHistogram(widget, column, {
      buckets,
      readOnly,
      totals
    });

    histogram.setTimeSeries(true);

    histogram.on('rangeChanged', (range) => {
      this._animation.setRange(range);
    });
  }

  /**
   * Creates a global range slider filter.
   *
   * @param {(HTMLAsRangeSliderElement | string)} widget A range slider widget or a selector
   * @param {string} column The column to pull data from
   * @returns {GlobalRangeFilter}
   * @memberof VLBridge
   */
  public globalRange(widget: HTMLAsRangeSliderElement | string, column: string): GlobalRangeFilter {
    const range = new GlobalRangeFilter(this._carto, this._layer, widget, column, this._source);

    this._addFilter(range);

    return range;
  }

  /**
   * Call this method after creating all the different filters you require.
   *
   * It will internally do the following:
   *  - Add new variables to your Viz, with the columns of all the non-read-only filters
   *  - Create a new layer as the filters' data source
   * @returns
   * @memberof VLBridge
   */
  public build() {
    if (this._vizFilters.length === 0) {
      return;
    }

    const onLoaded = () => {
      this._appendVariables();
      this._buildDataLayer();
    };

    if (!this._layer.viz) {
      this._layer.on('loaded', onLoaded);
    } else {
      onLoaded();
    }
  }

  private _addFilter(filter: BaseFilter) {
    filter.on('filterChanged', this._rebuildFilters);
    filter.on('expressionReady', this._updateDataLayerVariables);
    this._vizFilters.push(filter);
  }

  /**
   * This will append extra variables with all the columns of non-read-only filters.
   *
   * This is required so that whenever the filter is changed, the original viz layer
   * can be filtered by it.
   *
   * @private
   * @memberof VLBridge
   */
  private _appendVariables() {
    const s = this._carto.expressions;

    this._vizFilters.forEach(
      (filter) => this._layer.viz.variables[`${filter.name}_col`] = s.prop(filter.column)
    );
  }

  /**
   * This will create a new Layer using the same source as the original, add it to the map, and
   * pass it to all the filters so they can hook up to read the data
   *
   * It has style properties to make it invisible, plus all the expressions created by each filter.
   *
   * @private
   * @memberof VLBridge
   */
  private _buildDataLayer() {
    const variables = this._getVariables();
    const s = this._carto.expressions;

    const viz = new this._carto.Viz({
      color: s.rgba(0, 0, 0, 0),
      strokeWidth: 0,
      variables,
    });

    this._readOnlyLayer = new this._carto.Layer(`asbind_ro_${this._id}`, this._source, viz);
    this._readOnlyLayer.addTo(this._map);

    this._vizFilters.forEach((filter) => filter.setDataLayer(this._readOnlyLayer));
  }

  private _getVariables() {
    const variables = this._readOnlyLayer !== undefined ? this._readOnlyLayer.viz.variables : {};

    for (const filter of this._vizFilters) {
      const name = filter.name;

      if (filter.globalExpression) {
        variables[`${name}_global`] = filter.globalExpression;
      }

      if (filter.expression) {
        variables[name] = filter.expression;
      }
    }

    return variables;
  }

  private _updateDataLayerVariables(payload) {
    if (!this._readOnlyLayer.viz) {
      return;
    }

    this._readOnlyLayer.viz.variables[payload.name] = payload.expression;
  }

  /**
   * Gather all the VL filters from each filter, combine them and filter both the data layer and
   * the original layer with it.
   *
   * If there is an animation involved, it uses @animation and all the filters.
   *
   * @private
   * @memberof VLBridge
   */
  private _rebuildFilters() {
    let newFilter = this._combineFilters(
      this._vizFilters
      .filter((hasFilter) => hasFilter.filter !== null)
      .map((hasFilter) => hasFilter.filter)
    );

    // Update (if required) the readonly layer
    if (this._readOnlyLayer) {
      this._readOnlyLayer.viz.filter.blendTo(newFilter, 0);
    }

    if (this._animation) {
      newFilter = `@animation and ${newFilter}`;
    }

    // Update the Visualization filter
    this._layer.viz.filter.blendTo(newFilter, 0);
  }

  private _combineFilters(filters) {
    if (filters.length === 0) {
      return '1';
    }

    return filters.join(' and ');
  }
}

