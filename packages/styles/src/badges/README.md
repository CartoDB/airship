# Badges

Badges are useful for creating labels and tags. They are commonly used also for notifications

## Default

```html
<span class="as-badge"> Basic badge</span>
```

## Colors

You need to add a background color modifier to change the badge color. There are four specific color for badges:
- `as-bg--badge-gray`
- `as-bg--badge-blue`
- `as-bg--badge-pink`
- `as-bg--badge-green`

You can also use any other background class, like `as-bg--warning`.

```html
<span class="as-badge as-bg--badge-gray"> Gray badge</span>
<span class="as-badge as-bg--badge-blue"> Blue badge</span>
<span class="as-badge as-bg--badge-pink"> Pink badge</span>
<span class="as-badge as-bg--badge-green"> Green badge</span>
<span class="as-badge as-bg--warning">Warning badge</span>
<span class="as-badge as-bg--as-complementary">Complementary badge</span>
```

If you need contrast between the badge background color and the text color, use a type utility class to use a specific color.

```html
<span class="as-badge as-bg--success as-color--type-04">Success badge</span>
<span class="as-badge as-bg--error as-color--type-04">Error badge</span>
<span class="as-badge as-bg--primary as-color--type-04">Primary badge</span>
<span class="as-badge as-bg--secondary as-color--type-04">Secondary badge</span>
```

## Icons

Badges can be also used along with icons. Just add the icon markup within the badge content.

```html
<span class="as-badge as-bg--warning as-color--type-04"><i class="as-icon-alert"></i>Error</span>
```

## Customization

Badge colors can be modified via CSS variables. There are four specific background color for badges.

- `--as-color-badge-gray`
- `--as-color-badge-green`
- `--as-color-badge-blue`
- `--as-color-badge-pink`

They can be modified globally:

```
document.documentElement.style.setProperty('--as-color-badge-green', '#C3DA8C')
```
