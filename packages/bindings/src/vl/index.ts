import { BaseFilter } from './base/BaseFilter';
import { Histogram } from './histogram/histogram';

interface HistogramOptions {
  column: string;
  buckets: number;
  readOnly: boolean;
  source: any;
  viz?: any;
  widget: HTMLAsHistogramWidgetElement;
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
    source,
    widget
  }: HistogramOptions) {

    const histogram = new Histogram(
      this._carto,
      this._layer,
      widget,
      column,
      buckets,
      source,
      readOnly
    );

    histogram.on('filterChanged', this._rebuildFilters);
    this._vizFilters.push(histogram);
  }

  public category() {
    // TODO: create category interface
  }

  public timeSeries() {
    // TODO: create TS interface
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
    // Filter data layers
    const layers = this._dataLayers.filter((layer) => layer.id !== name);

    for (const layer of layers) {
      const filters = this._combineFilters(
        this._vizFilters
          .filter((hasFilter) => hasFilter.name !== layer.id && hasFilter.filter !== null)
          .map((hasFilter) => hasFilter.filter)
      );

      layer.viz.filter.blendTo(filters, 0);
    }

    // Filter visualization
    const newFilter = this._combineFilters(
      this._vizFilters
        .filter((hasFilter) => hasFilter.filter !== null)
        .map((hasFilter) => hasFilter.filter)
    );
    this._layer.viz.filter.blendTo(newFilter, 0);

    if (this._readOnlyLayer) {
      this._readOnlyLayer.viz.filter.blendTo(newFilter, 0);
    }
  }

  private _combineFilters(filters) {
    if (filters.length === 0) {
      return '1';
    }

    return filters.join(' and ');
  }
}

