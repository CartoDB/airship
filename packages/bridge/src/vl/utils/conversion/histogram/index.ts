import { HistogramData } from '../../../../../../components/src/components/as-histogram-widget/interfaces';
import { toHex } from '../../color';

export function numerical(data: VLNumericalHistogram): HistogramData[] {
  return data.value.map((d) => ({
    end: d.x[1],
    start: d.x[0],
    value: d.y,
  }));
}

export function categorical(data: VLCategoricalHistogram, colors?: LegendEntry[]): HistogramData[] {
  return data.value.map((d) => ({
    category: d.x,
    color: findColorForCategory(d.x, colors),
    end: undefined,
    start: undefined,
    value: d.y
  }));
}

export function findColorForCategory(category: string, colors: LegendEntry[]): string | undefined {
  if (!colors) {
    return undefined;
  }

  const color = colors.find((element) => element.key === category);

  if (color) {
    return toHex(color.value);
  }

  return undefined;
}

export default { numerical, categorical };
