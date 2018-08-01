# Inputs

## Default input

```html
---
<iframe src="/packages/styles/src/inputs/test/input.html" style="width: 100%; height: 100%;">
```

```code
lang: html
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
---
<iframe src="/packages/styles/src/inputs/test/input-disabled.html" style="width: 100%; height: 100%;">
```

```code
lang: html
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
---
<iframe src="/packages/styles/src/inputs/test/input-readonly.html" style="width: 100%; height: 100%;">
```

```code
lang: html
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
---
<iframe src="/packages/styles/src/inputs/test/input-invalid.html" style="width: 100%; height: 100%;">
```

```code
lang: html
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
