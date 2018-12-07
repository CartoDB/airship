import mitt from 'mitt';
import { isHistogramEqual } from '../utils/comparison/histogram';
import { vlToAirship } from '../utils/conversion/histogram';


export class Histogram {

  private _columnName: string;
  private _nBuckets: number;
  private _dataViz: VL.Viz;
  private _map: any;
  private _lastHistogram: VL.HistogramData[] = null;
  private _source: any;
  private _dataLayer: any;
  private _widget: HTMLAsTimeSeriesWidgetElement | HTMLAsHistogramWidgetElement;
  private _emitter: mitt.Emitter;
  private _selection: [number, number];

  constructor(
    carto: VL.VLBase,
    map: any,
    source: any,
    viz: any,
    histogram: HTMLAsTimeSeriesWidgetElement | HTMLAsHistogramWidgetElement,
    columnName: string,
    nBuckets: number
  ) {

    this._columnName = columnName;
    this._nBuckets = nBuckets;
    this._map = map;
    this._source = source;
    this._widget = histogram;
    this._emitter = new mitt();

    this._dataViz = new carto.Viz(`
      @histogram: viewportHistogram($${this._columnName}, ${this._nBuckets})

      strokeWidth: 0
      color: rgba(255,255,255,0)
    `);

    this._dataLayer = new carto.Layer(`as-animation-${this._columnName}`, this._source, this._dataViz);
    this._dataLayer.addTo(this._map, 'watername_ocean');

    this._dataLayer.on('updated', () => {
      const newHistogram = (this._dataViz.variables.histogram as VL.Histogram).value;
      if (this._lastHistogram === null || !isHistogramEqual(this._lastHistogram, newHistogram)) {
        this._emitter.emit('rangeChanged', [
          newHistogram[0].x[0],
          newHistogram[newHistogram.length - 1].x[1]
        ]);

        this._lastHistogram = newHistogram;

        this._widget.data = vlToAirship(newHistogram);
      }
    });

    this._widget.addEventListener('selectionChanged', (evt: CustomEvent) => {
      console.log(evt.detail);
      console.log(viz.filter);
    });
  }

  public removeHistogramLayer() {
    this._dataLayer.remove();
  }

  public on(type: string, handler: mitt.Handler) {
    this._emitter.on(type, handler);
  }
}
