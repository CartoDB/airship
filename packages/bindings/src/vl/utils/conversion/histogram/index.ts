import { HistogramData } from '../../../../../../components/src/components/as-histogram-widget/interfaces';

export function numerical(data: VLNumericalHistogram): HistogramData[] {
  return data.value.map((d) => ({
    end: d.x[1],
    start: d.x[0],
    value: d.y
  }));
}

export function categorical(data: VLCategoricalHistogram): HistogramData[] {
  return data.value.map((d) => ({
    category: d.x,
    end: undefined,
    start: undefined,
    value: d.y
  }));
}

export default { numerical, categorical };
