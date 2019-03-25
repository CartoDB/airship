# Badges

Badges are useful for creating labels and tags. They are commonly used also for notifications.

## Default

```html
showSource: true
---
<span class="as-badge"> Basic badge</span>
```

## Colors

### Background Colors

If you need to change **any** element background color, you can use the following clases.

- `as-bg--primary`
- `as-bg--secondary`
- `as-bg--complementary`
- `as-bg--ui-01`
- `as-bg--ui-02`
- `as-bg--ui-03`
- `as-bg--ui-04`
- `as-bg--gray`
- `as-bg--blue`
- `as-bg--pink`
- `as-bg--green`
- `as-bg--yellow`
- `as-bg--warning`
- `as-bg--error`
- `as-bg--success`

You need to to change the badge color. There are five **specific** color for badges:

- `as-bg--badge-gray`
- `as-bg--badge-blue`
- `as-bg--badge-pink`
- `as-bg--badge-green`
- `as-bg--badge-yellow`

As you can see in the list of color classes, you can also use any other background utility class, like `as-bg--warning`.

```html
showSource: true
---
<span class="as-badge as-bg--badge-gray"> Gray badge</span>
<span class="as-badge as-bg--badge-blue"> Blue badge</span>
<span class="as-badge as-bg--badge-pink"> Pink badge</span>
<span class="as-badge as-bg--badge-green"> Green badge</span>
<span class="as-badge as-bg--badge-yellow"> Yellow badge</span>
<span class="as-badge as-bg--warning">Warning badge</span>
<span class="as-badge as-bg--complementary">Complementary badge</span>
```

If you need contrast between the badge background color and the text color, use a type utility class to use a specific color.

```html
showSource: true
---
<span class="as-badge as-bg--success as-color--type-04">Success badge</span>
<span class="as-badge as-bg--error as-color--type-04">Error badge</span>
<span class="as-badge as-bg--primary as-color--type-04">Primary badge</span>
<span class="as-badge as-bg--secondary as-color--type-04">Secondary badge</span>
```

If you need a broader selection of background colors for your badges, you can add your own utility classes to augment our palette. For instance, imagine you want to add a magenta badge. Add your utility class to your own CSS file.

```
.as-bg--badge-magenta {
  background-color: #C05591;
}
```

Then, use that class as you do with the ones that come with Airship.

```html
showSource: true
---
<style>
  .as-bg--badge-magenta {
    background-color: #C05591;
  }
</style>

<span class="as-badge as-bg--badge-magenta as-color--type-04">Badge with a custom background color</span>
```

## Icons

Badges can be also used along with icons:
- Add the icon markup within the badge content.
- Enclose the text content into a `p` tag.

```html
showSource: true
---
<span class="as-badge as-bg--warning as-color--type-04"><i class="as-icon as-icon-alert"></i><p>Warning</p></span>
<span class="as-badge as-bg--success as-color--type-04"><p>Everything OK</p><i class="as-icon as-icon-info"></i></span>
```

## Customization

Badge colors can be modified via CSS variables. There are five specific background color for badges.

- `--as--color--badge-gray`
- `--as--color--badge-green`
- `--as--color--badge-blue`
- `--as--color--badge-pink`
- `--as--color--badge-yellow`

The default color is `blue`, but this can be modified through this variable:

- `--as--color--badge-default`

They can be modified globally:

```
document.documentElement.style.setProperty('--as--color--badge-green', '#C3DA8C')
```
