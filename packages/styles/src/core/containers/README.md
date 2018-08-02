## CONTAINERS

Containers are positioning elements for content. Put them inside the layout elements to get your content good-looking.

### Containers within a sidebar

To add content to a sidebar, add an element with the class `as-container`. If no other modifier is added to the container, it will behave as a fixed container, occupying as much space as needed, always in the same position.

There are some modifiers that, when added to the `as-container` element will change its behaviour:
- `as-container--border`: adds a border at the bottom of the container.
- `as-container--scrollable`: ehen you need to present lots of content that don't fit in the available space, use a scrollable container. It'll take the space left by the fixed containers.

To add the actual content to a container, you need to add as much `as-box` elements as blocks of content you want to put inside the container. `as-box` containers add space to make your content shine with the correct spacing.

```html
noSource: true
responsive: [tablet, mobile]
---
<iframe src="/examples/containers/containers-sidebar.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<aside class="as-sidebar as-sidebar--right">
  <div class="as-container as-container--border">
    <section class="as-box">
      <h1 class="as-title">Fixed container</h1>
    </section>
  </div>
  <div class="as-container as-container--scrollable">
    <section class="as-box">
      <h1 class="as-title">Scrollable container</h1>
    </section>
    <section class="as-box">
      <h1 class="as-title">A box</h1>
    </section>
    <section class="as-box">
      <h1 class="as-box">A box</h1>
    </section>
  </div>
</aside>
```

### Containers within a bottom bar

Containers inside a bottom bar stack horizontally. They behave just like in the sidebar but they grow along the X axis.

The same behavious applies here. By default, they are fixed and you need to add modifiers if you want to modify them.

- `as-container--border`: adds a border at the bottom of the container.
- `as-container--scrollable`: ehen you need to present lots of content that don't fit in the available space, use a scrollable container. It'll take the space left by the fixed containers.

To add the actual content to a container, you need to add as much `as-box` elements as blocks of content you want to put inside the container. `as-box` containers add space to make your content shine with the correct spacing.

```html
noSource: true
responsive: [tablet, mobile]
---
<iframe src="/examples/containers/containers-bottom.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<aside class="as-bottom-bar">
  <div class="as-container as-container--horizontal as-container--border">
    <section class="as-box">
      <h1 class="as-title">Fixed container</h1>
    </section>
  </div>
  <div class="as-container as-container--scrollable">
    <section class="as-box">
      <h1 class="as-title">Scrollable container</h1>
    </section>
    <section class="as-box">
      <h1 class="as-title">A box</h1>
    </section>
  </div>
</aside>
```

### Containers within floating panels

To add content inside a floating panel, you only need to put your content inside `as-box` elements. No other container is needed.

```html
noSource: true
responsive: [tablet, mobile]
---
<iframe src="/examples/containers/containers-legends.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<div class="as-panels">
  <div class="as-panel as-panel--top as-panel--left">
    <div class="as-panel__element">
      <section class="as-box">
        <p class="as-title">LEGENDS</p>
        <p class="as-body">
          There are no special containers for legends. Just add an 'as-box' element to an 'as-panel__element'
        </p>
      </section>
      <section class="as-box">
        <p class="as-title">LEGEND 2</p>
      </section>
    </div>
  </div>
  <div class="as-panel as-panel--top as-panel--right as-panel--vertical">
    <div class="as-panel__element">
      <section class="as-box">
        <p class="as-title">LEGEND 3</p>
      </section>
    </div>
  </div>
</div>
```

### Background colors

There are three modifiers to change the background color of the containers:
- `as-container--primary`
- `as-container--secondary`
- `as-container--complimentary`

They work at `as-container` level.

```html
noSource: true
responsive: [tablet, mobile]
---
<iframe src="/examples/containers/containers-colors.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<div class="as-bottom-bar">
  <div class="as-container as-container--horizontal as-container--border as-container--primary" style="color: #FFF;">
    <section class="as-box">
      <h1 class="as-title">Primary</h1>
      <p class="as-body">Adding 'as-container--primary' will set the background to the primary color</p>
    </section>
  </div>
</div>
<aside class="as-sidebar as-sidebar--right">
  <div class="as-container as-container--border as-container--secondary" style="color: #FFF;">
    <section class="as-box">
      <h1 class="as-title">Secondary</h1>
      <p class="as-body">Adding 'as-container--secondary' will set the background to the secondary color</p>
    </section>
  </div>
  <div class="as-container as-container--border as-container--complimentary">
    <section class="as-box">
      <h1 class="as-title">Secondary</h1>
      <p class="as-body">Adding 'as-container--complimentary' will set the background to the complimentary color</p>
    </section>
  </div>
</aside>
```

### SUMMARY

**Containers (inside sidebar and bottom bar)**

`as-container`

Fixed content container.

Modifiers
- `as-container--border`: add a border to separate from the next container.
- `as-container--scrollable`: make its content scrollable.
- `as-container--primary`: applies primary color as background.
- `as-container--secondary`: applies secondary color as background.
- `as-container--complimentary`: applies complimentary color as background.

**Boxes (inside containers and floating panels)**

`as-box`

Applies correct spacing to its content.
