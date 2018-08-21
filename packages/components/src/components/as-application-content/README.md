# as-application-content

This component manages the layout of the application. It searches for our layout elements and manages for you the responsiveness behaviour, creating the correspondant panels. See `Layout` section for more information on our layout elements.

## How to use it

Add a `<as-application-content>` element as a wrapper for the application sections.

The component searches for these classes in order to know how many tabs it must render:
- `as-map-wrapper`.
- `as-sidebar`.
- `as-panels`.
- `as-bottom-bar`.

As long as you follow the proper markup, as the `Layout` section shows, you won't have to worry about anything else.

### Setting the tab names

In order to set the tabs text, you need to add a data attribute with the desired name:

`<aside class="as-sidebar as-sidebar--left" data-name="Stores">`

`<div class="as-panels" data-name="Legends">`

`<aside class="as-sidebar as-sidebar--right" data-name="Containers">`

You can change that data attribute programatically if you need to update the responsive tab name.

### Example

```html
noSource: true
responsive: true
---
<iframe src="/examples/components/as-application-content/simple.html" style="width: 100%; height: 100%;">
```

```code
lang: html
showSource: false
---
<as-application-content>
  <aside class="as-sidebar as-sidebar--left" data-name="Stores">
    LEFT-SIDEBAR
  </aside>

  <div class="as-map-wrapper">
    <div class="as-map">
      <div id="map"></div>
      <div class="as-panels" data-name="Legends">
        <div class="as-panel as-panel--top as-panel--right">
          <div class="as-panel__element">
            <p>Title</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore possimus nam quam necessitatibus omnis, est sequi rem
              quibusdam molestiae, at saepe odit voluptatem quae debitis consequatur iste ducimus quaerat dolorum.
            </p>
          </div>
          <div class="as-panel__element"> PANEL 1 </div>
        </div>

        <div class="as-panel as-panel--middle as-panel--right as-panel--vertical">
          <div class="as-panel__element">
            <p>Title</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore possimus nam quam necessitatibus omnis, est sequi rem
              quibusdam molestiae, at saepe odit voluptatem quae debitis consequatur iste ducimus quaerat dolorum.
            </p>
          </div>
          <div class="as-panel__element"> PANEL 1 </div>
        </div>
      </div>
    </div>

    <div class="as-bottom-bar">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo delectus ullam laudantium necessitatibus pariatur repellendus
      nemo ipsam minus. Delectus quidem sequi recusandae culpa deleniti molestias amet consequatur aspernatur eos exercitationem.
    </div>
  </div>

  <aside class="as-sidebar as-sidebar--right" data-name="Containers">
    RIGHT-SIDEBAR
  </aside>
</as-application-content>
```

### Changing the tab order

If you want to change the tabs order, you can add a data attribute to tell the component their positions.

Let's put `Legends` in the first position, `Stores` in the second and `Containers` in third place.

```code
lang: html
showSource: false
---
<div class="as-map-wrapper" data-tab-order="0">

<div class="as-panels" data-name="Legends" data-tab-order="1">

<aside class="as-sidebar as-sidebar--left" data-name="Stores" data-tab-order="2">

<aside class="as-sidebar as-sidebar--right" data-name="Containers" data-tab-order="3">
```

We recommend setting the map always at the position `0`.

```html
noSource: true
responsive: true
---
<iframe src="/examples/components/as-application-content/custom-order.html" style="width: 100%; height: 100%;">
```

## Events

### **load**

This event fires when the component has finished loading. Useful to load Leaflet with the proper content width and height.

```code
lang: javascript
showSource: false
---
const applicationContent = document.querySelector('as-application-content');
applicationContent.addEventListener('load', () => {});
```

### **sectionChanged**

This event fires when the content section is changed via clicking a tab or via the programmatic method.

```code
lang: javascript
showSource: false
---
const applicationContent = document.querySelector('as-application-content');
applicationContent.addEventListener('sectionChanged', (section) => { console.log(section); });
```

## Methods

### **getSections()**

This method return a list of the sections discovered throughout the content with some interesting properties, such as:

```code
lang: typescript
showSource: false
---
interface ApplicationSection {
  active?: boolean;
  activeAction?: (section: ApplicationSection) => {};
  activeClass?: string;
  disableAction?: (section: ApplicationSection) => {};
  element: HTMLElement;
  name: string;
  type: string;
  tabOrder: number;
}
```

### **setVisible(sectionName)**

This method changes visible content section by introducing the section name like:

```code
lang: javascript
showSource: false
---
const applicationContent = document.querySelector('as-application-content');
aplicationContent.setVisible('Histogram');
```
