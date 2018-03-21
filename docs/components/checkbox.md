A checkbox allows a user to select a value from a small set of options, often binary.

```react
<Checkbox />
```

### Props

#### **name** (string)

This property sets the node name for the input:

```react
<Checkbox name="two" />
```

#### **checked** (boolean)

Using this prop you can set the initial state as checked:

```react
<Checkbox name="three" checked>Hola</Checkbox>
```

#### **disabled** (boolean)

Using this prop you can disable the checkbox:

```react
<Checkbox disabled>Disabled</Checkbox>
```

#### **onChange** (function)

Callback to be called when the toggle changes its state:

```react
<Checkbox checked onChange={state => console.log(state)}>Option</Checkbox>
```

#### **as** (strong)

Choose how is rendered the checkbox. You can choose from `div`, `li` or `span`:

```react
<Checkbox as='span'>As span</Checkbox>
```
