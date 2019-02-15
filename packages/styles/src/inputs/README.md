# Inputs

## Default input

```html
showSource: true
---
<p>
  <span class="as-caption">Default</span>
  <input class="as-input" type="text">
</p>
<p>
  <span class="as-caption">With placeholder</span>
  <input class="as-input" type="text" placeholder="Hello there">
</p>
<p>
  <span class="as-caption">With value</span>
  <input class="as-input" type="text" value="Hello there">
</p>
```

## Disabled input

This styles will be applied to `disabled` inputs.

```html
showSource: true
---
<p>
  <span class="as-caption">Default</span>
  <input class="as-input" type="text" disabled>
</p>
<p>
  <span class="as-caption">With placeholder</span>
  <input class="as-input" type="text" placeholder="Hello there" disabled>
</p>
<p>
  <span class="as-caption">With value</span>
  <input class="as-input" type="text" value="Hello there" disabled>
</p>
```

## Read-only input

This styles will be applied to `readonly`.

```html
showSource: true
---
<p>
  <span class="as-caption">Default</span>
  <input class="as-input" type="text" readonly>
</p>
<p>
  <span class="as-caption">With placeholder</span>
  <input class="as-input" type="text" placeholder="Hello there" readonly>
</p>
<p>
  <span class="as-caption">With value</span>
  <input class="as-input" type="text" value="Hello there" readonly>
</p>
```

## Invalid input

This styles will be applied to `invalid` inputs.

```html
showSource: true
---
<p>
  <span class="as-caption">Default</span>
  <input class="as-input" type="text" required>
</p>
<p>
  <span class="as-caption">With placeholder</span>
  <input class="as-input" type="text" placeholder="Hello there" required>
</p>
<p>
  <span class="as-caption">With value</span>
  <input class="as-input" type="email" value="Hello there">
</p>
<p>
  <span class="as-caption">Textarea</span>
  <textarea class="as-textarea" rows="4" required></textarea>
</p>
```

## CSS Variables

```
.as-input,
.as-textarea {
    --as--input--font
  // Default
  --as--input--background-color
  --as--input--color
  --as--input--placeholder-color
  --as--input--shadow-color
  --as--input--hover--shadow-color
  // Invalid
  --as--input--invalid--background-color
  --as--input--invalid--color
  --as--input--invalid-placeholder--color
  --as--input--invalid-shadow-color
  --as--input--invalid-hover--shadow-color
  // Disabled
  --as--input--disabled--background-color
  --as--input--disabled--color
  --as--input--disabled-placeholder--color
  --as--input--disabled-hover--shadow-color
  // Read Only
  --as--input--readonly--background-color
  --as--input--readonly--color
  --as--input--readonly-placeholder--color
  --as--input--readonly-hover--shadow-color
}
```