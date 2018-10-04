## Map Footer Containers

Containers are used to wrap your content. Put them inside the layout elements to get your content good-looking, with proper behaviour and spacing.

### Example

```html
showSource: true
---
<div class="as-app"  style="height: 400px; width:100%;">
  <div class="as-content">
    <main class="as-main as-bg--badge-blue">
      <div class="as-map-area">
        <div id="map"></div>
      </div>
      <div class="as-map-footer as-bg--support-02">
        <!-- as-container code starts here -->
        <div class="as-container">
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
            <h1 class="as-title">Another box</h1>
            <p class="as-body">
              This content is here to fill up more space.
            </p>
          </section>
        </div>
        <!-- as-container code ends here -->
      </div>
    </main>
  </div>
</div>
```

### .as-container

Use this class to create sections inside the footer.

To create a container:
- Create a `div` that is a direct child of a `as-map-footer` element.
- Add the `as-container` class.

```html
showSource: true
---
<div class="as-app"  style="height: 400px; width:100%;">
  <div class="as-content">
    <main class="as-main as-bg--badge-blue">
      <div class="as-map-area">
        <div id="map"></div>
      </div>
      <div class="as-map-footer as-bg--support-02">
        <!-- as-container code starts here -->
        <div class="as-container">
          <section class="as-box as-box--medium">
            <h1 class="as-title">Fixed container</h1>
            <p class="as-body">Use this container when you need to present fixed content.</p>
          </section>
        </div>
        <!-- as-container code ends here -->
      </div>
    </main>
  </div>
</div>
```

#### .as-container-\-scrollable

Add the `as-container--scrollable` modifier when you need to present lots of content that don't fit in the available space. A scrollable container will take the space left by the fixed containers.

To make a container scrollable add the `as-container--scrollable` to the element that already has the `as-container` class.

`<div class="as-container as-container--scrollable">`

```html
showSource: true
---
<div class="as-app"  style="height: 400px; width:100%;">
  <div class="as-content">
    <main class="as-main as-bg--badge-blue">
      <div class="as-map-area">
        <div id="map"></div>
      </div>
      <div class="as-map-footer as-bg--support-02">
        <div class="as-container">
          <section class="as-box as-box--medium">
            <h1 class="as-title">Fixed container</h1>
            <p class="as-body">Use this container when you need to present fixed content.</p>
          </section>
        </div>
        <!-- as-container as-container--scrollable code starts here -->
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
            <h1 class="as-title">Another box</h1>
            <p class="as-body">
              This content is here to fill up more space.
            </p>
          </section>
        </div>
        <!-- as-container as-container--scrollable code ends here -->
      </div>
    </main>
  </div>
</div>
```

#### .as-container-\-border


Add the `.as-container–-border` modifier to add a separator on the right.

`div class="as-container as-container--border">`

```html
showSource: true
---
<div class="as-app"  style="height: 400px; width:100%;">
  <div class="as-content">
    <main class="as-main as-bg--badge-blue">
      <div class="as-map-area">
        <div id="map"></div>
      </div>
      <div class="as-map-footer as-bg--support-02">
        <!-- as-container as-container--border code starts here -->
        <div class="as-container as-container--border">
          <section class="as-box as-box--medium">
            <h1 class="as-title">Container with border</h1>
            <p class="as-body">Use this container when you need to present a container with a border.</p>
          </section>
        </div>
        <!-- as-container as-container--border code ends here -->
        <div class="as-container">
          <section class="as-box as-box--medium">
            <h1 class="as-title">Another container</h1>
          </section>
        </div>
      </div>
    </main>
  </div>
</div>
```

### .as-box

If you want to add content to the containers with a default margin, use the `as-box` class. The content will have our default margin to give a sense of space and cleanliness.

```code
lang:html
---
<div class="as-container">
  <section class="as-box"> <!-- as-box is a child of a as-container -->
    <p class="as-body">
      Use as-box to get a correct spacing of containers content.
    </p>
  </section>
  <section class="as-box as-box--medium"> <!-- as-box--medium set a max with to the box -->
    <p class="as-body">
      Use as-box to get a correct spacing of containers content.
    </p>
  </section>
</div>
```

There are modifiers to control the `as-box` width within the map footer. Add them to the desired `as-box` element.

- `as-box--small`: max width of 128px;
- `as-box--medium`: max width of 256px;
- `as-box--large`: max width of 320px;
- `as-box--xlarge`: max width of 400px;

In case our default spacing doesn't suit your needs, you can use our [spacing utilities](/styles/utilities).
