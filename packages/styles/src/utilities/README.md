# Color utilities
Convey meaning through color with a handful of color utility classes.

### Color

```html
<!-- Brand colors -->
<p class="as-subheader as-color--primary">.as-color--primary</p>
<p class="as-subheader as-color--secondary">.as-color--secondary</p>
<p class="as-subheader as-color--complementary">.as-color--complementary</p>

<!-- Type colors -->
<p class="as-subheader as-color--type-01">.as-color--type-01</p>
<p class="as-subheader as-color--type-02">.as-color--type-02</p>
<p class="as-subheader as-color--type-03">.as-color--type-03</p>
<p class="as-subheader as-color--type-04">.as-color--type-04</p>

<!-- Support colors -->
<p class="as-subheader as-color--support-01">.as-color--support-01</p>
<p class="as-subheader as-color--error">.as-color--error</p>
<p class="as-subheader as-color--support-02">.as-color--support-02</p>
<p class="as-subheader as-color--warning">.as-color--warning</p>
<p class="as-subheader as-color--support-03">.as-color--support-03</p>
<p class="as-subheader as-color--success">.as-color--success</p>
```

### Background color
Similar to the contextual text color classes, easily set the background of an element to any contextual class. Background utilities do not set `color`, so in some cases you’ll want to use `.as-color-*` utilities.

```html
<!-- Brand colors -->
<div class="as-p--12 as-mb--12 as-subheader as-bg--primary">.as-bg--primary</div>
<div class="as-p--12 as-mb--12 as-subheader as-color--type-04 as-bg--secondary">.as-bg--secondary</div>
<div class="as-p--12 as-mb--12 as-subheader as-bg--complementary">.as-bg--complementary</div>

<!-- Type colors -->
<div class="as-p--12 as-mb--12 as-subheader as-bg--ui-01">.as-bg--ui-01</div>
<div class="as-p--12 as-mb--12 as-subheader as-bg--ui-02">.as-bg--ui-02</div>
<div class="as-p--12 as-mb--12 as-subheader as-bg--ui-03">.as-bg--ui-03</div>
<div class="as-p--12 as-mb--12 as-subheader as-bg--ui-04">.as-bg--ui-04</div>

<!-- Support colors -->
<div class="as-p--12 as-mb--12 as-subheader as-bg--support-01">.as-bg--support-01</div>
<div class="as-p--12 as-mb--12 as-subheader as-bg--error">.as-bg--error</div>
<div class="as-p--12 as-mb--12 as-subheader as-bg--support-02">.as-bg--support-02</div>
<div class="as-p--12 as-mb--12 as-subheader as-bg--warning">.as-bg--warning</div>
<div class="as-p--12 as-mb--12 as-subheader as-bg--support-03">.as-bg--support-03</div>
<div class="as-p--12 as-mb--12 as-subheader as-bg--success">.as-bg--success</div>
```

# Spacing utilities

Assign `margin` or `padding` values to an element or a subset of its sides with shorthand classes. Includes support for individual properties, all properties, and vertical and horizontal properties.

### Notation

The classes are named using the format `as-{property}{sides}--{size}`.

Where *property* is one of:

* `m` - for classes that set `margin`
* `p` - for classes that set `padding`

Where *sides* is one of:

* `t` - for classes that set `margin-top` or `padding-top`
* `b` - for classes that set `margin-bottom` or `padding-bottom`
* `l` - for classes that set `margin-left` or `padding-left`
* `r` - for classes that set `margin-right` or `padding-right`
* `x` - for classes that set both `*-left` and `*-right`
* `y` - for classes that set both `*-top` and `*-bottom`
* blank - for classes that set a `margin` or `padding` on all 4 sides of the element

Where *size* is one of:

`0`, `4`, `8`, `12`, `16`, `20`, `24`, `28`, `32`, `36`, `40`, `48`, `60`, `64`, `72`, `80`, `96`, `100`, `120`, `128`, `140`, `148`, `152`, `240`

The size is applied in `px`.

### Examples

Here are some representative examples of these classes:

