A checkbox allows a user to select a value from a small set of options, often binary.

```react
<Checkbox />
```

### Props

#### **htmlFor** (string, required)

This property sets the node ID for label and input:

```react
<Checkbox htmlFor="htmlfor">Hello there</Checkbox>
```

#### **name** (string)

This property sets the node name for the input:

```react
<Checkbox htmlFor="name" name="checkbox-name" />
```

#### **checked** (boolean)

Using this prop you can set the initial state as checked:

```react
<Checkbox htmlFor="checked" checked>
  Checked
</Checkbox>
```

#### **disabled** (boolean)

Using this prop you can disable the checkbox:

```react
<Checkbox htmlFor="disabled" disabled>
  Disabled
</Checkbox>
```

#### **onChange** (function)

Callback to be called when the toggle changes its state:

```react
<Checkbox htmlFor="onchange" onChange={state => console.log(state)}>
  With event
</Checkbox>
```

#### **as** (strong)

Choose how is rendered the checkbox. You can choose from `div`, `li` or `span`:

```react
<Checkbox htmlFor="as" as='span'>
  As span
</Checkbox>
```
