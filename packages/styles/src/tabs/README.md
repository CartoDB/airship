# Tabs

Tabs are an element used in navigation.

You can use tabs to create a [menu element](https://www.w3.org/WAI/tutorials/menus/) or a [tabs element](https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html) both with a very similar look and feel.

Tabs have a single modifier to control the size:

- `as-tabs--xl`: Class modifier used to create a slightly bigger tab element.


You can also hightlight the current tab through the `as-tabs__item--active` class modifier.


## Regular Tabs

```html
responsive: true
---
<iframe src="/packages/styles/src/tabs/test/tabs.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<nav class="as-tabs">
  <ul>
    <li class="as-tabs__item as-tabs__item--active">Tab 0</li>
    <li class="as-tabs__item">Tab 1</li>
    <li class="as-tabs__item">Tab 2</li>
  </ul>
</nav>
```


## XL Tabs


```html
responsive: true
---
<iframe src="/packages/styles/src/tabs/test/tabs-xl.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<div class="as-tabs as-tabs--xl" role="tablist">
  <button role="tab" class="as-tabs__item as-tabs__item--active">Tab 0</button>
  <button role="tab" class="as-tabs__item">Tab 1</button>
  <button role="tab" class="as-tabs__item">Tab 2</button>
</div>
```