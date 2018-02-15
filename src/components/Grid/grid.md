React layout component based on CSS Grid Layout and built with [styled-components](https://www.styled-components.com)

```js
<Grid width={320} gap={20}>
  <div className="Column" />
  <div className="Column" />
  <div className="Column" />
  <div className="Column" />
  <div className="Column" />
</Grid>
```

### Features

* Responsive grid layout with zero media queries
* Simple API for handling tiled layouts
* Customizable column width and gutters

### Props

#### **width** (number or string)

Sets the width at which child elements will break into columns. Pass a number for pixel values or a string for any other valid CSS length.

```jsx static
<Grid width={512} />
```

#### **gap** (number or string)

Sets the gutter (grid-gap) between columns. Pass a number for pixel values or a string for any other valid CSS length.

```jsx static
<Grid gap={16} />
```

**align** (string)

Sets align-items to control child element alignment.

### Browser Support

See [caniuse](http://caniuse.com/#feat=css-grid)
