export interface HistogramData {
  start: number;
  end: number;
  category?: string;
  value: number;
  color?: string;
}

export interface HistogramSelection {
  selection: CategoricalSelectionPayload | ContinuousSelectionPayload
  payload: HistogramData[]
  type: HistogramType
}

type CategoricalSelectionPayload = string[];
type ContinuousSelectionPayload = number[];

export type HistogramType = 'continuous' | 'categorical';

export interface HistogramColorRange {
  min: number;
  max: number;
  color: string;
}
