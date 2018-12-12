# Rough architecture guide

Disclaimer

> For now, only VL bindings have been created, and everything is designed with VL in mind. If we find it useful to do this for Carto.js as well, we might have to reconsider or simply have a different approach for it.

## General concepts

### Filters

A filter matches an airship component and internally handles logic to connect it to VL. There's one for the histogram and one for the time series.

### Orchestrator

This is a classs unoriginally called `VL`, which exposes methods to create each and every type of filter. It also contains most of the internal logic to achieve things like multi widget filtering.

This orchestrator requires lots of parameters for convenience:

- Carto namespace (VL): We create Viz and Layers internally.
- Map: We add the aforementioned layers to the map automatically.
- Layer: The layer is useful because it will always have the correct Viz object
- Source: Read below

Layer does have a `_source`, which we could expose with a getter, so it seems like requiring the source is backards. The problem is, `_source` will be undefined until the layer is added to the map, and we might need it before. This is also the reason why filters ask for the source as well.

## Internals

### Widget updates

By default all widgets should be readOnly for now. Internally, the orchestrator will create a new viz with all the required magic (viewportHistogram, for now). For read-only widgets, there will be a single Layer that will feed all the read only widgets. This Viz can only be filtered by non-read-only filters, and doesn't display any geometry.

It's a small overhead, but it enables having a histogram for an animation completely independent, as users probably don't want to see bars changing constantly depending on the state of the animation.

### Multi widget filtering

This feature is enabled when one or more filters are added with `readOnly` set to `false`. This means they will let the user perform a selection and will filter:

- The visualization
- Other widgets (but not themselves)

This is very similar to Builder's widgets behaviour. In order to achieve this we have to do something quite expensive.

**Every widget** has a Viz assigned to it, it's their source of truth. The trick is that it is only filtered by the rest of the widgets, but not by itself. So, every time a widget changes it's filter we need to rebuild the filter of the rest of Viz, plus the visualization Viz.

As you can imagine, this gets expensive really fast, so we should look for alternatives to this.

### Alternative to this pattern

Read only filters scale much better, since there's only a Viz that gets more viewportHistograms added.

We could follow the same single-Viz approach for non-read-only filters, even reuse the same Viz as the read-only-ones, by using the viewportFeatures expression and building the histograms by ourselves.

The idea would be having a single viewportFeature list that would get filtered for each widget present. Read-only widgets would share the filtered result, and non-read-only widgets would each get a slightly different set of features.

After that, it's just a matter of building a histogram for each widget. This is not as easy as it sounds, as we'll need to consider the range of the data, so we might have to add viewportMin / viewportMax for all columns required.

The problem with this approach, is that it's a total waste of the amazing VL codebase, so we should see if it makes sense to give VL a more data-oriented API, instead of having to funnel everything through the Viz object.
