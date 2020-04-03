import { VLAnimation, VLViz } from '../../types';
import { select } from '../../util/Utils';

/**
 * This class is an orchestrator for Time Series widgets. It does not extend BaseFilter because for all intents
 * and purposes, we can use a numerical histogram. This class is only responsible of particular Time Series event
 * handling with regards to VL.
 *
 * The provided layer Viz object *must have* a variable called `@animation`
 *
 * @export
 * @class TimeSeries
 */
export class TimeSeries {
  private _timeSeriesWidget: any;
  private _animation: VLAnimation;
  private _layer: any;
  private _viz: VLViz;
  private _dataLayer: any;
  private _min: any;
  private _max: any;
  private _carto: any;
  private _columnName: string;
  private _duration: number;
  private _fade: [number, number];
  private _variableName: string;
  private _propertyName: string;
  private _autoplay: boolean;

  /**
   * Creates an instance of TimeSeries.
   * @param {*} carto CARTO VL namespace
   * @param {*} layer A CARTO VL layer
   * @param {any | string} timeSeries An Airship TimeSeries HTML element, or a selector
   * @param {() => void} readyCb A callback to be called when we're done configuring internals
   * @memberof TimeSeries
   */
  constructor(
    carto: any,
    layer: any,
    column: string,
    timeSeries: any | string,
    readyCb: () => void,
    duration: number = 10,
    fade: [number, number] = [0.15, 0.15],
    variableName: string,
    propertyName: string,
    autoplay?: boolean
  ) {
    this._timeSeriesWidget = select(timeSeries) as any;
    this._layer = layer;
    this._carto = carto;
    this._columnName = column;
    this._duration = duration;
    this._fade = fade;
    this._variableName = variableName || 'animation';
    this._propertyName = propertyName || 'filter';
    this._autoplay = autoplay || false;

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

  /**
   * Set the range of the animation input.
   *
   * This is called when the time series selection is changed.
   *
   * @param {[number, number]} range
   * @returns
   * @memberof TimeSeries
   */
  public setRange(range: [number, number] | [ Date, Date ]) {
    if (!this._animation || !this._animation.input || !this._animation.input.min || !this._animation.input.max) {
      return;
    }

    if (range === null) {
      this._animation.input.min.blendTo(this._min, 0);
      this._animation.input.max.blendTo(this._max, 0);
      this._animation.duration.blendTo(this._duration, 0);
    } else if (range[0] !== range[1]) {
      const s = this._carto.expressions;
      let min;
      let max;
      let ratio;

      if (this._animation.input.min.expressionName === 'Blend' &&
        this._animation.input.min.mix.expressionName !== 'Transition') {
        if (typeof range[0] === 'number' && typeof range[1] === 'number') {
          min = range[0];
          max = range[1];
          ratio = Math.min(1, (max - min) / (this._max.value - this._min.value));
        } else if (range[0] instanceof Date && range[1] instanceof Date) {
          min = s.time(range[0]);
          max = s.time(range[1]);
          ratio = Math.min(1, (range[0].getTime() - range[1].getTime()) / (this._max.value - this._min.value));
        }

        this._animation.input.min.blendTo(min, 0);
        this._animation.input.max.blendTo(max, 0);
        this._animation.duration.blendTo(this._duration * ratio, 0);
      }
    }
  }

  public get variableName(): string {
    return this._variableName;
  }

  public get propertyName(): string {
    return this._propertyName;
  }

  public set propertyName(name) {
    this._propertyName = name;
  }

  public setDuration(duration: number) {
    this._duration = duration;
    this._animation.duration.blendTo(duration, 0);
  }

  public get animation(): VLAnimation {
    return this._animation;
  }

  public restart() {
    this._animation.setProgressPct(0);
  }

  /**
   * This method sets up the events to handle animation updates and bind it to the TimeSeries widget:
   *  - Update the progress
   *  - Update the progress when user seeks
   *  - Play / Pause events
   *
   * @private
   * @memberof TimeSeries
   */
  private _onLayerLoaded() {
    this._viz = this._layer.viz;

    const expr = this._getAnimationExpression();

    if (expr.a && expr.b) {
      this._animation = expr.a.expressionName === 'animation' ? expr.a : expr.b;
    } else {
      this._animation = expr;
    }

    this._viz.variables[this._variableName] = this._animation;
    this._viz[this._propertyName].blendTo(expr, 0);

    this._animation.parent = this._viz;
    this._animation.notify = this._viz._changed.bind(this._viz);

    this._max = this._animation.input.max;
    this._min = this._animation.input.min;
    this._duration = this._animation.duration.value;

    this._layer.on('updated', () => {
      this._timeSeriesWidget.progress = this._animation.getProgressPct() * 100;
      this._timeSeriesWidget.playing = this._animation.isPlaying();
    });

    this._timeSeriesWidget.animated = this._autoplay;

    this._timeSeriesWidget.addEventListener('seek', (evt: CustomEvent) => {
      this._animation.setProgressPct(evt.detail / 100);

      this._timeSeriesWidget.progress = evt.detail;
    });

    this._timeSeriesWidget.addEventListener('play', () => {
      this._animation.play();
    });

    this._timeSeriesWidget.addEventListener('pause', () => {
      this._animation.pause();
    });
  }

  private _getAnimationExpression() {
    if (this._variableName && this._viz.variables[this._variableName]) {
      return this._viz.variables[this._variableName];
    }

    if (this._propertyName &&
      this._viz[this._propertyName] &&
      this._viz[this._propertyName].isAnimated()) {
        return this._viz[this._propertyName];
    }

    return this._createDefaultAnimation();
  }

  private _createDefaultAnimation() {
    const s = this._carto.expressions;

    return s.animation(
      s.linear(s.prop(this._columnName)),
      this._duration,
      s.fade(
        this._fade[0],
        this._fade[1]
      )
    );
  }
}

export default TimeSeries;
