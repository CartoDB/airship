export class TimeSeries {
  private _timeSeries: HTMLAsTimeSeriesWidgetElement;
  private _animation: VLAnimation;
  private _layer: any;
  private _viz: VLViz;
  private _dataLayer: any;
  private _min: number;
  private _max: number;

  constructor(
    layer: any,
    timeSeries: HTMLAsTimeSeriesWidgetElement,
    readyCb: () => void
  ) {

    this._timeSeries = timeSeries;
    this._layer = layer;

    if (layer.viz) {
      this._onLayerLoaded();
      readyCb();
    } else {
      layer.on('loaded', () => {
        this._onLayerLoaded();
        readyCb();
      });
    }
  }

  public removeHistogramLayer() {
    this._dataLayer.remove();
  }

  public setRange(range: [number, number]) {
    if (!this._animation || !this._animation.input || !this._animation.input.min || !this._animation.input.max) {
      return;
    }

    if (range === null) {
      this._animation.input.min.blendTo(this._min, 0);
      this._animation.input.max.blendTo(this._max, 0);
    } else {
      this._animation.input.min.blendTo(range[0], 0);
      this._animation.input.max.blendTo(range[1], 0);
    }

  }

  public getFilter() {
    return `animation(
      ${(this._animation as any)._input.toString()},
      ${(this._animation as any).duration.toString()},
      ${(this._animation as any).fade.toString()}
    )`;
  }

  private _onLayerLoaded() {
    this._viz = this._layer.viz;

    if (!this._viz.variables.animation) {
      throw new Error('Variable @animation missing!');
    }

    this._animation = this._viz.variables.animation;
    this._max = this._viz.variables.animation.input.max;
    this._min = this._viz.variables.animation.input.min;

    this._layer.on('updated', () => {
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
  }
}

export default TimeSeries;
