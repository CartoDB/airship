## Icons

Airship comes with a [pack of icons](https://cartodb.github.io/airship/packages/icons/examples/) that can be used in any type of web application.

All icons are on [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) format which means that they will always have the best quality regardless of the size of the icon or the resolution of the screen.

### Usage from CDN
You can use the icons directly from our CDN in an img tag.

```html
<img src="https://libs.cartocdn.com/airship-icons/<VERSION>/icons/twitter.svg" alt="Twitter logo">
```

> You can check the full list of icons [in the GitHub repo](https://github.com/CartoDB/airship/tree/<VERSION>/packages/icons/dist/icons)

### Usage as web font

You can put icons on your app as a web font.

First, you need to include our `icons.css` file in the head of your app.

```html
<head>
  <!-- Include Icons -->
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-icons/<VERSION>/icons.css">
</head>

Then you can use the icons inside an `i` tag by adding the `as-icon-` class followed by the icon name you want to use.

```html
<i class="as-icon-twitter"></i>
```

This method allows styling easily through CSS

```html
<!-- Change color and icon size -->
<i style="color:red; font-size: 20px;" class="as-icon-twitter"></i>
```


Icons can be used inside elements, like a button.


```html
 <button class="as-btn as-btn--primary">
  <i class="as-icon-plus"></i>
  <p>Icon button</p>
</button>
```