## .as-map-panels

Map panels is the section where the `as-panels` element will be placed.

> The `map-panels` element must be a direct child of the `map-area` at the same level of `#map`.


```html
noSource: true
responsive: [tablet]
---
<iframe src="/examples/layouts/panels/panels.html" style="width: 100%; height: 100%;">
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
showSource: true
---
<div class="as-app" style="width:100%; height:300px;">
  <div class="as-content">
    <main class="as-main as-bg--badge-blue">
      <div class="as-map-area">
      <div id="map"></div> 
      <div class="as-map-panels">
        <!-- as-panel code starts here -->
        <div class="as-panel as-panel--top as-panel--left">left top panel</div>
        <div class="as-panel as-panel--top as-panel--center">center top panel</div>
        <div class="as-panel as-panel--top as-panel--right">right top panel</div>
        <div class="as-panel as-panel--middle as-panel--left">left middle panel</div>
        <div class="as-panel as-panel--middle as-panel--center">center middle panel</div>
        <div class="as-panel as-panel--middle as-panel--right">right middle panel</div>
        <div class="as-panel as-panel--bottom as-panel--left">left bottom panel</div>
        <div class="as-panel as-panel--bottom as-panel--center">center bottom panel</div>
        <div class="as-panel as-panel--bottom as-panel--right">right bottom panel</div>
        <!-- as-panel code ends here -->
      </div>
    </main>
  </div>
</div>
```

### .as-panel__element

This class creates a wrapper that allows to place content like widgets, text or legends over the map.


```html
showSource: true
---
<div class="as-app" style="width:100%; height:300px;">
  <div class="as-content">
    <main class="as-main as-bg--badge-blue">
      <div class="as-map-area">
        <div id="map"></div>
        <div class="as-map-panels">
          <div class="as-panel as-panel--middle as-panel--center">
            <!-- as-panel__element code starts here -->
            <div class="as-panel__element as-p--32 as-bg--support-02">
              <p class="as-body"> Center Panel </p>
            </div>
            <!-- as-panel__element code ends here -->
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
```


### .as-panel--vertical

By default panels grow horizontally. Add this class to make the panels grow vertically.

```html
showSource: true
---
<div class="as-app" style="width:100%; height:300px;">
  <div class="as-content">
    <main class="as-main as-bg--badge-blue">
      <div class="as-map-area">
        <div id="map"></div>
        <div class="as-map-panels">
          <div class="as-panel as-panel--top as-panel--left">
            <div class="as-panel__element as-p--32 as-bg--support-02">
              <p class="as-body"> Panel 0 </p>
            </div>
            <div class="as-panel__element as-p--32 as-bg--support-03">
              <p class="as-body"> Panel 1 </p>
            </div>
          </div>
          <!-- as-panel--vertical code starts here -->
          <div class="as-panel as-panel--vertical as-panel--middle as-panel--right">
            <div class="as-panel__element as-p--32 as-bg--support-02">
              <p class="as-body"> Panel 2 </p>
            </div>
            <div class="as-panel__element as-p--32 as-bg--support-03">
              <p class="as-body"> Panel 3 </p>
            </div>
          </div>
          <!-- as-panel--vertical code ends here -->
        </div>
      </div>
    </main>
  </div>
</div>
```

### Full example with tabs

```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/panels/panels-tabs.html" style="width: 100%; height: 100%;">
```
