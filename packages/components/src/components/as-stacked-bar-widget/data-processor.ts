import { StackedbarData } from './as-stacked-bar-widget';

export function getDomain(data: StackedbarData[]): number[] {
  return data.reduce((previousValue: number[], currentValue: StackedbarData) => {
    return previousValue;
  }, [0, 0]);
}



export default { getDomain };
