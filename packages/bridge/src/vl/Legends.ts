/**
 * Waits until CARTO VL layer has loaded and calls `cb`. If it's already loaded
 * it will immediately call `cb`.
 * 
 * @param layer CARTO VL layer to wait for
 * @param cb callback to run
 * @param dynamic if true, cb will also be bound to `updated` event.
 */
function _waitUntilLoaded(layer, cb, dynamic = false) {
  if (dynamic) {
    layer.on('updated', () => {
      cb(false);
    });
  }

  if (!layer.viz) {
    layer.on('loaded', () => {
      cb(true);
    });
  } else {
    cb(true);
  }
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
    color: viz.color.toString(),
    label: props.label,
    marker: viz.symbol.default ? undefined : viz.symbol.value,
    strokeColor: viz.strokeColor.toString(),
    strokeStyle: viz.strokeWidth.value === 0 ? 'hidden' : undefined,
    type: layer.metadata.geomType,
    width: viz.width.value,
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

export default class Legends {
  public static layersLegend(widget, layers, options) {
    const parsedLayers = layers.map(_parseLayer);

    parsedLayers.forEach((layerWithOpts) => {
      _waitUntilLoaded(layerWithOpts.layer, () => {
        const data = parsedLayers.map(_styleFromLayer);
        widget.data = data;
      }, options && options.dynamic);
    });
  }
}