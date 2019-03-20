# Rough architecture guide

Disclaimer

> For now, only a bridge to CARTO VL has been created, and everything is designed with VL in mind. If we find it useful to do this for Carto.js as well, we might have to reconsider or simply have a different approach for it.

## General concepts

### Filters

A filter matches an airship component and internally handles logic to connect it to VL. There's one for the histogram, one for the time series, and one for the category widget. Technically, you have one for Categorical Histograms and one for numerical ones.

### Bridge

This is a classs unoriginally called `VLBridge`, which exposes methods to create each and every type of filter. It's the responsible of combining and assigning filters to the viz.

This orchestrator requires lots of parameters for convenience:

- Carto namespace (VL): We create Viz and Layers internally.
- Map: We add the aforementioned layers to the map automatically.
- Layer: The layer is useful because it will always have the correct Viz object
- Source: Read below

Layer does have a `_source`, which we could expose with a getter, so it seems like requiring the source is backards. The problem is, `_source` will be undefined until the layer is added to the map, and we might need it before. This is also the reason why filters ask for the source as well.

## Internals

### Widget updates

Previously, we achieved a similar behaviour to Builder's widgets, but the computational cost was too high. It worked for simple visualizations but completely failed to achieve a decent performance on relatively complex ones.

For now, the filtering / updates approach has been simplified as much as possible. We still need to duplicate the Viz because of animation filters, but that is as bad as it gets. This means that all widgets are filtered against all widgets (that includes themselves). This means that after filtering a histogram it will only show the filtered data. We might overcome this slightly in the future if we're able to get a sampleHistogram expression, but for now, it is as good as it will get.
