interface VLViz {
  variables: {
    [key: string]: any
  };
  _changed: () => void;
}

interface VLAnimation {
  input: any;
  _paused: boolean;
  parent: any;
  duration: any;
  notify: () => void;
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

interface VLBridgeOptions {
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
interface NumericalHistogramOptions {
  /**
   * Number of buckets for the histogram
   *
   * @type {number}
   */
  buckets?: number;

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

interface AnimationOptions extends NumericalHistogramOptions {
  duration?: number;

  fade?: [number, number];

  variableName?: string;
}

/**
 * Object used as arguments to create a {@link CategoryFilter}
 *
 * @interface CategoryOptions
 */
interface CategoryOptions {
  /**
   * Whether the widget will be able to filter or not
   *
   * @type {boolean}
   */
  readOnly?: boolean;

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
interface CategoricalHistogramOptions {
  /**
   * Whether this widget will be able to filter or not.
   *
   * @type {boolean}
   * @memberof CategoricalHistogramOptions
   */
  readOnly?: boolean;

  /**
   * Whether this widget should show the total values or not
   *
   * @type {boolean}
   * @memberof CategoricalHistogramOptions
   */
  totals?: boolean;
}
