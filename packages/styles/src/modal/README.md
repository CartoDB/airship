A modal is composed by two elements:

- `as-modal` Used as a wrapper to place the modal content.
- `as-modal__content` Where the real content will be placed.

Since the modal has absolute positioning should be placed under the `body` tag or under a `relative` container.

```html
<main style="position: relative; display: block; height: 300px;">
  <div class="as-modal">
    <div class="as-modal__content">
      <h1 class="as-title">Data import and management</h1>
      <br>
      <button class="as-btn as-btn--secondary"> Use existing data</button>
      <button class="as-btn as-btn--primary"> Upload new data</button>
    </div>
  </div>
</main>
```
