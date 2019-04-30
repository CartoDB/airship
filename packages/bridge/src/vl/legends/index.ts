import { rgbToHex } from '../utils/color';
import { waitUntilLoaded } from '../utils/layers';

const FALLBACK_WIDTH = 16;
const FALLBACK_COLOR = '#000';

function _getDefaultRampValue(ramp) {
  const legendData = ramp.getLegendData();
  const index = Math.floor(legendData.data.length / 2);
  return legendData.data[index].value;
}

function _getColorValue(viz, propName) {
  const prop = viz[propName];

  if (prop.expressionName === 'ramp') {
    return rgbToHex(_getDefaultRampValue(prop));
  }

  if (prop.color) {
    return rgbToHex(prop.value);
  }

  return FALLBACK_COLOR;
}

function _getSizeValue(viz, propName, defaultValue?) {
  const prop = viz[propName];

  if (prop.expressionName === 'ramp') {
    return defaultValue || _getDefaultRampValue(prop);
  }

  if (prop.type === 'number') {
    return prop.value;
  }

  return FALLBACK_WIDTH;
}

function _getSymbolValue(viz) {
  const prop = viz.symbol;

  if (prop.expressionName === 'ramp') {
    return _getDefaultRampValue(prop);
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
    strokeStyle: _getSizeValue(viz, 'strokeWidth') === 0 ? 'hidden' : undefined,
    type: layer.metadata.geomType,
    width: _getSizeValue(viz, 'width'),
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

function _formatLegendKey(key) {
  if (Array.isArray(key)) {
    return `${key[0]} - ${key[1]}`;
  }

  if (key.toFixed) {
    return key.toFixed(2);
  }

  return key;
}

export default class Legends {
  public static layersLegend(widget, layers, options: any = {}) {
    const parsedLayers = layers.map(_parseLayer);

    parsedLayers.forEach((layerWithOpts) => {
      waitUntilLoaded(layerWithOpts.layer, () => {
        const data = parsedLayers.map(_styleFromLayer);
        widget.data = data;

        if (options.onLoad) {
          // Fire onLoad on the next cycle, to let the widget paint
          setTimeout(options.onLoad, 0);
        }

      }, options && options.dynamic);
    });
  }

  public static rampLegend(widget, layer, prop, options) {
    const parsedLayer = _parseLayer(layer);

    waitUntilLoaded(parsedLayer.layer, () => {
      const baseStyle = _styleFromLayer(parsedLayer);

      const legendData = layer.viz[prop].getLegendData().data;

      widget.data = legendData.map((data) => {
        return {
          ...baseStyle,
          [prop]: rgbToHex(data.value),
          label: _formatLegendKey(data.key)
        };
      });

      if (options.onLoad) {
        // Fire onLoad on the next cycle, to let the widget paint
        setTimeout(options.onLoad, 0);
      }

    }, options && options.dynamic);
  }
}