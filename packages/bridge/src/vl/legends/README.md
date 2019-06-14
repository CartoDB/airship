## Legends Bridge

The Airship Legends bridge is different from the other bridge functions, because it is one way only. The legend component will be fed the appropriate data from the CARTO VL Viz, but does not cause any changes on the Viz itself.

### Usage

There are two legend bridge functions:

- **Layers legend**: showing one entry per layer provided, with the symbol representing the geometry and the appearance.
- **Ramp legend**: focused on one layer and one property of the visualization.

#### Layers legend

```hint|directive
The ideal legend for this case is [as-legend-category](/components/legends#as-legend-category) or any of its aliases, since it can represent all geometry types.
```

This is the layers legend bridge function:

```code
lang: js
---
AsBridge.VL.Legends.layersLegend(
  legend,
  layers,
  options
)
```

Let us break down each argument:

**legend**
You can pass either the legend component or a selector. Generally speaking, the bridge makes no assumptions of what type of legend you have provided, since the API is compatible across all.

**layers**
A list of items, they can be either a CARTO VL layer, or an object with the following shape:

```code
lang: js
---
{
  layer: mapLayer,
  props: {}
}
```

The props object can be used to override the components's properties that will be extracted from the viz. Its shape is the same as the [LegendData for the legend widgets](/components/legends#props).

For instance, the layer name is extracted from the layer id provided to CARTO VL Layer object. However, by passing a props object like so:

```code
lang: js
---
AsBridge.VL.Legends.layersLegend(
  legend,
  {
    layer: myLayer,
    props: {
      label: 'Readable layer name',
      strokeColor: 'rgba(0, 0, 0, 0)'
    }
  },
  options
)
```

The label will be 'Readable layer name' and the strokeColor will be transparent, no matter what it is on the visualization.

**options**

The options argument lets you customize some of the behaviour of the legend bridge. For the multi layer legend you can provide the following properties:

- **onLoad**: a callback that will be fired after the legend gets its data set. This is useful to, for instance, control visibility.
- **dynamic**: whether the legend will update only once or on every layer update. Set to true to reflect style changes.
- **format**: a function that lets you customize how the label will be represented. It will receive the value that is read from CARTO VL, so depending on your Viz, it might be a number, a string or even an array.


```code
lang: js
---
AsBridge.VL.Legends.layersLegend(
  legend,
  layer,
  {
    // Set an element to visible, the legend is loaded at this point
    onLoad: () => element.style.visibility = 'visible',
    // Render labels with an € appendix
    format: (value) => `${value} €`,
    // Repaint the legend each time the layer updates, not just the first time
    dynamic: true
  }
)
```

#### Ramp legend

Whenever you are styling a property with a ramp and you want to show how that property varies with the value its based on, this is the function you want to use. All currently available legends are appropriate for this.

This is how the function works:

```code
lang: js
---
AsBridge.VL.Legends.rampLegend(
  legend,
  layer,
  property,
  options
)
```

- **legend** same as layersLegend, either a DOM element or a selector.
- **layer** is the same as layersLegend, but a single layer instead of a list.
- **property** is a string with the name of the CARTO VL Viz property where you have a ramp defined.
- **options** same as layersLegend, with an extra `config` element, which is passed to VL's [getLegendData](https://carto.com/developers/carto-vl/reference/#expressionsrampgetlegenddata) internally.

For instance, for a Visualization that uses a ramp on color, you can configure the number of samples you want the legend to have, and depending on how the ramp input is defined, you might have to customize the CARTO_VL_OTHERS label. Here is how that would look:

```code
lang: js
---
AsBridge.VL.Legends.rampLegend(
  legend,
  layer,
  'color',
  {
    config: {
      samples: 5,
      othersLabel: 'Others'
    }
  }
)
```

```hint|directive
Having less samples can be a good thing for certain types of legends, like the [as-legend-size-continuous-point](/components/legends#as-legend-size-continuous-point), which works best with 3 or 4 samples.
```
