## .as-sidebar

Use this class to create sidebars beside the map area. Sidebars are the area where your app content lives, there are no restrictions regarding the contents of a sidebar.

Sidebars are hidden by default in mobile devices and only will be shown when the modifier class `as-sidebar--visible` is present.

> A sidebar must be a direct child of the `as-content` element at the same level of `as-main`.


## Class modifiers

Sidebar position and size can be changed with the following class modifiers.

### .as-sidebar\--left

Puts the sidebar on the left of the map.



```html
showSource: true
---
<div class="as-app"  style="height: 300px; width:100%;">
  <div class="as-content">
    <!-- as-sidebar--left code starts here -->
    <aside class="as-sidebar as-sidebar--left as-bg--success"></aside>
    <!-- as-sidebar--left code ends here -->
    <main class="as-main as-bg--badge-blue">
      <!-- Map will be here -->
    </main>
  </div>
</div>
```

### .as-sidebar\--right

Puts the sidebar on the right of the map.

```html
showSource: true
---
<div class="as-app"  style="height: 300px; width:100%;">
  <div class="as-content">
    <main class="as-main as-bg--badge-blue">
      <!-- Put your map here -->
    </main>
    <!-- as-sidebar--right code starts here -->
    <aside class="as-sidebar as-sidebar--right as-bg--warning"></aside>
    <!-- as-sidebar--right code end here -->
  </div>
</div>
```



### .as-sidebar\--l

Makes the sidebar to be 360px width.

```html
showSource: true
---
<div class="as-app"  style="height: 300px; width:100%;">
  <div class="as-content">
    <!-- as-sidebar--l code starts here -->
    <aside class="as-sidebar as-sidebar--l as-sidebar--left as-bg--success"></aside>
    <!-- as-sidebar--l code ends here -->
    <main class="as-main as-bg--badge-blue">
      <!-- Put your map here -->
    </main>
  </div>
</div>
```

### .as-sidebar\--xl

Makes the sidebar to be 460px width.

```html
showSource: true
---
<div class="as-app"  style="height: 300px; width:100%;">
  <div class="as-content">
    <!-- as-sidebar--xl code starts here -->
    <aside class="as-sidebar as-sidebar--xl as-sidebar--left as-bg--success"></aside>
    <!-- as-sidebar--xl code end here -->
    <main class="as-main as-bg--badge-blue">
      <!-- Put your map here -->
    </main>
  </div>
</div>
```


### .as-sidebar\--visible

Makes the sidebar visible on small screens, filling all the space available in the `.app-content` and covering the map.

Combining this class with the `.tabs` element it is easy to create a responsive navigation.

Anyway, we recommend the use of the `<as-responsive-content>` to add our standard responsive behaviour out of the box.


## Full example with responsive tabs

Sidebars will be hidden on small devices. Use `tabs` to create a first level navigation.

```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/sidebar/sidebar.html" style="width: 100%; height: 100%;">
```
[See example](/developers/airship/examples/#example-basic-sidebar)

## CSS Variables

.as-sidebar {
  --as--sidebar--background-color
  --as--sidebar--box--border-color
  --as--sidebar--shadow-color
}