import { StackedbarData } from './StackedBarData';

export function getDomain(data: StackedbarData[]): number[] {

  return data.reduce((domain: number[], currentValue: StackedbarData) => {
    let positiveAcum = 0;
    let negativeAcum = 0;

    for (const key of Object.keys(currentValue.values)) {
      const value = currentValue.values[key];

      if (value >= 0) {
        positiveAcum += value;
      }

      if (value < 0) {
        negativeAcum += value;
      }
    }

    if (negativeAcum <= domain[0]) {
      domain[0] = negativeAcum;
    }
    if (positiveAcum >= domain[1]) {
      domain[1] = positiveAcum;
    }

    return domain;
  }, [0, 0]);
}



export default { getDomain };
