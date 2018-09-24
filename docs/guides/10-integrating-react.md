This guide contains the basic fundamentals of how to integrate Airhship components with [React.js](https://reactjs.org/).

We are working on React bindings that offer a better developer experience in the future.

## Web components

A web component is just an HTML tag with some attributes that control its behaviour. Simply include the HTML tag, and edit its properties through attributes or through javascript as you would do with a normal HTML element.

To render a web component simply include its tag inside the REACT render function:


```jsx
render() {
  <as-infowindow src="https://thecatsite.com/styles/thecatsite/xenforo/sources/notice3.png"></as-infowindow>
}
```

In order to manage the state, either listening to events or synchronizing the attributes we got two options.

## Option 1: Manage component logic in the parent layer.

The simplest dirty-hack is to update all attributes, and re-render everything. Even so,  [content attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#Content_versus_IDL_attributes) only accept strings as parameters forcing to set the element properties from javascript.

```jsx
render() {
  // We can pass some properties as attributes
  <as-range-slider id="range" min-value={this.state.minValue} max-value={this.state.maxValue}></as-range-slider>
}

componentDidMount(){
  // But we need to use javascript to set callbacks
  const rangeSlider = document.querySelector('#range');
  rangeSlider.addEventListener('change', this.onRangeChange.bind(this));
}

onRangeChange(event){
  console.log(event.detail);
}
```


## Option 2: Wrap the component into a react element

With this option we are going to create a React component that wraps the original web-component exposing a simple and react-friendly API.


> See the full example [here](https://github.com/CartoDB/airship-demos/tree/master/react/widget)


First we create a new [React Component]() to represent our widget, in this case a `category-widget`. In the `render` function we will return
the Airship category widget referenced using a [ref](https://reactjs.org/docs/refs-and-the-dom.html).


```js
export default class App extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    <as-category-widget ref={this.ref} heading={this.props.heading} description={this.props.description}/>
  }
}
```

Then we will list all available properties using [React proptypes](https://reactjs.org/docs/typechecking-with-proptypes.html), this tells react
which attributes to accept.

```js
export default class App extends Component {
   static defaultProps = {
    categories: [],
    showHeader: true,
    showClearButton: true,
    useTotalPercentage: false,
    visibleCategories: Infinity,
  }
}
```

Then we set up all the bindings in the `componentDidMount` function binding every React property to the corresponding in the web component. We also associate the events, adding a native listener that connects to `_onSelectedChanged` function.

onSelectedChanged is a funcion pased to the component as an attribute and will be called everytime the web components fires an `categoriesSelected` event.

```js
export default class App extends Component {
  componentDidMount() {
    const widget = ref.current;

    widget.showHeader = this.props.showHeader;
    widget.showClearButton = this.props.showClearButton;
    widget.useTotalPercentage = this.props.useTotalPercentage;
    widget.visibleCategories = this.props.visibleCategories;
    widget.categories = this.props.categories;
    widget.addEventListener('categoriesSelected', this._onSelectedChanged.bind(this));
  }

  _onSelectedChanged(event) {
    const { onSelectedChanged } = this.props;
    onSelectedChanged && onSelectedChanged(event);
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