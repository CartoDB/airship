import { Container } from '../types/Container';

export function cleanAxes(yAxisSelection: Container, xAxisSelection: Container, ) {
  yAxisSelection.select('.domain').remove();
  xAxisSelection.select('.domain').remove();
  xAxisSelection.selectAll('line').remove();
}


export default { cleanAxes };
