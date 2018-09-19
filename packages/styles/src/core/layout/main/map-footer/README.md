## .as-footer

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
