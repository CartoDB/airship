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

interface CategoryOptions {
  column: string;
  categories: number;
  readonly: boolean;
  widget: HTMLAsCategoryWidgetElement;
}

export default class VL {
  private _carto: any;
  private _map: any;
  private _layer: any;
  private _activeFilters: BaseFilter[] = [];

  constructor(carto, map, layer) {
    this._carto = carto;
    this._map = map;
    this._layer = layer;

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
      readOnly
    );

    histogram.on('filterChanged', this._rebuildFilters);
    this._activeFilters.push(histogram);
  }

  public category(opts: CategoryOptions) {
    // TODO: create category interface
  }

  public timeSeries() {
    // TODO: create TS interface
  }

  private _rebuildFilters() {
    const newFilter = this._combineFilters(
      this._activeFilters
        .filter((hasFilter) => hasFilter.getFilter() !== null)
        .map((hasFilter) => hasFilter.getFilter())
    );
    this._layer.viz.filter.blendTo(newFilter, 0);
  }

  private _combineFilters(rest) {
    if (rest.length === 0) {
      const exp = this._carto.expressions.constant(1);
      exp.default = true;
      return exp;
    }

    if (rest.length === 1) {
      return rest[0];
    }

    const a = rest[0];
    const b = rest.length > 2 ? this._combineFilters(rest.slice(1)) : rest[1];

    return this._carto.expressions.and(
      a,
      b
    );
  }
}

