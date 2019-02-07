## Sidebar Containers

Containers are used to wrap your content. Put them inside the layout elements to get your content good-looking, with proper behaviour and spacing.


### Example

```html
showSource: true
---
<div class="as-app"  style="height: 400px; width:100%;">
  <div class="as-content">
    <main class="as-main as-bg--blue">
      <!-- Put your map here -->
    </main>
    <aside class="as-sidebar as-sidebar--right as-bg--warning">
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
      </div>
    </aside>
  </div>
</div>
```

### .as-container

Use this class to create sections inside the sidebar. By default a container will occupy as much vertical space as needed and will remain fixed. 

To create a container:
- Create a `div` that is a direct child of a `as-sidebar` element.
- Add the `as-container` class.

```html
showSource: true
---
<div class="as-app"  style="height: 400px; width:100%;">
  <div class="as-content">
    <main class="as-main as-bg--blue">
      <!-- Put your map here -->
    </main>
    <aside class="as-sidebar as-sidebar--right as-bg--warning">
      <!-- as-container code starts here -->
      <div class="as-container">
        <section class="as-box">
          <h1 class="as-title">Container 0</h1>
          <p class="as-body">
            Use this container when you need to present fixed content. This content will occupy as
            much vertical space as needed.
          </p>
        </section>
      </div>
      <!-- as-container code ends here -->
      <!-- as-container code starts here -->
      <div class="as-container">
        <section class="as-box">
          <h1 class="as-title">Container 1</h1>
          <p class="as-body">
            Use this container when you need to present fixed content. This content will occupy as
            much vertical space as needed.
          </p>
        </section>
        <section class="as-box">
          <h1 class="as-title">Container 1</h1>
          <p class="as-body">
            Use this container when you need to present fixed content. This content will occupy as
            much vertical space as needed.
          </p>
        </section>
      </div>
      <!-- as-container code ends here -->
    </aside>
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
    <main class="as-main as-bg--blue">
      <!-- Put your map here -->
    </main>
    <aside class="as-sidebar as-sidebar--right as-bg--warning">
      <div class="as-container">
        <section class="as-box">
          <h1 class="as-title">Container 0</h1>
          <p class="as-body">
            Use this container when you need to present fixed content. This content will occupy as
            much vertical space as needed.
          </p>
        </section>
      </div>
      <!-- as-container--scrollable code starts here -->
      <div class="as-container as-container--scrollable">
        <section class="as-box">
          <h1 class="as-title">Scrollable Container 1</h1>
          <p class="as-body">
            Use this container when you need to present fixed content. This content will occupy as
            much vertical space as needed.
          </p>
        </section>
        <section class="as-box">
          <h1 class="as-title">Scrollable Container 1</h1>
          <p class="as-body">
            Use this container when you need to present fixed content. This content will occupy as
            much vertical space as needed.
          </p>
        </section>
      </div>
      <!-- as-container--scrollable code ends here -->
    </aside>
  </div>
</div>
```

## Container content

You can put whatever you want as a container child, but we recommend using `as-box` as a wrapper for your elements.

### .as-box

`.as-box` is an utility class that wraps your element setting the content nicely in the sidebar. It provices a default nice padding.

```html
showSource: true
---
<div class="as-app"  style="height: 400px; width:100%;">
  <div class="as-content">
    <main class="as-main as-bg--blue">
      <!-- Put your map here -->
    </main>
    <aside class="as-sidebar as-sidebar--right as-bg--badge-yellow">
      <div class="as-container">
        <section class="as-box"> <!-- as-box is a child of a as-container -->
          <p class="as-body">
            Use as-box to get a correct spacing of containers content.
          </p>
        </section>
      </div>
    </aside>
  </div>
</div>
```

In case our default spacing doesn't suit your needs, you can use our [spacing utilities](/styles/utilities).

#### .as-box--border

If you need to separate sections of content, you can add the modifier `as-box--border` to draw a border line under the box.

```html
showSource: true
---
<div class="as-app"  style="height: 400px; width:100%;">
  <div class="as-content">
    <main class="as-main as-bg--blue">
      <!-- Put your map here -->
    </main>
    <aside class="as-sidebar as-sidebar--right">
      <div class="as-container">
        <section class="as-box as-box--border"> <!-- as-box is a child of a as-container -->
          <p class="as-body">
            Use `as-box as-box--border` to get a border line under the box.
          </p>
        </section>
      </div>
    </aside>
  </div>
</div>
```
