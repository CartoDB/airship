## .as-sidebar

Use this class to create sidebars beside the map area. Sidebars are the area where your app content lives and should be placed inside an element with the class `as-content`. There are no restrictions regarding the contents of a sidebar.

Sidebars are hidden by default in mobile devices and only will be shown when the modifier class `as-sidebar--visible` is present.


## Class modifiers

Sidebar position and size can be changed with the following class modifiers.

### .as-sidebar--left

Puts the sidebar on the left of the map.



```html
showSource: true
---
<div class="as-app"  style="height: 300px; width:100%;">
  <div class="as-content">
    <aside class="as-sidebar as-sidebar--left as-bg--support-03"></aside>
    <main class="as-main as-bg--badge-blue">
      <!-- Map will be here -->
    </main>
  </div>
</div>
```

### .as-sidebar--right

Puts the sidebar on the right of the map.

```html
showSource: true
---
<div class="as-app"  style="height: 300px; width:100%;">
  <div class="as-content">
    <main class="as-main as-bg--badge-blue">
      <!-- Put your map here -->
    </main>
    <aside class="as-sidebar as-sidebar--right as-bg--support-02"></aside>
  </div>
</div>
```



### .as-sidebar--l

Makes the sidebar to be 360px width.

```html
showSource: true
---
<div class="as-app"  style="height: 300px; width:100%;">
  <div class="as-content">
    <aside class="as-sidebar as-sidebar--l as-sidebar--left as-bg--support-03"></aside>
    <main class="as-main as-bg--badge-blue">
      <!-- Put your map here -->
    </main>
  </div>
</div>
```

### .as-sidebar--xl

Makes the sidebar to be 460px width.

```html
showSource: true
---
<div class="as-app"  style="height: 300px; width:100%;">
  <div class="as-content">
    <aside class="as-sidebar as-sidebar--xl as-sidebar--left as-bg--support-03"></aside>
    <main class="as-main as-bg--badge-blue">
      <!-- Put your map here -->
    </main>
  </div>
</div>
```


### .as-sidebar--visible

Makes the sidebar visible on small screens, filling all the space available in the `.app-content` and covering the map.

Combining this class with the `.tabs` element it is easy to create a responsive navigation.

Anyway, we recommend the use of the `<as-responsive-content>` to add our standard responsive behaviour out of the box.


## Full example with tabs

Sidebars will be hidden on small devices. Use `tabs` to create a first level navigation.


```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/sidebar/sidebar.html" style="width: 100%; height: 100%;">
```