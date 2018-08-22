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
