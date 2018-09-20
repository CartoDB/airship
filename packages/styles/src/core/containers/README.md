## CONTAINERS

### .as-box

```html
<div class="as-app" style="height:400px; width:100%;">
  <div class="as-content">
    <main class="as-main">
      <div class="as-map-area as-bg--badge-blue">
        <div id="map"></div>
        <div class="as-map-panels">
          <div class="as-panel as-panel--top as-panel--right">
            <div class="as-panel__element as-p--32 as-bg--support-02">
              <p class="as-body as-box">Panel</p>
            </div>
            <div class="as-panel__element as-p--32 as-bg--support-03">
              <p class="as-body as-box">Panel</p>
            </div>
          </div>
        </div>
      </div>
      <footer class="as-footer"></footer>
    </main>
    <aside class="as-sidebar as-sidebar--right as-bg--support-02">
      <p class="as-body as-box">Sidebar</p>
    </aside>
  </div>
</div>
```


#### .as-box--small

```html
<main class="as-main" style="height:400px; width:100%;">
  <div class="as-map-area as-bg--badge-blue">
    <div id="map"></div>
    <div class="as-map-panels">
      <div class="as-panel as-panel--top as-panel--right">
        <div class="as-panel__element as-p--32 as-bg--support-02">
          <p class="as-body as-box as-box--small">small panel</p>
        </div>
      </div>
    </div>
  </div>
  <footer class="as-footer"></footer>
</main> 
```

#### .as-box--medium

```html
<main class="as-main" style="height:400px; width:100%;">
  <div class="as-map-area as-bg--badge-blue">
    <div id="map"></div>
    <div class="as-map-panels">
      <div class="as-panel as-panel--top as-panel--right">
        <div class="as-panel__element as-p--32 as-bg--support-02">
          <p class="as-body as-box as-box--medium">small panel</p>
        </div>
      </div>
    </div>
  </div>
  <footer class="as-footer"></footer>
</main> 
```

#### .as-box--large

```html
<main class="as-main" style="height:400px; width:100%;">
  <div class="as-map-area as-bg--badge-blue">
    <div id="map"></div>
    <div class="as-map-panels">
      <div class="as-panel as-panel--top as-panel--right">
        <div class="as-panel__element as-p--32 as-bg--support-02">
          <p class="as-body as-box as-box--large">large panel</p>
        </div>
      </div>
    </div>
  </div>
  <footer class="as-footer"></footer>
</main> 
```

#### .as-box--xlarge

```html
<main class="as-main" style="height:400px; width:100%;">
  <div class="as-map-area as-bg--badge-blue">
    <div id="map"></div>
    <div class="as-map-panels">
      <div class="as-panel as-panel--top as-panel--right">
        <div class="as-panel__element as-p--32 as-bg--support-02">
          <p class="as-body as-box as-box--xlarge">xlarge panel</p>
        </div>
      </div>
    </div>
  </div>
  <footer class="as-footer"></footer>
</main> 
```



### .as-container

#### .as-container--scrollable

#### .as-container--border







Containers are positioning elements for content. Put them inside the layout elements to get your content good-looking.

### Containers within a sidebar

To add content to a sidebar, add an element with the class `as-container`. If no other modifier is added to the container, it will behave as a fixed container, occupying as much space as needed, always in the same position.

There are some modifiers that, when added to the `as-container` element will change its behaviour:
- `as-container--border`: adds a border at the bottom of the container.
- `as-container--scrollable`: when you need to present lots of content that don't fit in the available space, use a scrollable container. It'll take the space left by the fixed containers.

To add the actual content to a container, you need to add as much `as-box` elements as blocks of content you want to put inside the container. `as-box` containers add space to make your content shine with the correct spacing.

```html
noSource: true
responsive: [tablet, mobile]
---
<iframe src="/examples/containers/containers-sidebar.html" style="width: 100%; height: 100%;">
```

### Containers within a bottom bar

Containers inside a bottom bar stack horizontally. They behave just like in the sidebar but they grow along the X axis.

The same behavious applies here. By default, they are fixed and you need to add modifiers if you want to modify them.

- `as-container--border`: adds a border at the bottom of the container.
- `as-container--scrollable`: ehen you need to present lots of content that don't fit in the available space, use a scrollable container. It'll take the space left by the fixed containers.

To add the actual content to a container, you need to add as much `as-box` elements as blocks of content you want to put inside the container. `as-box` containers add space to make your content shine with the correct spacing.

In the bottom bar, depending on the box content, we run can in very wide boxes. That's why there are modifiers of `as-box` that set the maximum width of the element. This modifiers only are applied within a `as-bottom-bar`:
- `as-box--small`: max width of 128px;
- `as-box--medium`: max width of 256px;
- `as-box--large`: max width of 320px;
- `as-box--xlarge`: max width of 400px;

```html
noSource: true
responsive: [tablet, mobile]
---
<iframe src="/examples/containers/containers-bottom.html" style="width: 100%; height: 100%;">
```

### Background colors

To change the background of the container you can use the [background color utilities](/catalog/#/styles/utilities?a=background-color)

```html
noSource: true
responsive: [tablet, mobile]
---
<iframe src="/examples/containers/containers-colors.html" style="width: 100%; height: 100%;">
```

### SUMMARY

**Containers (inside sidebar and bottom bar)**

`as-container`

Fixed content container.

Modifiers
- `as-container--border`: add a border to separate from the next container.
- `as-container--scrollable`: make its content scrollable.

**Boxes (inside containers and floating panels)**

`as-box`

Applies correct spacing to its content.

Modifiers (only applied inside `as-bottom-bar`)
- `as-box--small`: max width of 128px;
- `as-box--medium`: max width of 256px;
- `as-box--large`: max width of 320px;
- `as-box--xlarge`: max width of 400px;
