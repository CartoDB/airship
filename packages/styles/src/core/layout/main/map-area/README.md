The map area is the section used to contain the  `#map` div and the `map-panels`.


- The `#map` div is the element where the map is placed.
- The map panels section is used to place floating `panels` over the `#map`


## .as-map-area

The most basic usage of the `as-map-wrapper` element is when you only need to show a map. The map will cover the whole viewport.

```html
showSource: true
---
<div class="as-app" style="width:100%; height:300px;">
    <main class="as-content">
      <!-- element code starts here -->
      <div class="as-map-area as-bg--badge-blue">
<<<<<<< HEAD
        <div id="map"></div> 
=======
        <!-- CARTO.js or CARTO-VL will place the map on this div  -->
        <div id="map"></div>
>>>>>>> master
      </div>
      <!-- element code ends here -->
    </main>
</div>
```
