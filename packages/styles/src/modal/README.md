A modal is composed by two elements:

- `as-modal` Used as a wrapper to place the modal content.
- `as-modal__content` Where the real content will be placed.

Since the modal has absolute positioning should be placed under the `body` tag or under a `relative` container.

```html
<main style="position: relative; display: block; height: 300px;">
  <div class="as-modal">
    <div class="as-modal__content">
      <h1 class="as-title">This is a modal</h1>
      <p class="as-body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam suscipit sequi provident maxime illum possimus debitis, at
        natus voluptatem praesentium itaque sunt commodi odio incidunt fugiat, cupiditate ipsum officiis eligendi?
      </p>
      <hr>
      <h2 class="as-subheader">I have padding</h2>
      <p class="as-body">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque voluptas vitae praesentium itaque corporis, soluta iure optio
        labore minus modi ab quibusdam accusamus delectus dolores rem impedit cupiditate tenetur illum?
      </p>
    </div>
  </div>
</main>
```
