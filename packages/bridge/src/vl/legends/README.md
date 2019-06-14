## Legends Bridge

The Airship Legends bridge is different from the other bridge functions, because it is one way only. The legend component will be fed the appropriate data from the CARTO VL Viz, but does not cause any changes on the Viz itself.

### Usage

There are two legend bridge functions:

- Layers legend: showing one entry per layer provided, with the symbol representing the geometry and the appearance.
- Ramp legend: focused on one layer and one property of the visualization.

#### Layers legend

```hint|directive
The ideal legend for this case is [as-legend-category](/components/legends#as-legend-category) or any of its aliases, since it can represent all geometry types.
```

This is the layers legend bridge function:

```
AsBridge.VL.Legends.layersLegend(
  legend,
  layer,
  options
)
```

Let us break down each argument:

**legend**
You can pass either the legend component or a selector. Generally speaking, the bridge makes no assumptions of what type of legend you have provided, since the API is compatible across all.

**layer**
You can pass either a CARTO VL layer, or an object with the following shape:

```
{
  layer: mapLayer,
  props: {}
}
```

The props object can be used to override the components's properties that will be extracted from the viz. Its shape is the same as the [LegendData for the legend widgets](/components/legends#props).

For instance, the layer name is extracted from the layer id provided to CARTO VL Layer object. However, by passing a props object like so:

```
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

TBW

#### Ramp legend

TBW

