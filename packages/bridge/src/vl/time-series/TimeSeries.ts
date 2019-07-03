import { VL_BINARY_EXPRESSION_TYPES, VLAnimation, VLViz } from '../../types';
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
  private _timeSeries: any;
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
    variableName: string = 'animation',
    propertyName: string = 'filter'
  ) {

    this._timeSeries = select(timeSeries) as any;
    this._layer = layer;
    this._carto = carto;
    this._columnName = column;
    this._duration = duration;
    this._fade = fade;
    this._variableName = variableName;
    this._propertyName = propertyName;

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
  public setRange(range: [number, number]) {
    if (!this._animation || !this._animation.input || !this._animation.input.min || !this._animation.input.max) {
      return;
    }

    if (range === null) {
      this._animation.input.min.blendTo(this._min, 0);
      this._animation.input.max.blendTo(this._max, 0);
      this._animation.duration.blendTo(this._duration, 0);
    } else if (range[0] !== range[1]) {
      const ratio = Math.min(1, (range[1] - range[0]) / (this._max.value - this._min.value));
      this._animation.input.min.blendTo(range[0], 0);
      this._animation.input.max.blendTo(range[1], 0);

      this._animation.duration.blendTo(this._duration * ratio, 0);
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

    if (!this._viz.variables[this._variableName]) {
      this._animation = this._createAnimation();

      /* Big hack, this is done internally on VL */
      this._animation.parent = this._viz;
      this._animation.notify = this._viz._changed.bind(this._viz);

      this._viz.variables[this._variableName] = this._animation;
    } else {
      const expr = this._viz.variables[this._variableName];
      if (VL_BINARY_EXPRESSION_TYPES.indexOf(expr.expressionName) > -1) {
        this._animation = expr.a.expressionName === 'animation' ? expr.a : expr.b;
      } else {
        this._animation = expr;
      }
    }

    this._max = this._animation.input.max;
    this._min = this._animation.input.min;
    this._duration = this._animation.duration.value;

    this._layer.on('updated', () => {
      this._timeSeries.progress = this._animation.getProgressPct() * 100;

      this._timeSeries.playing = this._animation.isPlaying();
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

  private _createAnimation() {
    const s = this._carto.expressions;
    const animation = s.animation(
      s.linear(
        s.prop(this._columnName),
        s.globalMin(s.prop(this._columnName)),
        s.globalMax(s.prop(this._columnName))
      ),
      this._duration,
      s.fade(
        this._fade[0],
        this._fade[1]
      )
    );

    return animation;
  }
}

export default TimeSeries;
