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

`4, 8, 16, 32, 64, 128`

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