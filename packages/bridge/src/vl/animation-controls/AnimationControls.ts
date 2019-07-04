import { VL_BINARY_EXPRESSION_TYPES, VLAnimation, VLViz } from '../../types';
import { select } from '../../util/Utils';

export class AnimationControls {
  private _animation: VLAnimation;
  private _animationWidget: any;
  private _carto: any;
  private _column: string;
  private _variableName: string;
  private _propertyName: string;
  private _duration: number;
  private _fade: [number, number];
  private _layer: any;
  private _viz: VLViz;
  private _formatCb: () => void;

  constructor(
    animationWidget: any | string,
    carto: any,
    column: string,
    variableName: string = 'animation',
    propertyName: string = 'filter',
    duration: number = 10,
    fade: [number, number] = [0.15, 0.15],
    layer: any,
    readyCb: () => void,
    formatCb: () => void
  ) {
    this._animationWidget = select(animationWidget) as any;
    this._column = column;
    this._variableName = variableName;
    this._propertyName = propertyName;
    this._carto = carto;
    this._duration = duration;
    this._fade = fade;
    this._animationWidget.playing = false;
    this._animationWidget.isLoading = true;
    this._layer = layer;
    this._formatCb = formatCb;

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

  public fn(x: any): any {
    return x;
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

  public setRange() {
    // TODO
  }

  private _onLayerLoaded() {
    this._viz = this._layer.viz;

    const expr = this._variableName && this._viz.variables[this._variableName]
      ? this._viz.variables[this._variableName]
      : this._propertyName ? this._viz[this._propertyName] : this._createAnimation();

    if (VL_BINARY_EXPRESSION_TYPES.indexOf(expr.expressionName) > -1) {
      this._animation = expr.a.expressionName === 'animation' ? expr.a : expr.b;
    } else {
      this._animation = expr;
    }

    this._animationWidget.duration = this._animation.duration.value;
    this._animationWidget.playing = true;
    this._animationWidget.isLoading = false;

    this._animationWidget.addEventListener('play', () => {
      this._animation.play();
    });

    this._animationWidget.addEventListener('pause', () => {
      this._animation.pause();
    });

    this._animationWidget.addEventListener('seek', (evt) => {
      this._animation.setProgressPct(evt.detail[0] / 100);
      this._animation.notify();
      this._animationWidget.progressValue = this._formatProgressValue();
    });

    this._layer.on('updated', () => {
      this._animationWidget.progress = this._animation.getProgressPct() * 100;
      this._animationWidget.progressValue = this._formatProgressValue();
    });
  }

  private _formatProgressValue() {
    const type = this._animation.input.type;
    const progressValue = this._animation.getProgressValue();
    const formats = {
      dateFormat(value) {
        const date = value._date;
        return this._formatCb ? this._formatCb(date) : date.toISOString();
      },

      timerangeFormat(value) {
        const date = value._date;
        return this._formatCb ? this._formatCb(date) : date.toISOString();
      },

      numberFormat(value) {
        return this._formatCb ? this._formatCb(value) : value;
      },

      categoryFormat(value) {
        return this._formatCb ? this._formatCb(value) : value;
      }
    };

    return formats[`${type}Format`](progressValue);
  }


  private _createAnimation() {
    const s = this._carto.expressions;
    const animation = s.animation(
      s.linear(
        s.prop(this._column),
        s.globalMin(s.prop(this._column)),
        s.globalMax(s.prop(this._column))
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
