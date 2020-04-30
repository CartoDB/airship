export interface VLViz {
  variables: {
    [key: string]: any
  };
  [key: string]: any;
  _changed: () => void;
}

export interface VLAnimation {
  input: any;
  _paused: boolean;
  parent: any;
  duration: any;
  propertyName: string;
  notify: () => void;
  getProgressPct(): number;
  getProgressValue(): number | Date | VLTimeZoneDate;
  setProgressPct(pct: number): void;
  play(): void;
  pause(): void;
  isPlaying(): boolean;
}

export interface VLTimeZoneDate {
  _value: number | string;
  _date: Date;
  _timeZone: number | string;
}

export type NumericalHistogramData = VLHistogramData<[number | Date, number | Date]>;
export type CategoricalHistogramData = VLHistogramData<string>;
export interface VLNumericalHistogram {
  value: NumericalHistogramData[];
  getJoinedValues?: any;
  input: any;
}

export interface VLCategoricalHistogram {
  value: CategoricalHistogramData[];
  getJoinedValues?: any;
  getAllCategories?(): Array<{ name: string, frequency: number }>;
}

export interface VLHistogramData<T> {
  x: T;
  y: number;
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}
export interface LegendEntry {
  key: string | number;
  value: RGBColor | string;
}
export interface LegendData {
  type: string;
  data: LegendEntry[];
}

export type BucketRange = [Date | number, Date | number];

export interface VLBridgeOptions {
  carto: any;
  map: any;
  layer: any;
  source: any;
}

/**
 * Options for creating a {@link NumericalHistogramFilter}
 *
 * @interface NumericalHistogramOptions
 */
export interface NumericalHistogramOptions {
  /**
   * Number of buckets for the histogram
   *
   * @type {number}
   */
  buckets?: number;

  /**
   * Numeric value to weight by. 1 by default
   *
   * @type {number|string}
   */

  weight?: number | string;

  /**
   * Explicit bucket declarations. See
   * [the VL docs]{@link https://carto.com/developers/carto-vl/reference/#cartoexpressionsviewporthistogram}
   * for more details
   *
   * @type {BucketRange[]}
   */
  bucketRanges?: BucketRange[];

  /**
   * Whether this Histogram will be able to filter or not
   *
   * @type {boolean}
   */
  readOnly?: boolean;

  /**
   * Whether the widget should show the totals or not
   *
   * @type {boolean}
   * @memberof NumericalHistogramOptions
   */
  totals?: boolean;
}

export interface AnimationOptions extends NumericalHistogramOptions {
  duration?: number;

  fade?: [number, number];

  variableName?: string;

  propertyName?: string;

  autoplay?: boolean;
}

/**
 * Options for the Animation Controls widget
 *
 * @type {AnimationControlsOptions}
 */
export interface AnimationControlsOptions {
  duration?: number;

  fade?: [number, number];

  variableName?: string;

  propertyName?: string;

  autoplay?: boolean;
}

/**
 * Object used as arguments to create a {@link CategoryFilter}
 *
 * @interface CategoryOptions
 */
export interface CategoryOptions {
  /**
   * Whether the widget will be able to filter or not
   *
   * @type {boolean}
   */
  readOnly?: boolean;

  /**
   * Numeric value to weight by. 1 by default
   *
   * @type {number|string}
   */
  weight?: number | string;

  /**
   * If this is passed, the filtering will happen after this button is pressed
   *
   * @type {HTMLElement}
   * @memberof CategoryOptions
   */
  button?: HTMLElement;
}

/**
 * Options for creating a {@link CategoricalHistogramFilter}
 *
 * @interface CategoricalHistogramOptions
 */
export interface CategoricalHistogramOptions {
  /**
   * Whether this widget will be able to filter or not.
   *
   * @type {boolean}
   * @memberof CategoricalHistogramOptions
   */
  readOnly?: boolean;

  /**
   * Numeric value to weight by. 1 by default
   *
   * @type {number|string}
   */
  weight?: number | string;

  /**
   * Whether this widget should show the total values or not
   *
   * @type {boolean}
   * @memberof CategoricalHistogramOptions
   */
  totals?: boolean;
}
