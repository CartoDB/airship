Use this component to show extra information about the data.

## Regular

```html
<as-infowindow>
  <h1 class="as-title">Cat</h1>
  <p>
    <span class="as-badge">mammal</span>
    <span class="as-badge as-bg--badge-pink">carnivorous</span>
  </p>
  <p class="as-body">
    The domestic cat is a small, typically furry, carnivorous mammal. They are often called house cats when kept as indoor pets or simply cats when there is no need to distinguish them from other felids and felines.
  </p>
</as-infowindow>
```

## With an image

```html
<as-infowindow src="http://on-desktop.com/wps/Animals___Cats_Black_Cat_Panther_043844_.jpg">
  <h1 class="as-title">Cat</h1>
  <p>
    <span class="as-badge">mammal</span>
    <span class="as-badge as-bg--badge-pink">carnivorous</span>
  </p>
  <p class="as-body">
    The domestic cat is a small, typically furry, carnivorous mammal. They are often called house cats when kept as indoor pets or simply cats when there is no need to distinguish them from other felids and felines.
  </p>
</as-infowindow>
```

## With only an image

```html
<as-infowindow src="http://on-desktop.com/wps/Animals___Cats_Black_Cat_Panther_043844_.jpg"></as-infowindow>
```

### CSS Variables

```
as-infowindow{
  --as--infowindow--color--background
  --as--infowindow--color--shadow
}
```

### Props

#### **src**: string
The url for the image shown at the top of the content.

#### **width**: string
Width of the content. This should be a valid CSS value.

```code
lang: html
---
<as-category-widget width="400px"></as-category-widget>
```
```code
lang: javascript
---
categoryWidget.width = '400px';
```

#### **height**: string
Height of the content. This should be a valid CSS value.

```code
lang: html
---
<as-category-widget height="200px"></as-category-widget>
```
```code
lang: javascript
---
categoryWidget.height = '200px';
```