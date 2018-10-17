import { scaleLinear } from 'd3-scale';
import { interpolateSpectral } from 'd3-scale-chromatic';
import { ColorMap } from '../types/ColorMap';
import { Metadata } from '../types/Metadata';

/**
 * Creates a mapping from a list of keys to a list of colors.
 * @param keys
 * @param metadata
 */
export function create(keys: string[], metadata: Metadata): ColorMap {
  const map: ColorMap = {};

  const scale = scaleLinear()
    .domain([0, keys.length])
    .range([0, 1]);

  keys.forEach((key) => map[key] = _getColor(key, keys, metadata, scale));

  return map;
}


function _getColor(key: string, keys: string[], metadata: Metadata, scale) {
  if (metadata && metadata[key] && metadata[key].color) {
    return metadata[key].color;
  }
  return interpolateSpectral(scale(keys.indexOf(key)));
}


export default { create };
