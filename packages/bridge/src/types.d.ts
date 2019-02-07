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
