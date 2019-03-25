Toolbar is a generic bar that can be used as a header to put your application logo and some options to navigate throughout your application. A basic toolbar toolbar is only a `<header>` with the `.as-toolbar` class:


> A toolbar must be a direct child of the `as-app` element at the same level of `as-content`.

```html
showSource: true
---
<header class="as-toolbar"></header>
```


## Toolbar positioning
Toolbar is positioned to the top of the page by default. You can specify a different toolbar position using **class modifiers** in the `as-app` element.

> This modifiers wont affect mobile screens where the toolbar is always displayed on top.

### .as-app\--nav-left



```html
showSource: true
---
<div class="as-app as-app--nav-left" style="height: 300px; width:100%;">
  <header class="as-toolbar"></header>
  <main class="as-content"></main>
</div>
```

### .as-app\--nav-right



```html
showSource: true
---
<div class="as-app as-app--nav-right" style="height: 300px; width:100%;">
  <header class="as-toolbar"></header>
  <main class="as-content"></main>
</div>
```


## Toolbar Content

The toolbar will typically contain your logo and action items.  All elements inside the toolbar need to have the `as-toolbar__item` class.


### .as-toolbar__item

Use the `.as-toolbar__item` class to put content inside the toolbar. This class can be used on `icons`, `links`, paragraphs, or as a content wrapper.

```html
showSource: true
---
<header class="as-toolbar">
  <div class="as-toolbar__item">
    <img src="/examples/layouts/common/logo-circle.svg" alt="Logo"/>
  </div>
  <a href="#" class="as-toolbar__item">Link</a>
  <p class="as-toolbar__item">Paragraph</p>
  <i class="as-toolbar__item as-icon-points"></i>
</header>
```

### .as-toolbar__group

The toolbar has a default positioning behaviour of `flex` with `space-between`. That means:
- If the toolbar element has one child, it will be placed at the start.
- If the toolbar has two childs, they will be positioned in the extremes: the first at the left, the second at the right.
- If the toolbar has three children, they will layout at the left, center and right.

With that in mind, if you need to layout the items in different positions you can group them using the class `as-toolbar__group`

Elements grouped at the beginning:

```html
showSource: true
---
<header class="as-toolbar">
  <!-- as-toolbar__group code starts here -->
  <div class="as-toolbar__group">
    <a href="#" class="as-toolbar__item">Link 0</a>
    <a href="#" class="as-toolbar__item">Link 1</a>
  </div>
  <!-- as-toolbar__group code ends here -->
  <a href="#" class="as-toolbar__item">Link 2</a>
</header>
```

Elements grouped in the middle:

```html
showSource: true
---
<header class="as-toolbar">
  <a href="#" class="as-toolbar__item">Link 0</a>
  <!-- as-toolbar__group code starts here -->
  <div class="as-toolbar__group">
    <a href="#" class="as-toolbar__item">Link 1</a>
    <a href="#" class="as-toolbar__item">Link 2</a>
  </div>
  <!-- as-toolbar__group code ends here -->
  <a href="#" class="as-toolbar__item">Link 3</a>
</header>
```

Elements grouped at the end:

```html
showSource: true
---
<header class="as-toolbar">
  <a href="#" class="as-toolbar__item">Link 0</a>
  <!-- as-toolbar__group code starts here -->
  <div class="as-toolbar__group">
    <a href="#" class="as-toolbar__item">Link 1</a>
    <a href="#" class="as-toolbar__item">Link 2</a>
  </div>
  <!-- as-toolbar__group code ends here -->
</header>
```



### .as-toolbar__actions

Toolbar actions are the main toolbar's content, usually icons or links to another app section.

Actions are hidden by default on mobile devices and they are only visible when the `.as-toolbar-actions--visible` modifier class is present. This way you can have a contextual menu easily.

In order to fit the [W3C Accessibility guidelines](https://www.w3.org/WAI/tutorials/menus/), we recomend to use `nav` and `ul` element to layout the menu elements containing `li` elements with a link with a `as-toolbar__item` class.

```html
showSource: true
---
<header class="as-toolbar">
  <pre href="#" class="as-toolbar__item">APP NAME</pre>
  <!-- as-toolbar__actions code starts here -->
  <nav class="as-toolbar__actions">
    <ul>
      <li>
        <a href="#" class="as-toolbar__item">Link 1</a>
      </li>
      <li>
        <a href="#" class="as-toolbar__item">Link 2</a>
      </li>
    </ul>
  </nav>
  <!-- as-toolbar__actions code ends here -->
</header>
```
#### .as-toolbar__actions\--visible

Use this class modifier to display the toolbar-actions menu on small screens.

### .as-toolbar__toggle

Use the `.as-toolbar__toggle` modifier to create a button that controls the menu visibility.


```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/toolbar/toggle.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<header class="as-toolbar">
  <button onclick="toggleDrawer()" class="as-toolbar__item as-toolbar__toggle">
    <i class="as-icon-hamburguer as-title as-m--0"></i>
  </button>
  <div href="#" class="as-toolbar__item">LOGO</div>
  <nav class="as-toolbar__actions">
    <ul>
      <li>
        <a href="#" class="as-toolbar__item">Link 1</a>
      </li>
      <li>
        <a href="#" class="as-toolbar__item">Link 2</a>
      </li>
    </ul>
  </nav>
</header>
```

## Example

```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/toolbar/toolbar.html" style="width: 100%; height: 100%;">
```

## CSS Variables 

```
.as-toolbar {
  --as--toolbar--background-color
  --as--toolbar--text-color
  --as--toolbar--link-color
}
```

.as-toolbar__actions {
  --as--toolbar__actions--background-color
}
```