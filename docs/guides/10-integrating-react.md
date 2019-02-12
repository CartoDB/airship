## Integration guide: Using Airship with React

This guide will lead you through the process of integrating Airship in [React.js](https://reactjs.org/).

>  We are working on React bindings that offer a better developer experience in the future.

### Including Styles

Install `airship-style` package and

 ```
npm i @carto/airship-style
```

Load the styles into your code

```css
@import '@carto/airship-style/dist/airship.css';
```

### Web components

A web component is just an HTML tag with some attributes that control its behaviour. Simply include the HTML tag, and edit its properties through attributes or through javascript as you would do with a normal HTML element.

To render a web component simply include its tag inside the REACT render function:


```jsx
render() {
  <as-infowindow src="https://thecatsite.com/styles/thecatsite/xenforo/sources/notice3.png"></as-infowindow>
}
```


#### Loading web components

Install `airship-components` package

```
npm i @carto/airship-components
```

In the entry point of your application call `defineCustomElements` passing `window` as a parameter. Once you do this, all Airship components will be available.

```js
import { defineCustomElements } from '@carto/airship-components/dist/loader';

defineCustomElements(window);
```

In order to manage the state, either listening to events or synchronizing the attributes we got two options.

#### Option 1: Manage component logic in the parent layer.

The simplest way to link Airship and React is to manually bind attributes and events. [Content attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#Content_versus_IDL_attributes) only accept strings as parameters so we need to
use javascript to add event listeners and pass complex objects as parameter.


In the **render** function you can bind `string`, `number`and `boolean` values as simple HTML attributes. Just as you do with a normal HTML tag.

In the **componentDidMount** you can setup event listeners and bind attributes that are `arrays` or `objects`. Those types cannot be passed as simple HTML attributes so you need to hook them up here.

Use **componentDidUpdate** to update the bind properties values.

```jsx
export default class App extends Component {
  constructor(props) {
    super(props);
    this.categoryWidget = React.createRef();
    this.state = {
      heading: 'Widget Heading',
      description: 'Widget description',
      visibleCategories: 10,
      categories: [
        { name: 'Bars & Restaurants', value: 1000, color: '#FABADA' },
        { name: 'Fashion', value: 900 },
        { name: 'Grocery', value: 800 },
        { name: 'Health', value: 400 },
        { name: 'Shopping mall', value: 250 },
        { name: 'Transportation', value: 1000 },
        { name: 'Leisure', value: 760 }
      ]
    }
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.clearSelection.bind(this)}>Clear selection</button>
        <button onClick={() => this.setState({ categories: [{ name: 'Cat 0', value: 100 }, { name: 'Cat 1', value: 90 }] })}>More Categories</button>
        <button onClick={() => this.setState({ visibleCategories: this.state.visibleCategories + 1 })}>More Categories</button>
        <button onClick={() => this.setState({ visibleCategories: this.state.visibleCategories - 1 })}>Less Categories</button>
        <as-category-widget ref={this.categoryWidget} visible-categories={this.state.visibleCategories} heading={this.state.heading} description={this.state.description} />
      </React.Fragment>
    );
  }

  /**
   * Use this method to set element properties and callbacks
   */
  componentDidMount() {
    this.categoryWidget.current.categories = this.state.categories;
    this.categoryWidget.current.addEventListener('categoriesSelected', event => {
      console.log('Categories Selected', event.detail)
    });
  }

  /**
   * Use this method to set element properties only.
   */
  componentDidUpdate() {
    this.categoryWidget.current.categories = this.state.categories;
  }

  /**
   * Delegate function calls
   */
  async clearSelection() {
    await this.categoryWidget.current.clearSelection();
  }
}
```


#### Option 2: Wrap the component into a react element

With this option we are going to create a React component that wraps the original web-component exposing a simple and react-friendly API.


> See the full example [here](https://github.com/CartoDB/airship-demos/tree/master/react/widget)


First we create a new [React Component](https://reactjs.org/docs/react-component.html) to represent our widget, in this case a `category-widget`. In the `render` function we will return
the Airship category widget referenced using a [ref](https://reactjs.org/docs/refs-and-the-dom.html).


```js
export default class CategoryWidget extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    <as-category-widget
      ref={this.ref}
      heading={this.props.heading}
      description={this.props.description}
      show-header={this.props.showHeader}
      show-clear-button={this.props.showClearButton}
      use-total-percentage={this.props.useTotalPercentage}
      visible-categories={this.prop.visibleCategories}
    />
  }
}
```

Then we will list all available properties using [React proptypes](https://reactjs.org/docs/typechecking-with-proptypes.html), this tells react
which attributes to accept.

```js
export default class CategoryWidget extends Component {
   static defaultProps = {
    categories: [],
    showHeader: true,
    showClearButton: true,
    useTotalPercentage: false,
    visibleCategories: Infinity,
    heading: '',
    description: '',
  }
}
```

Then we set up all the bindings in the `componentDidMount` function binding every React property to the corresponding in the web component. We also associate the events, adding a native listener that connects to `_onSelectedChanged` function.

onSelectedChanged is a funcion pased to the component as an attribute and will be called everytime the web components fires an `categoriesSelected` event.

```js
export default class CategoryWidget extends Component {
  componentDidMount() {
    const widget = ref.current;

    // Bind complex objects and event listeners
    widget.categories = this.props.categories;
    widget.addEventListener('categoriesSelected', this._onSelectedChanged.bind(this));
  }

  _onSelectedChanged(event) {
    const { onSelectedChanged } = this.props;
    onSelectedChanged && onSelectedChanged(event);
  }

  /**
   * Delegate function calls
   */
  async clearSelection() {
    await this.ref.current.clearSelection();
  }
}
```

With this steps we created a React wrapper over the native element that allows to pass everything as an attribute

```js
 <CategoryWidget
  heading="Business Volume"
  description="Description"
  categories={categories}
  onSelectedChanged={this.onSelectedChanged}
  showClearButton={this.showClearButton}
```
