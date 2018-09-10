## .as-sidebar

Use this class to create sidebars beside the map wrapper. Sidebars are the area where your app content lives and should be placed inside an element with the class `as-app-content`. There are no restrictions regarding the contents of a sidebar.

Sidebars are hidden by default in mobile devices and only will be shown when the modifier class `as-sidebar--visible` is present.


## Class modifiers

Sidebar position and size can be changed with the following class modifiers.

### .as-sidebar--left

Puts the sidebar on the left of the map.



```html
<div class="as-app"  style="height: 300px; width:100%;">
  <main class="as-app-content">

    <aside class="as-sidebar as-sidebar--left" style="background: #80B622;"></aside>
    
    <div class="as-map-wrapper" style="background: #B5E0F9;">
      <!-- Put your map here -->
    </div>
  </main>
</div>
```

### .as-sidebar--right

Puts the sidebar on the right of the map.

```html
<div class="as-app"  style="height: 300px; width:100%;">
  <main class="as-app-content">
    <div class="as-map-wrapper" style="background: #B5E0F9;">
      <!-- Put your map here -->
    </div>

    <aside class="as-sidebar as-sidebar--right" style="background: #80B622;"></aside>
  </main>
</div>
```



### .as-sidebar--l

Makes the sidebar to be 360px width.

```html
<div class="as-app"  style="height: 300px; width:100%;">
  <main class="as-app-content">

    <aside class="as-sidebar as-sidebar--left as-sidebar--l" style="background: #80B622;"></aside>
    
    <div class="as-map-wrapper" style="background: #B5E0F9;">
      <!-- Put your map here -->
    </div>
  </main>
</div>
```

### .as-sidebar--xl

Makes the sidebar to be 460px width.

```html
<div class="as-app"  style="height: 300px; width:100%;">
  <main class="as-app-content">

    <aside class="as-sidebar as-sidebar--left as-sidebar--xl" style="background: #80B622;"></aside>
    
    <div class="as-map-wrapper" style="background: #B5E0F9;">
      <!-- Put your map here -->
    </div>
  </main>
</div>
```


### .as-sidebar--visible

Makes the sidebar visible on small screens occupying all the space available in the`.app-content` and covering the map.


```html
<div class="as-app"  style="height: 300px; width:100%;">
  <main class="as-app-content">

    <aside class="as-sidebar as-sidebar--left as-sidebar--visible" style="background: #80B622;"></aside>
    
    <div class="as-map-wrapper" style="background: #B5E0F9;">
      <!-- Put your map here -->
    </div>
  </main>
</div>
```

Combining this class with the `.tabs` element it is easy to create a responsive navigation:


## Full example with tabs


```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/sidebar/sidebar.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<!-- Missing scripts to handle visibility classes -->
<body class="as-app">
  <div role="tablist" class="as-toolbar-tabs as-tabs">
    <button onclick="showMap(event)" role="tab" class="as-tabs__item as-tabs__item--active">MAP</button>
    <button onclick="showLeft(event)" role="tab" class="as-tabs__item">LEFT</button>
    <button onclick="showRight(event)" role="tab" class="as-tabs__item">RIGHT</button>
  </div>

  <main class="as-app-content">
    <aside class="as-sidebar as-sidebar--left as-sidebar--xl" style="background: #80B622;">.sidebar--left</aside>

    <div class="as-map-wrapper">
      <div id="map"></div>
    </div>

    <aside class="as-sidebar as-sidebar--right" style="background: #80B622;">.sidebar--right</aside>

  </main>
</body>
```