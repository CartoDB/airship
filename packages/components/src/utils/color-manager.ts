import { scaleLinear } from 'd3-scale';
import { interpolateSpectral } from 'd3-scale-chromatic';
import { ColorMap } from './ColorMap';

export function createColorMap(keys: string[], metadata): ColorMap {
  const map: ColorMap = {};

  const scale = scaleLinear()
    .domain([0, keys.length])
    .range([0, 1]);

  keys.forEach((key) => map[key] = _getColor(key, keys, metadata, scale));

  return map;
}


function _getColor(key: string, keys: string[], metadata, scale) {
  if (metadata && metadata[key] && metadata[key].color) {
    return metadata[key].color;
  }
  return interpolateSpectral(scale(keys.indexOf(key)));
}


export default { createColorMap };