```code
lang: css
---
.as-mt--0 {
  margin-top: 0;
}

.as-ml--4 {
  margin-left: 4px;
}

.as-px--8 {
  padding-left: 8px;
  padding-right: 8px;
}

.as-p--16 {
  padding: 16px;
}
```

# Display utilities
Quickly toggle the display value of components and more with our display utilities. Includes support for some of the more common values.

The classes are named using the format:

* `.as-display--{value}`

Where *value* is one of:

* `none`
* `inline`
* `inline-block`
* `block`
* `table`
* `table-cell`
* `table-row`
* `flex`
* `inline-flex`

### Examples

```html
<div class="as-display--inline as-p--12 as-subheader as-bg--primary">.as-display--inline</div>
<div class="as-display--inline as-p--12 as-subheader as-bg--complementary">.as-display--inline</div>
```

```html
<span class="as-display--block as-p--12 as-subheader as-bg--primary">.as-display--block</span>
<span class="as-display--block as-p--12 as-subheader as-bg--complementary">.as-display--block</span>
```

# Text utilities
Quickly change the styles of a text with our text utilities. Includes support for some of the more common values.

## Text align
Easily realign text to components with text alignment classes.

For justifying text:
```html
<p class="as-text--justify">Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium purus sit amet fermentum.</p>
```

For left, right, and center alignment:

```html
showSource: true
---
<p class="as-text--left as-subheader">Left aligned text.</p>
<p class="as-text--center as-subheader">Center aligned text.</p>
<p class="as-text--right as-subheader">Right aligned text.</p>
```
## Text transform

Transform text in components with text capitalization classes.

```html
showSource: true
---
<p class="as-text--lowercase as-subheader">Lowercased text.</p>
<p class="as-text--uppercase as-subheader">Uppercased text.</p>
<p class="as-text--capitalize as-subheader">capitalized text.</p>
```

## Font weight

Quickly change the weight (boldness) of text or italicize text.

```html
showSource: true
---
<p class="as-font--bold as-subheader">Bold text.</p>
<p class="as-font--medium as-subheader">Medium weight text.</p>
<p class="as-font--normal as-subheader">Normal weight text.</p>
<p class="as-font--light as-subheader">Light weight text.</p>
<p class="as-font--italic as-subheader">Italic text.</p>
```

## Monospace

Change a selection to our monospace font stack with `.as-font--mono`.

```html
showSource: true
---
<p class="as-font--mono as-subheader">This is in monospace.</p>
```

# Flex utilities
Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive flexbox utilities. For more complex implementations, custom CSS may be necessary.

## Enable flex behaviors

Apply `display` utilities to create a flexbox container and transform **direct children elements** into flex items. Flex containers and items are able to be modified further with additional flex properties.

```code
lang: html
---
<div class="as-flex">I'm a flexbox container!</div>
<div class="as-display--inline-flex">I'm an inline flexbox container!</div>
```

## Direction

Set the direction of flex items in a flex container with direction utilities. In most cases you can omit the horizontal class here as the browser default is `row`. However, you may encounter situations where you needed to explicitly set this value (like responsive layouts).

Use `.as-flex-row` to set a horizontal direction (the browser default), or `.as-flex-row-reverse` to start the horizontal direction from the opposite side.

```html
<div class="as-flex as-flex-row as-bg--ui-03 as-mb--12">
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item 1</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item 2</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item 3</div>
</div>
<div class="as-flex as-flex-row-reverse as-bg--ui-03 as-mb--12">
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item 1</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item 2</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item 3</div>
</div>
```

Use `.as-flex-column` to set a vertical direction, or `.as-flex-column-reverse` to start the vertical direction from the opposite side.

```html
<div class="as-flex as-flex-column as-bg--ui-03 as-mb--12">
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item 1</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item 2</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item 3</div>
</div>
<div class="as-flex as-flex-column-reverse as-bg--ui-03 as-mb--12">
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item 1</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item 2</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item 3</div>
</div>
```

## Justify content

Use `justify-content` utilities on flexbox containers to change the alignment of flex items on the main axis (the x-axis to start, y-axis if `flex-direction: column`). Choose from `start` (browser default), `end`, `center`, `between`, or `around`.

