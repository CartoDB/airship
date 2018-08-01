# Tabs

Tabs are an element used in navigation, it allows you to create a [menu element](https://www.w3.org/WAI/tutorials/menus/) or a [tabs element](https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html) both with a very similar look and feel. In order to create a tab element you just need to add the `as-tabs` class.


To highlight the current tab you can use `as-tabs__item--active` class modifier.

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

This styles will be applied to `disabled` inputs, you can also use the `as-input--disabled` to apply this styles.

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

This styles will be applied to `readonly` inputs, you can also use the `as-input--read-only` to apply this styles.

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

This styles will be applied to `invalid` inputs, you can also use the `as-input--error` to apply this styles.

```html
---
<iframe src="/packages/styles/src/inputs/test/input-readonly.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<p>
  <span class="as-caption">Default</span>
  <input class="as-input as-input--error" type="text">
</p>
<p>
  <span class="as-caption">With placeholder</span>
  <input class="as-input as-input--error" type="text" placeholder="Hello there">
</p>
<p>
  <span class="as-caption">With value</span>
  <input class="as-input as-input--error" type="text" value="Hello there">
</p>
```
