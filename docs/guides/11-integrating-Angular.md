## Integration guide: Using Airship with Angular
This guide will lead you through the process of integrating Airship in [Angular](https://angular.io).

### Including Styles
We need to import styles in main `styles.css` file from npm package. Styles inside that file are meant to be global, hence we need to import Airship styles there so that CSS Variables are globally defined.

```
npm i @carto/airship-style
```

To import the styles, we need to include `airship.css` in the file:
```css
@import '~@carto/airship-style/dist/airship.css';
```

### Integrating Web Components
Web Components are natively supported in Angular, so the syntax resembles to the one in native components.

First, we need to import `CUSTOM_ELEMENTS_SCHEMA` in our main application module, or just in the modules that use Web Components if you prefer.

```ts
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```

As you can see, **CUSTOM_ELEMENTS_SCHEMA** property comes from `@angular/core` and is injected into `schemas` property in the module declaration. This schema will allow you to use custom elements in your Angular templates without raising any exceptions.

Second, we need to define Airship components in our Angular application by appending these two lines to `main.ts` file.

```ts
import { defineCustomElements } from '@carto/airship-components/dist/loader';


defineCustomElements(window);
```

#### Using Web Components in templates
To add a Web Component to any Angular template you just need to use the HTML syntax that is provided in the reference.

```html
<as-category-widget
  heading="Business Volume"
  description="{{ widgetDescription }}"
  [categories]="categories"
  (categoriesSelected)="onCategorySelected($event)"></as-category-widget>
```

##### Passing properties to component
You can pass all the properties and listen to all the events via HTML.

If the property is a number or a text that will be harcoded in the template, you will pass it as a regular HTML property.

```html
<as-category-widget heading="Business Volume"></as-category-widget>
```

Text and number properties coming from component's controller are passed as [HTML interpolated properties](https://angular.io/guide/template-syntax#interpolation----), like `heading` and `description` above.

```html
<as-category-widget description="{{ widgetDescription }}"></as-category-widget>
```

Complex properties, like arrays, objects, dates, and other class instances, should be passed as a [template expression](https://angular.io/guide/template-syntax#template-expressions).

```html
<as-category-widget [categories]="categories"></as-category-widget>
```

Event listeners are attached to the component in the same way as you would do with Angular components, using [one-way event binding from view](https://angular.io/guide/template-syntax#binding-syntax-an-overview).

```html
<as-category-widget (categoriesSelected)="onCategorySelected($event)"></as-category-widget>
```

#### Invoking component methods
Components have some methods to be called from outside the web component. To do that, you need to retrieve the elements' reference with `ViewChild` decorator.

```ts
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('categoryWidget') categoryWidget: ElementRef;

  async getSelectedCategories() {
    return await this.categoryWidget.nativeElement.getSelectedCategories();
  }

  clearWidgetSelection() {
    this.categoryWidget.nativeElement.clearSelection();
  }
}
```

```html
<as-category-widget
  #categoryWidget
  [categories]="categories"
  (categoriesSelected)="onCategorySelected($event)"></as-category-widget>
```

Please note the `#categoryWidget` element ID in the HTML node.
