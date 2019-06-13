Airship offers a big selection of legends to add to your visualizations. They are named after three factors:

- Dimension they represent (color / size)
- Type of representation (bins / category / continuous)
- Geometry

And all follow the following format:

`as-legend-<dimension>-<bins>-[<geometry>]`

The geometry is optional, Airship exposes metacomponents that will select the apropriate one for your data.

Note that not all combinations exist, for instance, there are no *-size-polygon legends, since polygons cannot really have varying size.

There is one exception to this norm, the component `as-legend-category`, which is documented below.

### Props

#### data = LegendData[]

All legends share the same API. You must provide a list of 'steps' that will be directly represented on your legends in different ways. Some legends will render a gradient, others a list of elements. For certain legend types, some of the properties of said steps will be ignored.

This is the only required property for all legends, and is a list of objects of the following shape:

```
LegendData {
  type: 'point' | 'line' | 'polygon';
  color?: string;
  marker?: string;
  strokeColor?: string;
  strokeStyle?: string;
  label: string;
  width: number;
}
``` 

For legends that only display color values, but no size dimension, width will be ignored. On other types, stroke properties are not used.

- **type**: This property indicates the type of legend it is. Most of the time is not required, except for legends that can display mixed types of geometries (such as `as-legend-category`) or for generic legends (`as-legend-color-bins`).
- **color**: This property is used for the main color of the legend. That means, the fill color for points and polygons, but the color of lines as well.
- **marker**: This property only makes sense in legends that display points, and let you specify an image URL.
- **strokeColor**: the outline of a point or a polygon. Has no effect on lines
- **strokeStyle**: the style of the outline. Directly mapped to CSS `border-style`, so check out all [possible values](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style)
- **label**: A label for a step
- **width**: The diameter of a point, or the width of a line. Completely ignored for polygon-related-legends

#### Orientation = 'vertical' | 'horizontal'

All legends support both layouts. By default all render vertically.

```html
noSource: true
---
<iframe src="/examples/components/legends/orientation.html" style="width: 100%; height: 350px;">
```

```
<as-legend-color-bins-polygon id="horizontal" orientation="horizontal"></as-legend-color-bins-polygon>
<as-legend-color-bins-polygon id="vertical" ></as-legend-color-bins-polygon>

<script>
  const vertical = document.querySelector('#vertical');
  const horizontal = document.querySelector('#horizontal');
  const data = [
    { color: '#74d7ec', label: '-100' },
    { color: '#ffafc7', label: '-50' },
    { color: 'white', label: '0' },
    { color: '#ffafc7', label: '50' },
    { color: '#74d7ec', label: '100' },
  ];

  vertical.data = horizontal.data = data;
</script>
```


### Components

#### as-legend

This is a wrapper component, useful if you want to add a title, subtitle and a footer to your legends.

It has two properties: heading and description, and uses the slots API to render the contents. This means you can provide any arbitrary HTML, but you have to specify the attribute `slot="legends"` for the legend part, and the attribute `slot="footer"` for the footer below the legend.

```html
noSource: true
---
<iframe src="/examples/components/legends/as-legend-basic.html" style="width: 100%; height: 140px;">
```

```
  <as-legend
    heading="Title"
    description="Description">
    <as-legend-category slot="legends" orientation="horizontal"></as-legend-category>
    <span slot="footer">Footer</span>
  </as-legend>
  
  <script>
    var legend = document.querySelector('as-legend-category');
    legend.data = [
      { type: 'point', width: 16, color: '#D4006E', label: 'Layer 1' },
      { type: 'point', width: 8, color: '#541D82', label: 'Layer 2' },
      { type: 'point', width: 16, color: '#0054A5', label: 'Layer 3' },
    ];
  </script>
```

#### as-legend-category

This is the only legend that does not follow the naming pattern. It displays one line per element in the `data` property, representing its type of geometry, color, size, stroke color and stroke style (where applicable).

```html
noSource: true
---
<iframe src="/examples/components/legends/as-legend-category.html" style="width: 100%; height: 50px;">
```

