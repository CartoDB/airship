import { Histogram } from './animation-histogram';

export class Animation {
  private _timeSeries: HTMLAsTimeSeriesWidgetElement;
  private _animation: VL.Animation;
  private _animationLayer: any;
  private _animationViz: VL.Viz;
  private _carto: any;
  private _map: any;
  private _nBuckets: number;
  private _source: any;
  private _dataLayer: any;
  private _histogramBinding: Histogram;

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

    this._animationLayer.on('updated', () => {
      this._timeSeries.progress = this._animation.getProgressPct() * 100;

      // TODO: fix with new VL api
      this._timeSeries.playing = !this._animation._paused;
    });

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

    this._histogramBinding = new Histogram(
      carto,
      this._map,
      this._source,
      this._animationViz,
      this._timeSeries,
      columnName,
      this._nBuckets,
    );

    this._histogramBinding.on('rangeChanged', (range) => {
      this._animation.input.min.blendTo(range[0], 0);
      this._animation.input.max.blendTo(range[1], 0);
    });
  }
}

export default Animation;
