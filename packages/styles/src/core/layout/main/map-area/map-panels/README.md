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
