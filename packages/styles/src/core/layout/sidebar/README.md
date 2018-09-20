## .as-sidebar

Use this class to create sidebars beside the map wrapper. Sidebars are the area where your app content lives and should be placed inside an element with the class `as-app-content`. There are no restrictions regarding the contents of a sidebar.

Sidebars are hidden by default in mobile devices and only will be shown when the modifier class `as-sidebar--visible` is present.


## Class modifiers

Sidebar position and size can be changed with the following class modifiers.

### .as-sidebar--left

Puts the sidebar on the left of the map.



```html
<div class="as-app"  style="height: 300px; width:100%;">
  <div class="as-content">
    <aside class="as-sidebar as-sidebar--left as-bg--support-03"></aside>
    <main class="as-main as-bg--badge-blue">
      <!-- Put your map here -->
    </main>
  </div>
</div>
```

### .as-sidebar--right

Puts the sidebar on the right of the map.

```html
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

Makes the sidebar visible on small screens filling all the space available in the `.app-content` and covering the map.


```html
<div class="as-app"  style="height: 300px; width:100%;">
  <div class="as-content">
    <aside class="as-sidebar as-sidebar--visible as-sidebar--left as-bg--support-03"></aside>
    <main class="as-main as-bg--badge-blue">
      <!-- Put your map here -->
    </main>
  </div>
</div>
```

Combining this class with the `.tabs` element it is easy to create a responsive navigation:


## Full example with tabs

Sidebars will be hidden on small devices. Use `tabs` to create a first level navigation.


```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/sidebar/sidebar.html" style="width: 100%; height: 100%;">
```





## Sidebar Containers

```html
<div class="as-app"  style="height: 400px; width:100%;">
  <div class="as-content">
    <main class="as-main as-bg--badge-blue">
      <!-- Put your map here -->
    </main>
    <aside class="as-sidebar as-sidebar--right as-bg--support-02">
      <div class="as-container as-container--border">
        <section class="as-box">
          <h1 class="as-title">Fixed container</h1>
          <p class="as-body">
            Use this container when you need to present fixed content. This content will occupy as
            much vertical space as needed.
          </p>
        </section>
      </div>
      <div class="as-container as-container--scrollable">
        <section class="as-box">
          <h1 class="as-title">Scrollable container</h1>
          <p class="as-body">
            When you need to present lots of content that don't fit in the available space, use a scrollable container.
            It'll take the space left by the fixed containers.
          </p>
        </section>
        <section class="as-box">
          <h1 class="as-title">A box</h1>
          <p class="as-body">
            This content is here to fill up more space than available so you can scroll.
          </p>
        </section>
        <section class="as-box">
          <h1 class="as-title">A box</h1>
          <p class="as-body">
            This content is here to fill up more space than available so you can scroll.
          </p>
        </section>
        <section class="as-box">
          <h1 class="as-title">A box</h1>
          <p class="as-body">
            This content is here to fill up more space than available so you can scroll.
          </p>
        </section>
        <section class="as-box">
          <h1 class="as-title">A box</h1>
          <p class="as-body">
            This content is here to fill up more space than available so you can scroll.
          </p>
        </section>
      </div>
    </aside>
  </div>
</div>
```

#### .as-container

##### .as-container--scrollable

##### .as-container--border

#### .as-box