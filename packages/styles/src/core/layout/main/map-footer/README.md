## .as-map-footer

The `map-footer` is a section located under the map in the `main area`.

The map footer bar is hidden in mobile and visible in desktop size. The reason is to have the most visible map area possible in small screens. To make the bar visible you need to add the class `as-bottom-bar--visible` to the element that contains the `as-panels__bottom` bar.

You can toggle the `as-map-footer--visible` class the way you prefer but we recommend using `as-toolbar-tabs`.


> The map-area must be a direct child of the `as-content` element at the same leve of `as-map-area`.


```html
showSource: true
---
<div class="as-app" style="width:100%; height:300px;">
  <div class="as-content">
    <main class="as-main">
      <div class="as-map-area as-bg--badge-blue">
        <!-- CARTO.js or CARTO-VL will place the map on this div  -->
        <div id="map"></div>
       <footer class="as-map-footer as-bg--badge-yellow" style="height: 100px;"></footer>
      </div>
    </div>
  </main>
</div>
```


### .as-map-footer--visible

Use this class to make the footer fill the `as-content` section in small screen sizes.

```html
showSource: true
---
<div class="as-app" style="width:100%; height:300px;">
  <div class="as-content">
    <main class="as-main">
      <div class="as-map-area as-bg--badge-blue">
        <!-- CARTO.js or CARTO-VL will place the map on this div  -->
        <div id="map"></div>
       <footer class="as-map-footer as-bg--badge-yellow as-map-footer--visible" style="min-height: 100px;"></footer>
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



## Footer Containers

```html
showSource: true
---
<div class="as-app" style="width:100%; height:300px;">
  <div class="as-content">
    <main class="as-main">
      <div class="as-map-area as-bg--badge-blue">
        <!-- CARTO.js or CARTO-VL will place the map on this div  -->
        <div id="map"></div>
        <footer class="as-map-footer as-bg--badge-yellow">
          <div class="as-container as-container--border">
            <section class="as-box as-box--medium">
              <h1 class="as-title">Fixed container</h1>
              <p class="as-body">Use this container when you need to present fixed content.</p>
            </section>
          </div>
          <div class="as-container as-container--scrollable">
            <section class="as-box as-box--large">
              <h1 class="as-title">Scrollable container</h1>
              <p class="as-body">When you need to present lots of content that don't fit
                in the available space, use a scrollable container.
                It'll take the space left by the fixed containers.</p>
            </section>
            <section class="as-box">
              <h1 class="as-title">A box</h1>
              <p class="as-body">
                This content is here to fill up more space.
              </p>
            </section>
            <section class="as-box">
              <h1 class="as-title">A box</h1>
              <p class="as-body">
                This content is here to fill up more space.
              </p>
            </section>
            <section class="as-box">
              <h1 class="as-title">A box</h1>
              <p class="as-body">
                This content is here to fill up more space.
              </p>
            </section>
            <section class="as-box as-box--xlarge">
              <h1 class="as-title">A box</h1>
              <p class="as-body">
                This content is here to fill up more space.
              </p>
            </section>
          </div>
        </footer>
      </div>
    </div>
  </main>
</div>
```

### .as-container

Use this class to create sections inside the footer. By default a container will occupy as much vertical space as needed.

```html
showSource: true
---
<div class="as-app" style="width:100%; height:300px;">
  <div class="as-content">
    <main class="as-main">
      <div class="as-map-area as-bg--badge-blue">
        <!-- CARTO.js or CARTO-VL will place the map on this div  -->
        <div id="map"></div>
        <footer class="as-map-footer as-bg--badge-yellow">
          <div class="as-container">
            <section class="as-box as-box--medium">
              <h1 class="as-title">Container 0 </h1>
              <p class="as-body">Use this container when you need to present fixed content.</p>
            </section>
          </div>
          <div class="as-container">
            <section class="as-box as-box--medium">
              <h1 class="as-title">Container 1 </h1>
              <p class="as-body">Use this container when you need to present fixed content.</p>
            </section>
          </div>
        </footer>
      </div>
    </div>
  </main>
