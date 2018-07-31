# Tabs

Tabs are an element used in navigation, it allows you to create a [menu element](https://www.w3.org/WAI/tutorials/menus/) or a [tabs element](https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html) both with a very similar look and feel.

To hightlight the current tab you can use `as-tabs__item--active` class modifier.

## Regular Tabs

```html
---
<iframe src="/packages/styles/src/tabs/test/tabs.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<nav class="as-tabs">
  <ul>
    <li>
      <a class="as-tabs__item as-tabs__item--active" href="#">Map</a>
    </li>
    <li>
      <a class="as-tabs__item" href="#">Legends</a>
    </li>
    <li>
      <a class="as-tabs__item" href="#">Widgets</a>
    </li>
    <li>
      <a class="as-tabs__item" href="#">Sidebar</a>
    </li>
  </ul>
</nav>
```


## XL Tabs

You can use the `as-tabs--xl` class modifier to create a slightly bigger tab element

```html
---
<iframe src="/packages/styles/src/tabs/test/tabs-xl.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<nav class="as-tabs as-tabs--xl">
  <ul>
    <li>
      <a class="as-tabs__item as-tabs__item--active" href="#">Map</a>
    </li>
    <li>
      <a class="as-tabs__item" href="#">Legends</a>
    </li>
    <li>
      <a class="as-tabs__item" href="#">Widgets</a>
    </li>
    <li>
      <a class="as-tabs__item" href="#">Sidebar</a>
    </li>
  </ul>
</nav>
```


## ARIA compatible Tabs

The tabs element is also ARIA compatible, using the roles `tablist` and `tabs` improves the accessibility by enabling keyboard support, etc

```html
---
<iframe src="/packages/styles/src/tabs/test/tabs-accesible.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<div class="as-tabs as-tabs--xl" role="tablist">
  <button role="tab" class="as-tabs__item as-tabs__item--active">Map</button>
  <button role="tab" class="as-tabs__item">Legends</button>
  <button role="tab" class="as-tabs__item">Widgets</button>
</div>
```
