import { isHistogramEqual } from '../utils/comparison/histogram';
import { vlToAirship } from '../utils/conversion/histogram';

export class Animation {
  private _timeSeries: HTMLAsTimeSeriesWidgetElement;
  private _animation: VL.Animation;
  private _animationLayer: any;
  private _animationViz: VL.Viz;
  private _dataViz: VL.Viz;
  private _carto: any;
  private _map: any;
  private _nBuckets: number;
  private _lastHistogram: VL.HistogramData[] = null;
  private _source: any;
  private _dataLayer: any;

  constructor(
    carto: VL.VLBase,
    map: any,
    source: any,
    animationLayer: any,
    timeSeries: HTMLAsTimeSeriesWidgetElement,
    nBuckets: number,
  ) {

    this._timeSeries = timeSeries;
    this._carto = carto;
    this._nBuckets = nBuckets;
    this._animationLayer = animationLayer;
    this._map = map;
    this._source = source;
    this._carto = carto;

    animationLayer.on('loaded', this._onLayerLoaded.bind(this));
  }

  public removeHistogramLayer() {
    this._dataLayer.remove();
  }

  private _onLayerLoaded() {
    const carto = this._carto;
    this._animationViz = this._animationLayer.viz;
    this._animation = this._animationViz.variables.animation;

    if (this._animation.input.expressionName !== 'linear') {
      throw new Error('Animation must have a linear interpolation as its value');
    }

    const columnName = this._animation.input.input.name;

    this._dataViz = new carto.Viz(`
      @histogram: viewportHistogram($${columnName}, ${this._nBuckets})

      strokeWidth: 0
      color: rgba(255,255,255,0)
    `);

    this._dataLayer = new carto.Layer(`as-animation-${columnName}`, this._source, this._dataViz);
    this._dataLayer.addTo(this._map, 'watername_ocean');

    this._dataLayer.on('updated', () => {
      const newHistogram = (this._dataViz.variables.histogram as VL.Histogram).value;
      if (this._lastHistogram === null || !isHistogramEqual(this._lastHistogram, newHistogram)) {
        this._animation.input.min.blendTo(newHistogram[0].x[0], 0);
        this._animation.input.max.blendTo(newHistogram[newHistogram.length - 1].x[1], 0);

        this._lastHistogram = newHistogram;

        this._timeSeries.data = vlToAirship(newHistogram);
      }
    });

    this._animationLayer.on('updated', () => {
      this._timeSeries.progress = this._animation.getProgressPct() * 100;

      // TODO: fix with new api
      this._timeSeries.playing = !this._animation._paused;
    });

    this._timeSeries.disableInteractivity = true;
    this._timeSeries.animated = true;

    this._timeSeries.addEventListener('seek', (evt: CustomEvent) => {
      this._animation.setProgressPct(evt.detail / 100);

      this._timeSeries.progress = evt.detail;
    });

    this._timeSeries.addEventListener('play', () => {
      this._animation.play();
    });

    this._timeSeries.addEventListener('pause', () => {
      this._animation.pause();
    });
  }
}

export default Animation;
