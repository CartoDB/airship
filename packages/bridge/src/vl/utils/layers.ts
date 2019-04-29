/**
 * Waits until CARTO VL layer has loaded and calls `cb`. If it's already loaded
 * it will immediately call `cb`.
 *
 * @param layer CARTO VL layer to wait for
 * @param cb callback to run
 * @param dynamic if true, cb will also be bound to `updated` event.
 */
export function waitUntilLoaded(layer, cb, dynamic = false) {
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