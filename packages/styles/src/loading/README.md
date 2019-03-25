Circular progress indicators display progress by animating an indicator along an invisible circular track in a clockwise direction. They can be applied directly to a surface, such as a button or card.

## Default

```html
showSource: true
---
<span class="as-loading">
  <svg viewBox="0 0 50 50">
    <circle cx="25" cy="25" r="20" fill="none" />
  </svg>
</span>
```

## Small

You can use the `as-loading--s` to display a slightly smaller indicator.

```html
showSource: true
---
<span class="as-loading as-loading--s">
  <svg viewBox="0 0 50 50">
    <circle cx="25" cy="25" r="20" fill="none" />
  </svg>
</span>
```


## Large

You can use the `as-loading--l` to display a slightly bigger indicator.

```html
showSource: true
---
<span class="as-loading as-loading--l">
  <svg viewBox="0 0 50 50">
    <circle cx="25" cy="25" r="20" fill="none" />
  </svg>
</span>
```

## CSS Variables

```
.as-loading {
  --as--loading--stroke-color
}
```