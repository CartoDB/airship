import { HistogramData } from '../../../../../components/src/components/as-histogram-widget/interfaces';

export function vlToAirship(data: VL.HistogramData[]): HistogramData[] {
  return data.map((d) => ({
    end: d.x[1],
    start: d.x[0],
    value: d.y
  }));
}
