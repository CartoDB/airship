Toggle component explanation here.

```react
<Toggle htmlFor="one">
  <Text>Active</Text>
</Toggle>
```

### Props

#### **htmlFor** (string, required)

This property sets the node ID for label and input:

```react
<Toggle htmlFor="two" />
```

#### **checked** (boolean)

Using this prop you can set the initial state as checked:

```react
<Toggle htmlFor="three" checked />
```

#### **disabled** (boolean)

Using this prop you can disable the toggle:

```react
<Toggle htmlFor="four" disabled />
```

#### **onChange** (function)

Callback to be called when the toggle changes its state:

```react
<Toggle htmlFor="five" checked onChange={state => console.log(state)} />
```