```html
<div class="bd-example">
  <div class="as-flex as-justify-start as-bg--ui-03 as-mb--12">
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  </div>
  <div class="as-flex as-justify-end as-bg--ui-03  as-mb--12">
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  </div>
  <div class="as-flex as-justify-center as-bg--ui-03 as-mb--12">
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  </div>
  <div class="as-flex as-justify-between as-bg--ui-03  as-mb--12">
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  </div>
  <div class="as-flex as-justify-around as-bg--ui-03 ">
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  </div>
</div>
```

```code
lang: html
---
<div class="as-flex as-justify-start">...</div>
<div class="as-flex as-justify-end">...</div>
<div class="as-flex as-justify-center">...</div>
<div class="as-flex as-justify-between">...</div>
<div class="as-flex as-justify-around">...</div>
```

## Align items

Use `align-items` utilities on flexbox containers to change the alignment of flex items on the cross axis (the y-axis to start, x-axis if `flex-direction: column`). Choose from `start`, `end`, `center`, `baseline`, or `stretch` (browser default).

```html
<div class="bd-example">
  <div class="as-flex as-items-start as-bg--ui-03 as-mb--12" style="height: 100px;">
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  </div>
  <div class="as-flex as-items-end as-bg--ui-03 as-mb--12" style="height: 100px;">
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  </div>
  <div class="as-flex as-items-center as-bg--ui-03 as-mb--12" style="height: 100px;">
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  </div>
  <div class="as-flex as-items-baseline as-bg--ui-03 as-mb--12" style="height: 100px;">
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  </div>
  <div class="as-flex as-items-stretch as-bg--ui-03" style="height: 100px;">
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
    <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  </div>
</div>
```

```code
lang: html
---
<div class="as-flex as-items-start">...</div>
<div class="as-flex as-items-end">...</div>
<div class="as-flex as-items-center">...</div>
<div class="as-flex as-items-baseline">...</div>
<div class="as-flex as-items-stretch">...</div>
```

## Align self

Use `align-self` utilities on flexbox items to individually change their alignment on the cross axis (the y-axis to start, x-axis if `flex-direction: column`). Choose from the same options as `align-items`: `start`, `end`, `center`, `baseline`, or `stretch` (browser default).

```html
<div class="as-flex as-bg--ui-03 as-mb--12" style="height: 100px;">
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-self-start as-p--12 as-bg--ui-04 as-subheader as-m--0">Aligned flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
</div>
<div class="as-flex as-bg--ui-03 as-mb--12" style="height: 100px;">
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-self-end as-p--12 as-bg--ui-04 as-subheader as-m--0">Aligned flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
</div>
<div class="as-flex as-bg--ui-03 as-mb--12" style="height: 100px;">
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-self-center as-p--12 as-bg--ui-04 as-subheader as-m--0">Aligned flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
</div>
<div class="as-flex as-bg--ui-03 as-mb--12" style="height: 100px;">
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-self-baseline as-p--12 as-bg--ui-04 as-subheader as-m--0">Aligned flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
</div>
<div class="as-flex as-bg--ui-03" style="height: 100px;">
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-self-stretch as-p--12 as-bg--ui-04 as-subheader as-m--0">Aligned flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
</div>
```


```code
lang: html
---
<div class="as-flex as-self-start">...</div>
<div class="as-flex as-self-end">...</div>
<div class="as-flex as-self-center">...</div>
<div class="as-flex as-self-baseline">...</div>
<div class="as-flex as-self-stretch">...</div>
```

## Wrap

Change how flex items wrap in a flex container. Choose from no wrapping at all (the browser default) with `.as-flex-nowrap`, wrapping with `.as-flex-wrap`, or reverse wrapping with `.as-flex-wrap-reverse`.

No wrap:
```html
<div class="as-flex as-flex-nowrap as-bg--ui-03" style="width: 8rem;">
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
</div>
```

Wrap:
```html
<div class="as-flex as-flex-wrap as-bg--ui-03">
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
</div>
```

Wrap reverse:
```html
<div class="as-flex as-flex-wrap-reverse as-bg--ui-03">
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
  <div class="as-p--12 as-bg--ui-04 as-subheader as-m--0">Flex item</div>
</div>
```
