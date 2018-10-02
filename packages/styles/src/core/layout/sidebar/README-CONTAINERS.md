## Sidebar Containers

```html
showSource: true
---
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
      </div>
    </aside>
  </div>
</div>
```

### .as-container

Use this class to create sections inside the sidebar. By default a container will occupy as much vertical space as needed.

```html
showSource: true
---
<div class="as-app"  style="height: 400px; width:100%;">
  <div class="as-content">
    <main class="as-main as-bg--badge-blue">
      <!-- Put your map here -->
    </main>
    <aside class="as-sidebar as-sidebar--right as-bg--support-02">
      <div class="as-container">
        <section class="as-box">
          <h1 class="as-title">Container 0</h1>
          <p class="as-body">
            Use this container when you need to present fixed content. This content will occupy as
            much vertical space as needed.
          </p>
        </section>
      </div>
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
    </aside>
  </div>
</div>
```

#### .as-container--scrollable

The `scrollable container` will take the space left by the fixed containers. Use this modifier to when you need to present lots of content that don't fit in the available space.


```html
showSource: true
---
<div class="as-app"  style="height: 400px; width:100%;">
  <div class="as-content">
    <main class="as-main as-bg--badge-blue">
      <!-- Put your map here -->
    </main>
    <aside class="as-sidebar as-sidebar--right as-bg--support-02">
      <div class="as-container">
        <section class="as-box">
          <h1 class="as-title">Container 0</h1>
          <p class="as-body">
            Use this container when you need to present fixed content. This content will occupy as
            much vertical space as needed.
          </p>
        </section>
      </div>
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
    </aside>
  </div>
</div>
```

#### .as-container--border

Use this modifier to create containers with a border separator on the bottom.

```html
showSource: true
---
<div class="as-app"  style="height: 400px; width:100%;">
  <div class="as-content">
    <main class="as-main as-bg--badge-blue">
      <!-- Put your map here -->
    </main>
    <aside class="as-sidebar as-sidebar--right as-bg--support-02">
      <div class="as-container as-container--border">
        <section class="as-box">
          <h1 class="as-title">Border container 0</h1>
          <p class="as-body">
            Use this container when you need to present fixed content. This content will occupy as
            much vertical space as needed.
          </p>
        </section>
      </div>
      <div class="as-container as-container--border">
        <section class="as-box">
          <h1 class="as-title">Border container 1</h1>
          <p class="as-body">
            Use this container when you need to present fixed content. This content will occupy as
            much vertical space as needed.
          </p>
        </section>
      </div>
      <div class="as-container as-container--border">
        <section class="as-box">
          <h1 class="as-title">Border container 2</h1>
          <p class="as-body">
            Use this container when you need to present fixed content. This content will occupy as
            much vertical space as needed.
          </p>
        </section>
      </div>
    </aside>
  </div>
</div>
```

### .as-box

Use this class to group the children of the containers.
