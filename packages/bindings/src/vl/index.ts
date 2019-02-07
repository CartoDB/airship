import semver from 'semver';
import { BaseFilter } from './base/BaseFilter';
import { Category } from './category/category';
import { CategoricalHistogram } from './histogram/categorical';
import { NumericalHistogram } from './histogram/numerical';
import { TimeSeries } from './time-series/times-series';

const VL_VERSION = '^1.1.0';

interface NumericalHistogramOptions {
  column: string;
  buckets: number;
  readOnly: boolean;
  widget: HTMLAsHistogramWidgetElement | HTMLAsTimeSeriesWidgetElement;
}

interface CategoryOptions {
  column: string;
  readOnly: boolean;
  widget: HTMLAsCategoryWidgetElement;
}

interface CategoricalHistogramOptions {
  column: string;
  readOnly: boolean;
  widget: HTMLAsHistogramWidgetElement;
}

export default class VL {
  private _carto: any;
  private _map: any;
  private _layer: any;
  private _source: any;
  private _vizFilters: BaseFilter[] = [];
  private _readOnlyLayer: any;
  private _id: string;
  private _animation: TimeSeries;

  constructor(carto, map, layer, source) {
    this._carto = carto;
    this._map = map;
    this._layer = layer;
    this._source = source;

    this._id = layer.id;

    this._rebuildFilters = this._rebuildFilters.bind(this);

    if (!semver.satisfies(carto.version, VL_VERSION)) {
      throw new Error(`Provided VL version ${carto.version} not supported. Must satisfy ${VL_VERSION}`);
    }
  }

  public numericalHistogram({
    column,
    buckets,
    readOnly,
    widget
  }: NumericalHistogramOptions) {
    const histogram = new NumericalHistogram(
      this._carto,
      this._layer,
      widget,
      column,
      buckets,
      this._source,
      readOnly
    );

    this._addFilter(histogram);

    return histogram;
  }

  public categoricalHistogram({
    column,
    readOnly,
    widget
  }: CategoricalHistogramOptions) {
    const histogram = new CategoricalHistogram(
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

  public histogram({
    column,
    buckets,
    readOnly,
    widget
  }: any) {

    if (buckets === undefined) {
      return this.categoricalHistogram({ column, readOnly, widget });
    }

    return this.numericalHistogram({ column, readOnly, buckets, widget });
  }

  public category({
    column,
    readOnly,
    widget
  }: CategoryOptions) {
    const category = new Category(
      this._carto,
      this._layer,
      widget,
      column,
      this._source,
      readOnly
    );

    this._addFilter(category);

    return category;
  }

  public timeSeries({
    column,
    buckets,
    readOnly,
    widget
  }: NumericalHistogramOptions) {
    if (this._animation) {
      throw new Error('There can only be one Time Series animation');
    }

    this._animation = new TimeSeries(
      this._layer,
      widget as HTMLAsTimeSeriesWidgetElement,
      () => {
        this._rebuildFilters();
      }
    );

    const histogram = this.histogram({
      buckets,
      column,
      readOnly,
      widget
    });

    histogram.on('rangeChanged', (range) => {
      this._animation.setRange(range);
    });
  }

  public build() {
    if (this._vizFilters.length === 0) {
      return;
    }

    this._appendVariables();
    this._buildDataLayer();
  }

  private _addFilter(filter: BaseFilter) {
    filter.on('filterChanged', this._rebuildFilters);
    this._vizFilters.push(filter);
  }

  // Add variables for each required column to original viz
  private _appendVariables() {
    const s = this._carto.expressions;

    this._vizFilters.forEach(
      (filter) => this._layer.viz.variables[`${filter.name}_col`] = s.prop(filter.column)
    );
  }

  // Create a new layer, will be source of data for all widgets
  private _buildDataLayer() {
    const variables = {};
    const s = this._carto.expressions;

    for (const filter of this._vizFilters) {
      variables[filter.name] = filter.expression;
    }

    const viz = new this._carto.Viz({
      color: s.rgba(0, 0, 0, 0),
      strokeWidth: 0,
      variables,
    });

    this._readOnlyLayer = new this._carto.Layer(`asbind_ro_${this._id}`, this._source, viz);
    this._readOnlyLayer.addTo(this._map);

    this._vizFilters.forEach((filter) => filter.setDataLayer(this._readOnlyLayer));
  }

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

