# Flag

Flag displays contextual information about events on the page.

## Default

```html
<div class="as-flag">
  <div class="as-flag__icon">
    <i style="color: #80B622;" class="as-alert-fill"></i>
  </div>
  <div class="as-flag__content">
    <div class="as-body as-font--type-01">You are now connected</div>
    <div class="as-body as-font--type-03">You have been added to the group “New Store on this region”</div>
  </div>
</div>
```

## With two icons

```html
<div class="as-flag">
  <div class="as-flag__icon">
    <i style="color: #80B622;" class="as-alert-fill"></i>
  </div>
  <div class="as-flag__content">
    <div class="as-body as-font--type-01">You are now connected</div>
    <div class="as-body as-font--type-03">You have been added to the group “New Store on this region”</div>
  </div>
  <div class="as-flag__icon">
    <button class="as-flag__button">
      <i style="color: #1785FB;" class="as-close"></i>
    </button>
  </div>
</div>
```

## With different sizes

You can use the `as-flag--l` modifier to get a flag with a `width` of `320px`.

```html
<div class="as-flag as-flag--l">
  <div class="as-flag__icon">
    <i style="color: #80B622;" class="as-alert-fill"></i>
  </div>
  <div class="as-flag__content">
    <div class="as-body as-font--type-01">You are now connected</div>
    <div class="as-body as-font--type-03">You have been added to the group “New Store on this region”</div>
  </div>
  <div class="as-flag__icon">
    <button class="as-flag__button">
      <i style="color: #1785FB;" class="as-close"></i>
    </button>
  </div>
</div>
```

You can use the `as-flag--xl` modifier to get a flag with a `width` of `400px`.

```html
<div class="as-flag as-flag--xl">
  <div class="as-flag__icon">
    <i style="color: #80B622;" class="as-alert-fill"></i>
  </div>
  <div class="as-flag__content">
    <div class="as-body as-font--type-01">You are now connected</div>
    <div class="as-body as-font--type-03">You have been added to the group “New Store on this region”</div>
  </div>
  <div class="as-flag__icon">
    <button class="as-flag__button">
      <i style="color: #1785FB;" class="as-close"></i>
    </button>
  </div>
</div>
```

You can use the `as-flag--l` modifier to get a flag with a `width` of `100%`.

```html
<div class="as-flag as-flag--block">
  <div class="as-flag__icon">
    <i style="color: #80B622;" class="as-alert-fill"></i>
  </div>
  <div class="as-flag__content">
    <div class="as-body as-font--type-01">You are now connected</div>
    <div class="as-body as-font--type-03">You have been added to the group “New Store on this region”</div>
  </div>
  <div class="as-flag__icon">
    <button class="as-flag__button">
      <i style="color: #1785FB;" class="as-close"></i>
    </button>
  </div>
</div>
```
