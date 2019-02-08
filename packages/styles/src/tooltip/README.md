Tooltips are small, interactive, textual hints for mainly graphical elements.

Notice we only provide the `styles` and `css classes` required to display a tooltip.
You need to control the placement and visibility logic using javascript. 
We also provide CSS Variables to change the tooltip style.

## Positions

Left:

```html
showSource: true
---
<span role="tooltip" class="as-tooltip as-tooltip--left">Tooltip left</span>
```

Right:

```html
showSource: true
---
<span role="tooltip" class="as-tooltip as-tooltip--right">Tooltip right</span>
```

Top:

```html
showSource: true
---
<span role="tooltip" class="as-tooltip as-tooltip--top">Tooltip top</span>
```

Bottom:

```html
showSource: true
---
<span role="tooltip" class="as-tooltip as-tooltip--bot">Tooltip bottom</span>
```

Error:

```html
showSource: true
---
<span role="tooltip" class="as-tooltip as-tooltip--top as-tooltip--error">Error</span>
```

Warning:

```html
showSource: true
---
<span role="tooltip" class="as-tooltip as-tooltip--top as-tooltip--warning">Warning</span>
```

Success:

```html
showSource: true
---
<span role="tooltip" class="as-tooltip as-tooltip--top as-tooltip--success">Success</span>
```

Primary

```html
showSource: true
---
<span role="tooltip" class="as-tooltip as-tooltip--top as-tooltip--primary">Primary</span>
```

Secondary

```html
showSource: true
---
<span role="tooltip" class="as-tooltip as-tooltip--top as-tooltip--secondary">Secondary</span>
```

Complementary

```html
showSource: true
---
<span role="tooltip" class="as-tooltip as-tooltip--top as-tooltip--complementary">Complementary</span>
```

## CSS Variables

```
.as-tooltip {
  --as--tooltip--background-color
  --as--tooltip--color
  --as--tooltip--support-color
  --as--tooltip--primary--background-color
  --as--tooltip--primary--color
  --as--tooltip--secondary--background-color
  --as--tooltip--secondary--color
  --as--tooltip--complementary--background-color
  --as--tooltip--complementary--color
  --as--tooltip--error--background-color
  --as--tooltip--error-color
  --as--tooltip--warning--background-color
  --as--tooltip--warning--color
  --as--tooltip--success--background-color
  --as--tooltip--success--color
}
```