```
  <as-legend-category orientation="horizontal"></as-legend-category>
  
  <script>
    var legend = document.querySelector('as-legend-category');
    legend.data = [
      { type: 'point', width: 16, color: '#D4006E', label: 'Point layer' },
      { type: 'line', strokeStyle: 'dashed', color: '#541D82', label: 'Line layer' },
      { type: 'polygon', color: '#0054A5', label: 'Polygon layer', strokeColor: 'rgba(0, 54, 165, 0.3)' },
    ];
  </script>
```

##### Aliases

This component is rendered also with the following tags:

- `as-legend-color-category`
- `as-legend-color-category-point`
- `as-legend-color-category-line`
- `as-legend-color-category-polygon`
- `as-legend-color-bins` when the `type` value in the first element of `data` is `line` or `point`
- `as-legend-color-bins-point`
- `as-legend-color-bins-line`
- `as-legend-color-continuous` when the `type` value in the first element of `data` is `line` or `point`
- `as-legend-color-continuous-point`
- `as-legend-color-continuous-line`

#### as-legend-color-bins-polygon

This component renders a rectange with hard stops of colors for each step.


```html
noSource: true
---
<iframe src="/examples/components/legends/as-legend-color-bins-polygon.html" style="width: 100%; height: 50px;">
```

```
<as-legend-color-bins-polygon id="legend" orientation="horizontal"></as-legend-color-bins-polygon>

<script>
  const legend = document.querySelector('#legend');
  legend.data = [
    { color: '#E70000', label: '0' },
    { color: '#FF8C00', label: '10' },
    { color: '#FFEF00', label: '20' },
    { color: '#00811F', label: '30' },
    { color: '#0044FF', label: '40' },
    { color: '#760089', label: '40' },
  ];
</script>
```

##### Aliases

This component is rendered also with the following tag:

- `as-legend-color-bins` when the `type` value in the first element of `data` is `polygon`

```hint|directive
Despite having polygon in its name, you can use this for any type of geometry.
```

#### as-legend-color-continuous-polygon

Very similar to `<as-legend-color-bins-polygon>`, but instead of hard stops, it renders a gradient between each pair of colors. It works best when the palette is a continuous color

```html
noSource: true
---
<iframe src="/examples/components/legends/as-legend-color-continuous-polygon.html" style="width: 100%; height: 50px;">
```

```
<as-legend-color-continuous-polygon id="legend" orientation="horizontal"></as-legend-color-continuous-polygon>

<script>
  const legend = document.querySelector('#legend');
  legend.data = [
    { "color": "#B0F2BCFF", "label": 10 },
    { "color": "#77E2A8FF", "label": 20 },
    { "color": "#4CC8A3FF", "label": 30 },
    { "color": "#31A6A2FF", "label": 40 },
    { "color": "#257D98FF", "label": 50 }
  ]
</script>
```

##### Aliases

This component is rendered also with the following tag:

- `as-legend-color-continuous` when the `type` value in the first element of `data` is `polygon`

### as-legend-size-bins-point

This component renders a list of points of varying size. Is quite similar to the `as-category` component, although the label layout is slightly different.

As with most legends that render points, it supports the marker property.

```html
noSource: true
---
<iframe src="/examples/components/legends/as-legend-size-bins-point.html" style="width: 100%; height: 80px;">
```

```
<as-legend-size-bins-point id="legend" orientation="horizontal"></as-legend-size-bins-point>

<script>
  const legend = document.querySelector('#legend');
  legend.data = [
    { marker: 'https://libs.cartocdn.com/carto-vl/assets/symbols/house.svg', color: '#000000', width: 28, label: 'House' },
    { marker: 'https://libs.cartocdn.com/carto-vl/assets/symbols/marker.svg', color: '#000000', width: 24, label: 'POI' },
    { marker: 'https://libs.cartocdn.com/carto-vl/assets/symbols/cross.svg', color: '#000000', width: 16, label: 'Unknown' }
  ]
</script>
```

##### Aliases

This component is rendered also with the following tags:

- `as-legend-size-bins` when the `type` value in the first element of `data` is `point`
- `as-legend-size-category` when the `type` value in the first element of `data` is `point`
- `as-legend-size-category-point`

### as-legend-size-bins-line

This component renders several lines stacked one on top of the other. It is better suited for numerical data.


```html
noSource: true
---
<iframe src="/examples/components/legends/as-legend-size-bins-line.html" style="width: 100%; height: 80px;">
```

