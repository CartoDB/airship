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
}

interface VLHistogram {
  value: VLHistogramData[];
}

interface VLHistogramData {
  x: [number, number];
  y: number;
}
