Toggle component explanation here.

```react
<Toggle htmlFor="foone" />
```

### Props

#### **htmlFor** (string, required)

This property sets the node ID for label and input:

```react
<Toggle htmlFor="fotwo" />
```

#### **checked** (bolean)

Using this prop you can set the initial state as checked:

```react
<Toggle htmlFor="fothree" checked />
```

#### **onChange** (function)

Callback to be called when the toggle changes its state:

```react
<Toggle htmlFor="fofour" checked onChange={state => console.log(state)} />
```
