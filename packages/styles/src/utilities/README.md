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
<div class="u-p--12 u-mb--12 as-subheader as-bg--primary">.as-bg--primary</div>
<div class="u-p--12 u-mb--12 as-subheader as-color--type-04 as-bg--secondary">.as-bg--secondary</div>
<div class="u-p--12 u-mb--12 as-subheader as-bg--complementary">.as-bg--complementary</div>

<!-- Type colors -->
<div class="u-p--12 u-mb--12 as-subheader as-bg--ui-01">.as-bg--ui-01</div>
<div class="u-p--12 u-mb--12 as-subheader as-bg--ui-02">.as-bg--ui-02</div>
<div class="u-p--12 u-mb--12 as-subheader as-bg--ui-03">.as-bg--ui-03</div>
<div class="u-p--12 u-mb--12 as-subheader as-bg--ui-04">.as-bg--ui-04</div>

<!-- Support colors -->
<div class="u-p--12 u-mb--12 as-subheader as-bg--support-01">.as-bg--support-01</div>
<div class="u-p--12 u-mb--12 as-subheader as-bg--error">.as-bg--error</div>
<div class="u-p--12 u-mb--12 as-subheader as-bg--support-02">.as-bg--support-02</div>
<div class="u-p--12 u-mb--12 as-subheader as-bg--warning">.as-bg--warning</div>
<div class="u-p--12 u-mb--12 as-subheader as-bg--support-03">.as-bg--support-03</div>
<div class="u-p--12 u-mb--12 as-subheader as-bg--success">.as-bg--success</div>
```

# Spacing utilities

### How it works

Assign `margin` or `padding` values to an element or a subset of its sides with shorthand classes. Includes support for individual properties, all properties, and vertical and horizontal properties.

### Notation

The classes are named using the format `u-{property}{sides}--{size}`.

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
.u-mt--0 {
  margin-top: 0;
}

.u-ml--4 {
  margin-left: 4px;
}

.u-px--8 {
  padding-left: 8px;
  padding-right: 8px;
}

.u-p--16 {
  padding: 16px;
}
```
