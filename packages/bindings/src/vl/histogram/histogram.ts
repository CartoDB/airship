import mitt from 'mitt';
import { BaseFilter } from '../base/BaseFilter';
import { isHistogramEqual } from '../utils/comparison/histogram';
import { vlToAirship } from '../utils/conversion/histogram';

export class Histogram extends BaseFilter {
  private _buckets: number;
  private _carto: any;
  private _lastHistogram: VLHistogramData[] = null;
  private _widget: HTMLAsTimeSeriesWidgetElement | HTMLAsHistogramWidgetElement;
  private _selection: [number, number] = null;
  private _dataLayer: any;

  constructor(
    carto: any,
    layer: any,
    histogram: HTMLAsTimeSeriesWidgetElement | HTMLAsHistogramWidgetElement,
    columnName: string,
    nBuckets: number,
    source: any,
    readOnly: boolean = true
  ) {
    super('histogram', columnName, layer, source, readOnly);

    this._buckets = nBuckets;
    this._widget = histogram;
    this._carto = carto;

    histogram.disableInteractivity = readOnly;
    histogram.showClear = !readOnly;

    this._selectionChanged = this._selectionChanged.bind(this);

    if (!readOnly) {
      this._widget.addEventListener('selectionChanged', this._selectionChanged);
    }
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

  public getDataLayer() {
    return this._dataLayer;
  }

  public buildDataLayer(columns: string[]) {
    const carto = this._carto;
    const variables = columns.map((column, i) => `@asbind_${column}_${i}: $${column}`);

    // Create the data layer
    const dataViz = new carto.Viz(`
      ${this.expression}
      ${variables.join('\n')}

      strokeWidth: 0
      color: rgba(255,255,255,0)
    `);

    this._dataLayer = new carto.Layer(this.name, this.source, dataViz);

    this._bindDataLayer();

    return this._dataLayer;
  }

  public get filter(): string {
    if (this._selection === null) {
      return null;
    } else {
      return `between($${this._column}, ${this._selection[0]}, ${this._selection[1]})`;
    }
  }

  public get expression(): string {
    return `@${this.name}: viewportHistogram($${this._column}, ${this._buckets})`;
  }

  public setDataLayer(layer: any) {
    this._dataLayer = layer;

    this._bindDataLayer();
  }

  private _bindDataLayer() {
    this._dataLayer.on('updated', () => {
      const newHistogram = (this._dataLayer.viz.variables[this.name] as VLHistogram).value;
      if (!newHistogram) {
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

  private _selectionChanged(evt: CustomEvent) {
    if (evt.detail === null) {
      this._selection = null;
    } else {
      this._selection = [Number(evt.detail.selection[0]), Number(evt.detail.selection[1])];
    }

    this._emitter.emit('rangeChanged', this._selection);

    this._filterChanged();
  }
}
