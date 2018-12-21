import { BaseFilter } from './base/BaseFilter';
import { Histogram } from './histogram/histogram';
import { TimeSeries } from './time-series/times-series';

interface HistogramOptions {
  column: string;
  buckets: number;
  readOnly: boolean;
  widget: HTMLAsHistogramWidgetElement | HTMLAsTimeSeriesWidgetElement;
}

export default class VL {
  private _carto: any;
  private _map: any;
  private _layer: any;
  private _source: any;
  private _vizFilters: BaseFilter[] = [];
  private _dataLayers: any = [];
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
  }

  public histogram({
    column,
    buckets,
    readOnly,
    widget
  }: HistogramOptions) {

    const histogram = new Histogram(
      this._carto,
      this._layer,
      widget,
      column,
      buckets,
      this._source,
      readOnly
    );

    histogram.on('filterChanged', this._rebuildFilters);
    this._vizFilters.push(histogram);

    return histogram;
  }

  public category() {
    // TODO: create category interface
  }

  public timeSeries({
    column,
    buckets,
    readOnly,
    widget
  }: HistogramOptions) {
    if (this._animation) {
      throw new Error('There can only be one Time Series animation');
    }

    this._animation = new TimeSeries(
      this._layer,
      widget as HTMLAsTimeSeriesWidgetElement,
      () => {
        this._rebuildFilters('');
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
    this._buildReadOnly();
    this._buildFilters();
  }

  private _buildFilters() {
    const filters = this._vizFilters.filter((filter) => !filter.readOnly);
    const columns = filters.map((hasFilter) => hasFilter.column);

    for (const hasFilter of filters) {
      const dataLayer = hasFilter.buildDataLayer(columns);

      dataLayer.addTo(this._map, 'watername_ocean');

      this._dataLayers.push(dataLayer);
    }
  }

  private _buildReadOnly() {
    const carto = this._carto;
    const readOnlyFilters = this._vizFilters.filter((hasFilter) => hasFilter.readOnly);

    if (readOnlyFilters.length > 0) {
      const readOnlyExpr = readOnlyFilters.map((filter) => filter.expression).join('\n');
      const readOnlyViz = new carto.Viz(`
        ${readOnlyExpr}

        strokeWidth: 0
        color: rgba(255,255,255,0)
      `);

      this._readOnlyLayer = new carto.Layer(`asbind_ro_${this._id}`, this._source, readOnlyViz);
      this._readOnlyLayer.addTo(this._map, 'watername_ocean');

      readOnlyFilters.forEach((filter) => filter.setDataLayer(this._readOnlyLayer));
    }

  }

  private _rebuildFilters(name: string) {
    // We need to rebuild filters for all layers that are not the one that caused it
    const layers = this._dataLayers.filter((layer) => layer.id !== name);

    for (const layer of layers) {
      const filters = this._combineFilters(
        this._vizFilters
          .filter((hasFilter) => hasFilter.name !== layer.id && hasFilter.filter !== null)
          .map((hasFilter) => hasFilter.filter)
      );

      layer.viz.filter.blendTo(filters, 0);
    }

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