</div>
```

### .as-container--scrollable

The `scrollable container` will take the space left by the fixed containers. Use this modifier to when you need to present lots of content that don't fit in the available space.

```html
showSource: true
---
<div class="as-app" style="width:100%; height:300px;">
  <div class="as-content">
    <main class="as-main">
      <div class="as-map-area as-bg--badge-blue">
        <!-- CARTO.js or CARTO-VL will place the map on this div  -->
        <div id="map"></div>
        <footer class="as-map-footer as-bg--badge-yellow">
          <div class="as-container">
            <section class="as-box as-box--medium">
              <h1 class="as-title">Container 0 </h1>
              <p class="as-body">Use this container when you need to present fixed content.</p>
            </section>
          </div>
          <div class="as-container as-container--scrollable">
            <section class="as-box as-box--medium">
              <h1 class="as-title">Scrollable 1 </h1>
              <p class="as-body">This box is inside a scrollable container.</p>
            </section>

             <section class="as-box as-box--medium">
              <h1 class="as-title">Scrollable 2 </h1>
              <p class="as-body">This box is inside a scrollable container.</p>
            </section>

             <section class="as-box as-box--medium">
              <h1 class="as-title">Scrollable 3 </h1>
              <p class="as-body">This box is inside a scrollable container.</p>
            </section>
          </div>
        </footer>
      </div>
    </div>
  </main>
</div>
```

### .as-container\--border

```html
showSource: true
---
<div class="as-app" style="width:100%; height:300px;">
  <div class="as-content">
    <main class="as-main">
      <div class="as-map-area as-bg--badge-blue">
        <!-- CARTO.js or CARTO-VL will place the map on this div  -->
        <div id="map"></div>
        <footer class="as-map-footer as-bg--badge-yellow">
          <div class="as-container as-container--border">
            <section class="as-box as-box--medium">
              <h1 class="as-title">Container 0 </h1>
              <p class="as-body">This box is inside a border container</p>
            </section>
          </div>
          <div class="as-container as-container--border">
            <section class="as-box as-box--medium">
              <h1 class="as-title">Box 1 </h1>
              <p class="as-body">This box is inside a border container</p>
            </section>
            <section class="as-box as-box--medium">
              <h1 class="as-title">Box 2 </h1>
              <p class="as-body">This box is inside a border container</p>
            </section>
          </div>
          <div class="as-container as-container--border">
            <section class="as-box as-box--medium">
              <h1 class="as-title">Box 3 </h1>
              <p class="as-body">This box is inside a border container</p>
            </section>
          </div>
        </footer>
      </div>
    </div>
  </main>
</div>
```


## .as-box

Use the `as-box` class to create groups inside a container.

### .as-box--<size>

Only on the `map-footer` you can specify the box-witdh with one of the following modifiers:

- .as-box--s
- .as-box--m
- .as-box--l
- .as-box--xl


```html
showSource: true
---
<div class="as-app" style="width:100%; height:300px;">
  <div class="as-content">
    <main class="as-main">
      <div class="as-map-area as-bg--badge-blue">
        <!-- CARTO.js or CARTO-VL will place the map on this div  -->
        <div id="map"></div>
        <footer class="as-map-footer as-bg--badge-yellow">
          <div class="as-container">
            <section class="as-box as-box--xl">
              <h1 class="as-title">Container 0 </h1>
              <p class="as-body">
                This box is has the --xl class modifier so will take more space than other boxes.
              </p>
            </section>
          </div>
          <div class="as-container">
           <section class="as-box as-box--s">
              <h1 class="as-title">Container 0 </h1>
              <p class="as-body">
                This box is has the --s class modifier so will be smaller than other boxes.
              </p>
            </section>
          </div>
          <div class="as-container">
           <section class="as-box as-box--xl">
              <h1 class="as-title">Container 0 </h1>
              <p class="as-body">
                This box is has the --xl class modifier so will take more space than other boxes.
              </p>
            </section>
          </div>
        </footer>
      </div>
    </div>
  </main>
</div>
```

