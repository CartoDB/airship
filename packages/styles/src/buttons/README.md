There are 3 kinds of buttons described in Airship: `Base`, `Primary` and `Secondary`. 

Each button has two size modifiers:

- `.as-btn--s`: Makes the button small
- `.as-btn--l`: Makes the button large


## Base

```html
---
<button class="as-btn"> I'm a regular button</button>
```

```html
---
<button class="as-btn as-btn--s"> I'm a small button</button>
```

```html
---
<button class="as-btn as-btn--l"> I'm a large button</button>
```

## Primary

```html
---
<button class="as-btn as-btn--primary"> I'm a regular button</button>
```

```html
---
<button class="as-btn as-btn--primary as-btn--s"> I'm a small button</button>
```

```html
---
<button class="as-btn as-btn--primary as-btn--l"> I'm a large button</button>
```


## Secondary

```html
---
<button class="as-btn as-btn--secondary"> I'm a regular button</button>
```

```html
---
<button class="as-btn as-btn--secondary as-btn--s"> I'm a small button</button>
```

```html
---
<button class="as-btn as-btn--secondary as-btn--l"> I'm a large button</button>
```

## Disabled

```html
---
<button disabled class="as-btn"> I'm a disabled base button</button>
```

```html
---
<button disabled class="as-btn as-btn--primary"> I'm a disabled primary button</button>
```

```html
---
<button disabled class="as-btn as-btn--secondary"> I'm a disabled secondary button</button>
```


## HTMLElements

The `as-btn` class can be used on the following Html Elements:

- [button](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
- [input type="button"](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button)
- [link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)

```html
---
<h1 class="as-title">Link</h1>
<a href="˝#" class="as-btn"> Link button </a>
<a href="˝#" class="as-btn as-btn--primary "> Link button primary </a>
<a href="˝#" class="as-btn as-btn--secondary "> Link button secondary </a>
<h1 class="as-title">Input</h1>
<input type="button" value="Input button" class="as-btn"/>
<input type="button" value="Input button primary" class="as-btn as-btn--primary"/>
<input type="button" value="Input button secondary" class="as-btn as-btn--secondary"/>
```