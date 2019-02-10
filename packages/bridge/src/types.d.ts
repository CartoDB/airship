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
interface NumericalHistogramOptions {
  column: string;
  buckets: number;
  bucketRanges?: BucketRange[];
  readOnly: boolean;
  widget: HTMLAsHistogramWidgetElement | HTMLAsTimeSeriesWidgetElement;
}

interface CategoryOptions {
  column: string;
  readOnly: boolean;
  widget: HTMLAsCategoryWidgetElement;
}

interface CategoricalHistogramOptions {
  column: string;
  readOnly: boolean;
  widget: HTMLAsHistogramWidgetElement;
}
