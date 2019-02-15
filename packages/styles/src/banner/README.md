# Banner

## Default

```html
showSource: true
---
<div class="as-banner">
  <div class="as-banner__icon">
    <i class="as-icon-info"></i>
  </div>
  <div class="as-banner__content">This is the default banner without any support colors</div>
</div>
```

## For notifications

```html
showSource: true
---
<div class="as-banner as-banner--success">
  <div class="as-banner__icon">
    <i class="as-icon-tick-circle-fill"></i>
  </div>
  <div class="as-banner__content">Your profile settings have been updated successfully</div>
</div>
```

## For warnings

```html
showSource: true
---
<div class="as-banner as-bg--warning as-color--type-04">
  <div class="as-banner__icon">
    <i class="as-icon-alert-fill"></i>
  </div>
  <div class="as-banner__content">It seems like you're over platforms limits, please contact us or upgrade your account plan</div>
</div>
```

## For errors

```html
showSource: true
---
<div class="as-banner as-bg--error as-color--type-04">
  <div class="as-banner__icon">
    <i class="as-icon-alert-fill"></i>
  </div>
  <div class="as-banner__content">An error has ocurred. Could not retreive customer information</div>
</div>
```

## CSS Variables

### Default

```
.as-banner {
  --as--banner--background-color
  --as--banner--color
}
```

### For notifications

```
.as-banner--success {
  --as--banner--background-color
  --as--banner--color
}
```
### For warnings

```
.as-banner--warning {
  --as--banner--background-color
  --as--banner--color
}
```

### For errors

```
.as-banner--error {
  --as--banner--background-color
  --as--banner--color
}
```