```
<as-legend-size-bins-line id="legend" orientation="horizontal"></as-legend-size-bins-line>

<script>
  const legend = document.querySelector('#legend');
  legend.data = [
    { color: '#FFC667', width: 28, label: '280' },
    { color: '#FFC667', width: 24, label: '240' },
    { color: '#FFC667', width: 16, label: '160' }
  ]
</script>
```

##### Aliases

This component is rendered also with the following tag:

- `as-legend-size-bins` when the `type` value in the first element of `data` is `line`

### as-legend-size-category-line

This component renders line size as a list instead of stacked lines, in a similar fashion to other `category` widgets. It is better suited for pure categorical data.

```html
noSource: true
---
<iframe src="/examples/components/legends/as-legend-size-category-line.html" style="width: 100%; height: 75px;">
```

```
<as-legend-size-category-line id="legend" orientation="vertical"></as-legend-size-category-line>

<script>
  const legend = document.querySelector('#legend');
  legend.data = [
    { color: '#FFC667', width: 10, label: '280' },
    { color: '#FFC667', width: 12, label: '240' },
    { color: '#FFC667', width: 15, label: '160' }
  ]
</script>
```

##### Aliases

This component is rendered also with the following tag:

- `as-legend-size-category` when the `type` value in the first element of `data` is `line`

### as-legend-size-continuous-line

This component is very similar to `as-legend-size-bins-line` but instead of hard stops it connects all steps into a polygon.

```html
noSource: true
---
<iframe src="/examples/components/legends/as-legend-size-continuous-line.html" style="width: 100%; height: 75px;">
```

```
<as-legend-size-continuous-line id="legend" orientation="horizontal"></as-legend-size-continuous-line>

<script>
  const legend = document.querySelector('#legend');
  legend.data = [
    { color: '#FFC667', width: 28, label: '280' },
    { color: '#FFC667', width: 24, label: '240' },
    { color: '#FFC667', width: 16, label: '160' }
  ]
</script>
```

Because of how this widget is rendered internally, it behaves less flexibly than the others. However we provide a series of props to customize it

- **size**: in pixels, will be its width and height. When rendering vertically, the height is shortened to whatever is required.
- **x-margin-factor** and **y-margin-factor**: by default 0.1, the percentage (10%) of space left on all sides. Use this is if you find your labels do not fit.
- **leading-line-stroke-width**: the width of lines pointing to the labels, in pixels
- **text-line-height**: change this if you change the font used for the labels, set to the font's line-height for better alignment

##### Aliases

This component is rendered also with the following tag:

- `as-legend-size-continuous` when the `type` value in the first element of `data` is `line`


### as-legend-size-continuous-point

This component renders all circles centered on the same base, and only displays the first and last labels. It is recommended to keep the number of steps low.

```html
noSource: true
---
<iframe src="/examples/components/legends/as-legend-size-continuous-point.html" style="width: 100%; height: 170px;">
```

```
<as-legend-size-continuous-point id="legend" orientation="horizontal"></as-legend-size-continuous-point>

<script>
  const legend = document.querySelector('#legend');
  legend.data = [
    { color: '#000000', strokeColor: '#FFFFFF', width: 64, label: '64' },
    { color: '#000000', strokeColor: '#FFFFFF', width: 96, label: '96' },
    { color: '#000000', strokeColor: '#FFFFFF', width: 128, label: '128' }
  ]
</script>
```

To give some flexibility, this widget has a **scale** property, which will increase or decrease the size of all steps by that factor.

Same as above, with smaller data but with a 4x scale:

```html
noSource: true
---
<iframe src="/examples/components/legends/as-legend-size-continuous-point-scaled.html" style="width: 100%; height: 170px;">
```

```
<as-legend-size-continuous-point id="legend" orientation="horizontal" scale="4"></as-legend-size-continuous-point>

<script>
  const legend = document.querySelector('#legend');
  legend.data = [
    { color: '#000000', strokeColor: '#FFFFFF', width: 16, label: '16' },
    { color: '#000000', strokeColor: '#FFFFFF', width: 24, label: '24' },
    { color: '#000000', strokeColor: '#FFFFFF', width: 32, label: '32' }
  ]
</script>
```

##### Aliases

This component is rendered also with the following tag:

- `as-legend-size-continuous` when the `type` value in the first element of `data` is `point`
