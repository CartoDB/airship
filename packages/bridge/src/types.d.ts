interface VLViz {
  variables: {
    [key: string]: any
  };
}

interface VLAnimation {
  input: any;
  _paused: boolean;
  getProgressPct(): number;
  setProgressPct(pct: number): void;
  play(): void;
  pause(): void;
  isPlaying(): boolean;
}


type NumericalHistogramData = VLHistogramData<[number, number]>;
type CategoricalHistogramData = VLHistogramData<string>;
interface VLNumericalHistogram {
  value: NumericalHistogramData[];
}

interface VLCategoricalHistogram {
  value: CategoricalHistogramData[];
}

interface VLHistogramData<T> {
  x: T;
  y: number;
}

interface RGBColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}
interface LegendEntry {
  key: string | number;
  value: RGBColor | string;
}
interface LegendData {
  type: string;
  data: LegendEntry[];
}

type BucketRange = [number, number];

/**
 * Options for creating a {@link NumericalHistogramFilter}
 *
 * @interface NumericalHistogramOptions
 */
interface NumericalHistogramOptions {
  /**
   * Which column the histogram will get fed data from.
   *
   * @type {string}
   * @memberof NumericalHistogramOptions
   */
  column: string;

  /**
   * Number of buckets for the histogram
   *
   * @type {number}
   */
  buckets: number;

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
  readOnly: boolean;

  /**
   * The HTML element for an as-histogram-widget or an as-time-series-widget
   *
   * @type {(HTMLAsHistogramWidgetElement | HTMLAsTimeSeriesWidgetElement)}
   */
  widget: HTMLAsHistogramWidgetElement | HTMLAsTimeSeriesWidgetElement;

  /**
   * Whether the widget should show the totals or not
   *
   * @type {boolean}
   * @memberof NumericalHistogramOptions
   */
  totals: boolean;
}

/**
 * Object used as arguments to create a {@link CategoryFilter}
 *
 * @interface CategoryOptions
 */
interface CategoryOptions {
  /**
   * Column that will feed the category widget data.
   *
   * @type {string}
   */
  column: string;

  /**
   * Whether the widget will be able to filter or not
   *
   * @type {boolean}
   */
  readOnly: boolean;

  /**
   * The HTML Element for an Airship's as-category-widget
   *
   * @type {HTMLAsCategoryWidgetElement}
   */
  widget: HTMLAsCategoryWidgetElement;
}

/**
 * Options for creating a {@link CategoricalHistogramFilter}
 *
 * @interface CategoricalHistogramOptions
 */
interface CategoricalHistogramOptions {
  /**
   * Column that will feed the as-histogram-widget data.
   *
   * @type {string}
   * @memberof CategoricalHistogramOptions
   */
  column: string;

  /**
   * Whether this widget will be able to filter or not.
   *
   * @type {boolean}
   * @memberof CategoricalHistogramOptions
   */
  readOnly: boolean;

  /**
   * The HTML Element for an Airship's as-histogram-widget
   *
   * @type {HTMLAsHistogramWidgetElement}
   * @memberof CategoricalHistogramOptions
   */
  widget: HTMLAsHistogramWidgetElement;
}

interface GlobalRangeOptions {
  /**
   * The HTML Element for an Airship as-range-slider
   *
   * @type {HTMLAsRangeSliderElement}
   * @memberof GlobalRangeOptions
   */
  widget: HTMLAsRangeSliderElement;

  /**
   * The column you want to filter using the range slider
   *
   * @type {string}
   * @memberof GlobalRangeOptions
   */
  column: string;
}
