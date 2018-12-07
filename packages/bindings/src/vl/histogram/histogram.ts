import mitt from 'mitt';
import { BaseFilter } from '../base/BaseFilter';
import { isHistogramEqual } from '../utils/comparison/histogram';
import { vlToAirship } from '../utils/conversion/histogram';

export class Histogram extends BaseFilter {

  private _columnName: string;
  private _buckets: number;
  private _carto: any;
  private _viz: VL.Viz;
  private _lastHistogram: VL.HistogramData[] = null;
  private _layer: any;
  private _widget: HTMLAsTimeSeriesWidgetElement | HTMLAsHistogramWidgetElement;
  private _selection: [number, number] = null;
  private _variableName: string;

  constructor(
    carto: any,
    layer: any,
    histogram: HTMLAsTimeSeriesWidgetElement | HTMLAsHistogramWidgetElement,
    columnName: string,
    nBuckets: number,
    readOnly: boolean = true
  ) {

    super();

    this._columnName = columnName;
    this._buckets = nBuckets;
    this._widget = histogram;
    this._layer = layer;
    this._carto = carto;

    histogram.disableInteractivity = readOnly;

    if (!readOnly) {
      this._widget.addEventListener('selectionChanged', this._selectionChanged.bind(this));
    }

    if (layer.viz !== undefined) {
      this._onLayerLoaded();
    } else {
      this._layer.on('loaded', this._onLayerLoaded.bind(this));
    }

    this._layer.on('updated', () => {
      const newHistogram = (this._viz.variables[this._variableName] as VL.Histogram).value;
      if (!newHistogram) {
        return;
      }

      if (this._selection !== null) {
        return;
      }

      if (this._lastHistogram === null || !isHistogramEqual(this._lastHistogram, newHistogram)) {
        this._emitter.emit('rangeChanged', [
          newHistogram[0].x[0],
          newHistogram[newHistogram.length - 1].x[1]
        ]);

        this._lastHistogram = newHistogram;

        this._widget.data = vlToAirship(newHistogram);
      }
    });
  }

  public setLayer(layer: any) {
    this._layer = layer;
  }

  public removeHistogramLayer() {
    this._layer.remove();
  }

  public on(type: string, handler: mitt.Handler) {
    this._emitter.on(type, handler);
  }

  public getFilter() {
    const s = this._carto.expressions;

    if (this._selection === null) {
      return null;
    } else {
      return s.between(
        s.prop(this._columnName),
        this._selection[0],
        this._selection[1]
      );
    }
  }

  private _onLayerLoaded() {
    this._viz = this._layer.viz;

    this._variableName = `asbindings-hist-${this._columnName}`;
    if (this._viz.variables[this._variableName]) {
      throw new Error(`Viz cannot have a variable called ${this._variableName}`);
    }

    const s = this._carto.expressions;
    const histogram = s.viewportHistogram(
      s.prop(this._columnName),
      this._buckets
    );

    this._viz.variables[this._variableName] = histogram;
  }

  private _selectionChanged(evt: CustomEvent) {
    if (evt.detail === null) {
      this._selection = null;
      this._filterChanged();
    } else {
      this._selection = evt.detail;
      this._filterChanged();
    }
  }
}
