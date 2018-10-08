import { StackedbarData } from './as-stacked-bar-widget';

export function getDomain(data: StackedbarData[]): number[] {
  return data.reduce((domain: number[], currentValue: StackedbarData) => {
    for (const key of Object.keys(currentValue.values)) {
      const value = currentValue.values[key];
      if (value <= domain[0]) {
        domain[0] = value;
      }
      if (value >= domain[1]) {
        domain[1] = value;
      }
    }

    return domain;
  }, [0, 0]);
}



export default { getDomain };
