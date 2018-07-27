## Map wrapper

The map wrapper is used as the container for the map and two more type of panels:
- Bottom panel: a panel that is located at the bottom of the map wrapper. Useful for long horizontal content.
- Floating panels: used typically for legends. These panels can be located in any of the four corners of the map.

### Single map wrapper

The most basic usage of the `as-map-wrapper` element is when you only need to show map. No other panel. The map will cover the whole viewport.

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

To add a bottom panel you need to add an element with class `as-panels` as a child of `as-map-wrapper` and an element with class `as-panels__bottom` inside it.

The bottom panel is hidden in mobile and visible in desktop size. The reason is to have the most visible map area possible in small screens. To make the panel visible you need to add the class `is-visible` to the `as-panels` element that contains the `as-panels__bottom` panel.

You can toggle the `is-visible` class the way you prefer but we recommend using `as-toolbar-tabs`.

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
      <div class="as-panels">
        <div class="as-panels__bottom">
          Bottom panel content.
        </div>
      </div>
    </div>
  </main>
</body>
```

### Map wrapper + Floating panels

### Map wrapper + Bottom panel + Floating panels

