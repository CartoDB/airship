export interface HistogramData {
  start: Date | number;
  end: Date | number;
  category?: string;
  value: number;
  color?: string;
}

export interface HistogramSelection {
  selection: CategoricalSelectionPayload | ContinuousSelectionPayload;
  payload: HistogramData[];
  type: HistogramType;
}

type CategoricalSelectionPayload = string[];
type ContinuousSelectionPayload = Array<Date | number>;
type TooltipFormat = string | string[];

export type HistogramType = 'continuous' | 'categorical';

export interface HistogramColorRange {
  min: number;
  max: number;
  color: string;
}

export interface AxisOptions {
  format?: (value: number) => string;
  padding?: number;
  values?: number[];
  ticks?: number;
}
