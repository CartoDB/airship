## Map wrapper

The map wrapper is used as the container for the map area and the bottom panel. The bottom panel is useful for long horizontal content.

Inside the map area, you can add also floating panels, typically used for legends. These panels can be located in any of the four corners of the map.

### Single map wrapper

The most basic usage of the `as-map-wrapper` element is when you only need to show a map. No other panel. The map will cover the whole viewport.

The map needs to be inside a `as-map` element like in this code snippet.

```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/map-wrapper/single-map-wrapper.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<body class="as-app">
  <main class="as-app-content">
    <div class="as-map-wrapper">
      <div id="map"></div>
    </div>
  </main>
</body>
```


### Map wrapper + Bottom panel

To add a bottom panel you need to add an element with class `as-bottom-bar` as a child of `as-map-wrapper`.

The bottom panel is hidden in mobile and visible in desktop size. The reason is to have the most visible map area possible in small screens. To make the panel visible you need to add the class `as-bottom-bar--visible` to the element that contains the `as-panels__bottom` panel.

You can toggle the `as-bottom-bar--visible` class the way you prefer but we recommend using `as-toolbar-tabs`.

```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/map-wrapper/map-wrapper-bottom.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<body class="as-app">
  <nav class="as-toolbar-tabs">
    <span onclick="_showMap(event)" class="as-toolbar-tabs__item as-toolbar-tabs__item--active">MAP</span>
    <span onclick="_showBottomPanel(event)" class="as-toolbar-tabs__item">PANEL</span>
  </nav>

  <main class="as-app-content">
    <div class="as-map-wrapper">
      <div id="map"></div>
      <div class="as-bottom-bar">
        Bottom panel content.
      </div>
    </div>
  </main>
</body>
```

### Map wrapper + Floating panels

To add floating panels to the map area, to use them for legends for example, you need to add first an element with class `as-panels` inside the `as-map` element.

Then you need to add as much elements you want to contains the actual floating panels. The possible positions are set with a combination of place modifiers. For instance, if we want a container to place legends at the top right corner, you need to write:

```code
lang: html
---
<div class="as-panels">
  <div class="as-panel as-panel--top as-panel--right">
    <div class="as-panel__element">
      Top Right legend
    </div>
    <div class="as-panel__element">
      Some other content at Top Right
    </div>
  </div>
</div>

```

The possible modifiers for positioning are:
- `as-panel--top`
- `as-panel--middle`
- `as-panel--bottom`
- `as-panel--left`
- `as-panel--center`
- `as-panel--right`

You can add an aditional modifier class to allow the panels grow vertically. This way, Airship will stack `as-panel__element` one above the other.

- `as-panel--vertical`

```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/map-wrapper/map-wrapper-legends.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<main class="as-app-content">
  <div class="as-map-wrapper">
      <div id="map"></div>
      <div class="as-panels" data-usage="legends">
        <div class="as-panel as-panel--top">
          <div class="as-panel__element">
            Top Left legend growing horizontally
          </div>
          <div class="as-panel__element">
            Some content at Top Left
          </div>
        </div>
        <div class="as-panel as-panel--top as-panel--right as-panel--vertical">
          <div class="as-panel__element">
            Top Right legend growing vertically
          </div>
          <div class="as-panel__element">
            Some other content at Top Right
          </div>
        </div>
        <div class="as-panel as-panel--bottom">
          <div class="as-panel__element">
            Bottom Left content
          </div>
        </div>
      </div>
  </div>
</main>
```

### Map wrapper + Bottom panel + Floating panels

Needless to say, both bottom and floating panels can be present in the same `as-map-wrapper` container.

```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/map-wrapper/map-wrapper-bottom-legends.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<main class="as-app-content">
  <div class="as-map-wrapper">
    <div id="map"></div>
    <div class="as-panels">
      <div class="as-panel as-panel--top">
        <div class="as-panel__element">
          Top left legend
        </div>
      </div>
      <div class="as-panel as-panel--top as-panel--right as-panel--vertical">
        <div class="as-panel__element">
          Top Right legend growing vertically
        </div>
        <div class="as-panel__element">
          Some other content at Top Right
        </div>
      </div>
    </div>
    <div class="as-bottom-bar" data-usage="bottom">
      Bottom panel
    </div>
  </div>
</main>
```
