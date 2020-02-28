import { select } from 'd3-selection';

export function renderBivariateContainer(container, shapeSize) {
  return container
    .append('g')
    .attr('viewBox', `0 0 ${shapeSize} ${shapeSize}`);
}

export function renderBivariateGraph(id, size, shapeSize, numElems, labelX, labelY, colors) {
  if (colors) {
    const svg = select(id).append('svg').attr('viewBox', `0 0 ${size} ${size}`);
    const bivariateGraph = renderBivariateContainer(svg, shapeSize);

    const SIDE = shapeSize / numElems;

    // BIVARIATE MATRIX
    colors.forEach((color, index) => {
      const TRANSLATE_X = (index % numElems) * SIDE;
      const TRANSLATE_Y = Math.floor(index / numElems) * SIDE;

      bivariateGraph
        .append('rect')
        .attr('class', 'square')
        .attr('width', SIDE)
        .attr('height', SIDE)
        .attr('transform', `translate(${TRANSLATE_Y}, ${TRANSLATE_X})`)
        .style('fill', color);
    });

    // ROTATE MATRIX
    bivariateGraph
      .attr('transform', `rotate(-90) translate(-${shapeSize}, 0)`);

    // X LABEL
    svg
      .append('text')
      .attr('dy', 12)
      .attr('x', SIDE * (numElems/2))
      .attr('y', shapeSize)
      .attr('width', '100%')
      .style('font', '8px sans-serif')
      .style('text-anchor', 'middle')
      .text(labelX);

    // Y LABEL
    svg
      .append('text')
      .attr('dy', 12)
      .attr('x', SIDE * (numElems/2) - shapeSize)
      .attr('y', shapeSize)
      .style('font', '8px sans-serif')
      .style('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text(labelY)

    return svg;
  }
}

export default {
  renderBivariateGraph
};
