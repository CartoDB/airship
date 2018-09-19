The map wrapper is used as the container for the `#map` div, the `.as-bottom-bar` and the `.as-panels` area.


- The bottom bar works similar to a sidebar but is positioned horizontally below the map.
- The `#map` div is the element where the map is placed.
- The `.as-panels` element overlaps the `#map` allowing to place floating panels over the map.


## .as-map-wrapper

The most basic usage of the `as-map-wrapper` element is when you only need to show a map. The map will cover the whole viewport.

```html
<div class="as-app" style="width:100%; height:300px;">
  <main class="as-app-content">
    <div class="as-map-wrapper as-bg--badge-blue">
      <!-- CARTO.js or CARTO-VL will place the map on this div  -->
      <div id="map"></div> 
    </div>
  </main>
</div>
```


## .as-bottom-bar

To add a bottom bar you need to add an element with class `as-bottom-bar` as a child of `as-map-wrapper`.

The bottom bar is hidden in mobile and visible in desktop size. The reason is to have the most visible map area possible in small screens. To make the bar visible you need to add the class `as-bottom-bar--visible` to the element that contains the `as-panels__bottom` bar.

You can toggle the `as-bottom-bar--visible` class the way you prefer but we recommend using `as-toolbar-tabs`.


```html
<div class="as-app" style="width:100%; height:300px;">
  <main class="as-app-content">
    <div class="as-map-wrapper as-bg--badge-blue">
      <!-- CARTO.js or CARTO-VL will place the map on this div  -->
      <div id="map"></div> 
      <div class="as-bottom-bar as-bg--badge-yellow" style="height: 100px;">
        .as-bottom-bar
      </div>
    </div>
  </main>
</div>
```

## .as-panels

Use this class as a child of the `as-map-wrapper` element. The `as-panels` wrapper covers the map area but wont interfer the UI. This element should only be used as a container for the panels.

```html
<div class="as-app" style="width:100%; height:300px;">
  <main class="as-app-content">
    <div class="as-map-wrapper as-bg--badge-blue">
      <!-- CARTO.js or CARTO-VL will place the map on this div  -->
      <div id="map"></div> 
      <div class="as-panels" style="background: rgba(0, 0, 0, 0.5);">
        as panels
      </div>
    </div>
  </main>
</div>
```

## .as-panel

An `as-panel` element is a container for the `as-panel__element` that allows to specify the position and how the panel elements will be stacked.

You can combine two of the following class modifiers to specify the panel position:

- `as-panel--top`
- `as-panel--middle`
- `as-panel--bottom`
- `as-panel--left`
- `as-panel--center`
- `as-panel--right`


```html
<div class="as-app" style="width:100%; height:300px;">
  <main class="as-app-content">
    <div class="as-map-wrapper as-bg--badge-blue">
      <!-- CARTO.js or CARTO-VL will place the map on this div  -->
      <div id="map"></div> 
      <div class="as-panels">
        <div class="as-panel as-panel--top as-panel--left">left top panel</div>
        <div class="as-panel as-panel--top as-panel--center">center top panel</div>
        <div class="as-panel as-panel--top as-panel--right">right top panel</div>
        <div class="as-panel as-panel--middle as-panel--left">left middle panel</div>
        <div class="as-panel as-panel--middle as-panel--center">center middle panel</div>
        <div class="as-panel as-panel--middle as-panel--right">right middle panel</div>
        <div class="as-panel as-panel--bottom as-panel--left">left bottom panel</div>
        <div class="as-panel as-panel--bottom as-panel--center">center bottom panel</div>
        <div class="as-panel as-panel--bottom as-panel--right">right bottom panel</div>
      </div>
    </div>
  </main>
</div>
```

### .as-panel__element

This class creates a wrapper that allows to place content like widgets, text or legends over the map.


```html
<div class="as-app" style="width:100%; height:300px;">
  <main class="as-app-content">
    <div class="as-map-wrapper as-bg--badge-blue">
      <!-- CARTO.js or CARTO-VL will place the map on this div  -->
      <div id="map"></div> 
      <div class="as-panels">
       
        <div class="as-panel as-panel--middle as-panel--center">
          <div class="as-panel__element"> 
            <p class="as-body"> Im a panel element </p>
          </div>
        </div>
       
      </div>
    </div>
  </main>
</div>
```


### .as-panel--vertical

By default panels grow horizontally. Add this class to make the panels grow vertically.

```html
<div class="as-app" style="width:100%; height:300px;">
  <main class="as-app-content">
    <div class="as-map-wrapper as-bg--badge-blue">
      <!-- CARTO.js or CARTO-VL will place the map on this div  -->
      <div id="map"></div> 
      <div class="as-panels">
       
        <div class="as-panel as-panel--top as-panel--left">
          <div class="as-panel__element"> 
            <p class="as-body"> First horizontal panel </p>
          </div>
          <div class="as-panel__element"> 
            <p class="as-body"> Second horizontal panel </p>
          </div>
        </div>

        <div class="as-panel as-panel--vertical as-panel--middle as-panel--right">
          <div class="as-panel__element"> 
            <p class="as-body"> First vertical panel </p>
          </div>
          <div class="as-panel__element"> 
            <p class="as-body"> Second vertical panel </p>
          </div>
        </div>
       
      </div>
    </div>
  </main>
</div>
```


## Full example 

```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/map-wrapper/map-wrapper-bottom-legends.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<!-- This code-snippet has some missing scripts  -->
<body class="as-app">
  <div role="tablist" class="as-toolbar-tabs as-tabs">
    <button onclick="showMap(event)" role="tab" class="as-tabs__item as-tabs__item--active">MAP</button>
    <button onclick="showLegends(event)" role="tab" class="as-tabs__item">LEGENDS</button>
    <button onclick="showBottom(event)" role="tab" class="as-tabs__item">BOTTOM</button>
  </div>

  <main class="as-app-content">
    <div class="as-map-wrapper">
      <div id="map"></div>
      <div class="as-panels" data-usage="legends">
        <div class="as-panel as-panel--top as-panel--left">
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
      <div class="as-bottom-bar" data-usage="bottom">
        <h1>LEGEND</h1>
        <p>Lorem ipsum</p>
      </div>
    </div>
  </main>
</body>
```
