This guide will lead you through the process of integrating Airship in [Angular](https://angular.io).

## Including Styles
Airship styles need to be globally included within our Vue application, so that we can use styles everywhere instead of including them inside any component scope. We are going to import them in `main.js` via npm.

```
npm i @carto/airship-style
```

To import the styles, we need to include `airship.css` in the file:
```js
import '@carto/airship-style/dist/airship.css';
```

## Integrating Web Components
First, we need to tell Vue to ignore elements starting with `as-`, which are our Airship components. We don't want Vue to raise an error everytime an Airship component is included in a template.

```js
import Vue from 'vue';

Vue.config.ignoredElements = [/as-\w+/];
```

Second, we need to import and define our Airship components. As we did before with Airship styles, we import them from npm, and then we need to execute `defineCustomElements` function.

```js
import { defineCustomElements } from '@carto/airship-components';
defineCustomElements(window);
```

### Using Web Components in templates
To add a Web Component to a Vue template you just need to use the HTML syntax that is provided in the reference.

Although Web Components are supported in Vue, there's one caveat when it comes to injecting data into the component. The only properties that can be passed via attributes are text and number properties, whether via direct text or injecting the property in the template.

```html
<as-category-widget
  heading="Business Volume"
  description={widgetDescription}>
</as-category-widget>
```

To pass complex properties such as Objects and Arrays or listen to component events, you need to do it via Vue element reference or create a mirror component.

#### Managing component with element reference
There are some properties that we cannot pass or events that we cannot listen to in the example above, such as category property or categoriesSelected event.

To get element reference, we need to set `ref` property in the component template node.

```html
<template>
  <as-category-widget
    ref="categoryWidget"
    heading="Business Volume"
    description={widgetDescription}>
  </as-category-widget>
</template>
```

We will find the element's reference in `refs` property in our component scope by doing that, hence will have full access to our component.

##### Listening to component events
The best way to listen to component events is in `mounted` function in your desired component.

```js
export default {
  name: 'MyComponent',
  mounted: function () {
    this.categoryWidget = this.$refs.categoryWidget;

    this.categoryWidget.addEventListener('categoriesSelected', (event) => {
      console.log('Selected Categories', event.detail);
    });
  }
}
```

We create an easy-to-use reference to the widget so that we can reutilize it in other parts of our component. Then, we listen to `categoriesSelected` event where you can put your own custom code to perform the action that you want.

It will only listen once to component event and it won't create multiple unneeded event listeners by doing it in `mounted`callback`.

##### Passing complex properties to component
The way to pass complex properties to the component is very similar to listening to events.

To make the component react to property changes we need to create a watch over the property that holds our data. Once `watch` is ready, we need to set the new value of the property to the desired property in the component, like:

```js
export default {
  name: 'MyComponent',
  watch: {
    categories: function (newValue) {
      this.categoryWidget.categories = newValue;
    }
  }
}
```

##### Invoking component methods
To invoke a component method, we need to create a mirror method in our Vue component that executes the original method.

```js
export default {
  name: 'MyComponent',
  methods: {
    getSelectedCategories: function () {
      this.categoryWidget.getSelectedCategories();
    },
    clearSelection: function () {
      this.categoryWidget.clearSelection();
    }
  }
}
```

### Mirroring Web Components with Vue component
Mirroring one Airship Component with a Vue component is pretty much like doing the same things as above but encapsulated within a single component.

To mirror the Airship Component, we need to create a new Vue component like this:

```html
<template>
  <as-category-widget
    heading={heading}
    description={description}
    show-clear={showClear}
    defaultBarColor={defaultBarColor}>
  </as-category-widget>
</template>

<script>
  export default {
    name: 'CategoryWidget',
    properties: {
      heading: String,
      description: String,
      showClear: Boolean,
      defaultBarColor: String,
      categories: Object
    },
    mounted: function () {
      this.categoryWidget = this.$refs.categoryWidget;
      this.categoryWidget.categories = this.categories;

      this.categoryWidget.addEventListener('categoriesSelected', (event) => {
        console.log('Selected Categories', event.detail);
      });
    },
    methods: {
      getSelectedCategories: function () {
        this.categoryWidget.getSelectedCategories();
      },
      clearSelection: function () {
        this.categoryWidget.clearSelection();
      }
    },
    watch: {
      categories: function (newValue) {
        this.categoryWidget.categories = newValue;
      }
    }
  }
</script>
```
