import { select } from '../../util/Utils';
import { rgbToHex } from '../utils/color';
import { waitUntilLoaded } from '../utils/layers';

const FALLBACK_WIDTH = 16;
const FALLBACK_COLOR = '#000';

function _getLegendData(ramp) {
  const legendData = ramp.getLegendData();
  const index = Math.floor(legendData.data.length / 2);
  return legendData.data[index].value;
}

function _getColorValue(viz, propName) {
  const prop = viz[propName];

  if (prop.expressionName === 'ramp' || prop.expressionName === 'opacity') {
    return rgbToHex(_getLegendData(prop));
  }

  if (prop.color) {
    return rgbToHex(prop.value);
  }

  return FALLBACK_COLOR;
}

function _getNumberValue(viz, propName, defaultValue?) {
  const prop = viz[propName];

  if (prop.expressionName === 'ramp') {
    return defaultValue || _getLegendData(prop);
  }

  if (prop.type === 'number') {
    return prop.value;
  }

  return defaultValue;
}

function _getSymbolValue(viz) {
  const prop = viz.symbol;

  if (prop.expressionName === 'ramp') {
    return _getLegendData(prop);
  }

  return prop.value;
}

/**
 * Get Airship Legends Style object from a VL Layer's Viz
 * @param layerWithProps An object with: layer and props properties.
 */
function _styleFromLayer(layerWithProps) {
  const { layer, props } = layerWithProps;

  const viz = layer.viz;

  if (!viz) {
    return {};
  }

  return {
    color: _getColorValue(viz, 'color'),
    label: props.label,
    marker: viz.symbol.default ? undefined : _getSymbolValue(viz),
    strokeColor: _getColorValue(viz, 'strokeColor'),
    strokeStyle: _getNumberValue(viz, 'strokeWidth') === 0 ? 'hidden' : undefined,
    type: layer.metadata.geomType,
    width: _getNumberValue(viz, 'width', FALLBACK_WIDTH),
    ...props
  };
}

/**
 * Converts a VL layer into the object required by _styleFromLayer, setting
 * some default values.
 *
 * If the correct format is passed, it will just return the value.
 *
 * @param layer VL Layer or object with layer and props.
 */
function _parseLayer(layer) {
  if (layer.props) {
    return layer;
  }

  return {
    layer,
    props: {
      label: layer.id
    }
  };
}

function _formatRangeValue(value) {
  const [first, second] = value;

  if (first === -Infinity) {
    return `< ${second.toFixed(2)}`;
  }

  if (second === Infinity) {
    return `> ${first.toFixed(2)}`;
  }

  return `${first.toFixed(2)} - ${second.toFixed(2)}`;
}

function _formatLegendKey(key) {
  if (Array.isArray(key)) {
    return _formatRangeValue(key);
  }

  if (key.toFixed) {
    return key.toFixed(2);
  }

  return key;
}

function _formatProp(prop, value) {
  if (prop.type === 'color') {
    return rgbToHex(value);
  }

  return value;
}

interface LegendOptions {
  // Callback to customize labels on legends
  format?: (value: number | number[], index?: number, arr?: any[]) => string;
  // Will be called after setting legend data
  onLoad?: () => void;
  // Should the legend repaint after layer updates or just initially
  dynamic?: boolean;
  config?: { othersLabel?: string, samples?: number };
}
export default class Legends {
  public static layersLegend(widget, layers, options: LegendOptions = {}) {
    widget = select(widget);
    const parsedLayers = layers.map(_parseLayer);

    parsedLayers.forEach((layerWithOpts, index, arr) => {
      waitUntilLoaded(layerWithOpts.layer, () => {
        const data = parsedLayers.map(_styleFromLayer);

        if (options.format) {
          data.label = options.format(data.label, index, arr);
        }

        widget.data = data;

        if (options.onLoad) {
          // Fire onLoad on the next cycle, to let the widget paint
          setTimeout(options.onLoad, 0);
        }

      }, options.dynamic);
    });
  }

  public static rampLegend(widget, layer, prop, options: LegendOptions = {}) {
    widget = select(widget);

    const parsedLayer = _parseLayer(layer);

    waitUntilLoaded(parsedLayer.layer, () => {
      const baseStyle = _styleFromLayer(parsedLayer);

      const vizProp = parsedLayer.layer.viz[prop];
      const config = options.config;
      const legendData = parsedLayer.layer.viz[prop].getLegendData(config).data;

      const parsedData = legendData.map((data, index, arr) => {
        return {
          ...baseStyle,
          [prop]: _formatProp(vizProp, data.value),
          label: options.format ? options.format(data.key, index, arr) : _formatLegendKey(data.key)
        };
      });

      if (Array.isArray(parsedLayer.props) && parsedLayer.props.length === legendData.length) {
          widget.data = parsedData.map((d, i) => {
            return {
              ...d,
              ...parsedLayer.props[i]
            };
          });
      } else {
        widget.data = parsedData;
      }


      if (options.onLoad) {
        // Fire onLoad on the next cycle, to let the widget paint
        setTimeout(options.onLoad, 0);
      }

    }, options.dynamic);
  }
}
