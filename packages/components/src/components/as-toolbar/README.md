# as-toolbar

Toolbar is a generic bar that can be used as a header to put your application logo and some options to navigate throughout your application. 

- A toolbar must be a direct child of the `as-app` element at the same level of `as-content`.


The `as-toolbar` component will collapse the `as-toolbar__actions` on small screen sizes showing a menu button on tle left instead.

```html
showSource: true
---
<!-- We force a 200px height to make the example work -->
<div class="as-app as-app-body" style="height: 200px;">
  <as-toolbar>
    <div href="#" class="as-toolbar__item">LOGO</div>
    <nav class="as-toolbar__actions">
      <ul>
        <li>
          <a href="#" class="as-toolbar__item">Link 1</a>
        </li>
        <li>
          <a href="#" class="as-toolbar__item">Link 2</a>
        </li>
      </ul>
    </nav>
  </as-toolbar>
</div>
```

The toolbar content can be the same as if we were using the toolbar css element.

```html
showSource: true
---
<as-toolbar>
  <div class="as-toolbar__item">
    <img src="/examples/layouts/common/logo-circle.svg" alt="Logo"/>
  </div>
  <a href="#" class="as-toolbar__item">Link</a>
  <p class="as-toolbar__item">Paragraph</p>
  <i class="as-toolbar__item as-icon as-icon-points"></i>
</as-toolbar>
```
