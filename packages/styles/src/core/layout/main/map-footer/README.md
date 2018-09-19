## .as-map-footer

The `map-footer` is a section located under the map in the `main area`.

The map footer bar is hidden in mobile and visible in desktop size. The reason is to have the most visible map area possible in small screens. To make the bar visible you need to add the class `as-bottom-bar--visible` to the element that contains the `as-panels__bottom` bar.

You can toggle the `as-map-footer--visible` class the way you prefer but we recommend using `as-toolbar-tabs`.


```html
<div class="as-app" style="width:100%; height:300px;">
  <div class="as-content">
    <main class="as-main">
      <div class="as-map-area as-bg--badge-blue">
        <!-- CARTO.js or CARTO-VL will place the map on this div  -->
        <div id="map"></div> 
       <div class="as-map-footer as-bg--badge-yellow" style="height: 100px;"></div>
      </div>
    </div>
  </main>
</div>
```


### .as-map-footer--visible

Use this class to make the footer fill the `as-content` section in small screen sizes.

```html
<div class="as-app" style="width:100%; height:300px;">
  <div class="as-content">
    <main class="as-main">
      <div class="as-map-area as-bg--badge-blue">
        <!-- CARTO.js or CARTO-VL will place the map on this div  -->
        <div id="map"></div> 
       <div class="as-map-footer as-bg--badge-yellow as-map-footer--visible" style="min-height: 100px;"></div>
      </div>
    </div>
  </main>
</div>
```


### Footer Example with tabs

```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/footer/footer" style="width: 100%; height: 100%;">
```