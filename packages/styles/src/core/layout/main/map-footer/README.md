## .as-map-footer

The `map-footer` is a section located under the map in the `main area`.

The map footer bar is hidden in mobile and visible in desktop size. The reason is to have the most visible map area possible in small screens. To make the bar visible you need to add the class `as-bottom-bar--visible` to the element that contains the `as-panels__bottom` bar.

You can toggle the `as-map-footer--visible` class the way you prefer but we recommend using `as-toolbar-tabs`.


> The map-area must be a direct child of the `as-content` element at the same level of `as-map-area`.


```html
showSource: true
---
<div class="as-app" style="width:100%; height:300px;">
  <div class="as-content">
    <main class="as-main">
      <div class="as-map-area as-bg--badge-blue">
        <div id="map"></div>
        <!-- as-map-footer code starts here -->
        <footer class="as-map-footer as-bg--badge-yellow" style="height: 100px;"></footer>
        <!-- as-map-footer code ends here -->
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
        <div id="map"></div>
        <!-- as-map-footer--visible code starts here -->
        <footer class="as-map-footer as-bg--badge-yellow as-map-footer--visible" style="min-height: 100px;"></footer>
        <!-- as-map-footer--visible code ends here -->
      </div>
    </div>
  </main>
</div>
```

### Footer Example with responsive tabs

```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/footer/footer.html" style="width: 100%; height: 100%;">
```

## Footer content

You can put whatever you want as a footer child, but we recommend using `as-box` as a wrapper for your elements.

### .as-box

`.as-box` is an utility class that wraps your element distributing the content nicely in the footer.


```hint|directive
Remember to set a min-width to your elements to ensure a proper experience across all screen sizes.
```

```html
showSource: true
---
<!-- as-box code starts here -->
<footer class="as-map-footer as-bg--badge-yellow">
  <div class="as-box">
    <p class="as-title">BOX 1</p>
    <p class="as-body">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>
    <p class="as-body">
      Inventore possimus nam quam necessitatibus omnis, est sequi rem quibusdam molestiae.
    </p>
  </div>
  <div class="as-box">
    <p class="as-title">BOX 2</p>
    <p class="as-body">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>
  </div>
</footer>
<!-- as-box code ends here -->
```

#### .as-box--scroll

Use the `.as-box--scroll` modifier to add a vertical scroll for your `.as-box` elements.

```html
showSource: true
---
<!-- as-box code starts here -->
<footer class="as-map-footer as-bg--badge-yellow">
  <div class="as-box">
    <p class="as-title">BOX 1</p>
    <p class="as-body">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>
    <p class="as-body">
      Inventore possimus nam quam necessitatibus omnis, est sequi rem quibusdam molestiae.
    </p>
  </div>
  <div class="as-box--scroll">
    <p class="as-title">BOX WITH SCROLL</p>
    <p class="as-body">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu consequat quam.
    <p class="as-body">
      Nulla varius, justo ut ultricies iaculis, nunc nibh cursus massa, eu luctus mi massa a felis.
    </p>
    <p class="as-body">
      Vivamus in nisi ut tellus accumsan vestibulum ut et quam.
    </p>
    <p class="as-body">
      Nunc ligula lacus, pellentesque quis sollicitudin ut, eleifend a sapien.
    </p>
    <p class="as-body">
      Suspendisse erat lorem, vestibulum vestibulum blandit ac, condimentum eget lorem.
    </p>
    <p class="as-body">
      Maecenas nulla lectus, ornare vitae cursus id, aliquet interdum enim.
    </p>
    <p class="as-body">
      Nulla condimentum, massa at viverra lobortis, metus metus commodo metus, eget ultrices augue ex id sem.
    </p>
    <p class="as-body">
      Ut dictum diam ut nunc ornare, quis lacinia arcu volutpat.
    </p>
    <p class="as-body">
      Praesent sem velit, ultrices eget velit sit amet, sodales venenatis urna.
    </p>
    <p class="as-body">
      Donec quis faucibus libero, eget volutpat nisl. 
    </p>
    <p class="as-body">
      Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </p>
    <p class="as-body">
      Maecenas mattis tempus hendrerit.
    </p>
  </div>
</footer>
<!-- as-box code ends here -->
```
