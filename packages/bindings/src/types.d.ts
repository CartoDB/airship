declare namespace VL {
  type VLBase = any;

  interface Viz {
    variables: {
      [key: string]: any
    };
  }
  
  interface Animation {
    input: any;
    getProgressPct(): number;
    setProgressPct(pct: number): void;
    play(): void;
    pause(): void;
    _paused: boolean;
  }

  interface Histogram {
    value: HistogramData[];
  }

  interface HistogramData {
    x: [number, number];
    y: number;
  }
}
