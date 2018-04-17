Radio buttons group form component.

```react
<RadioButton.Group name="radios">
  <RadioButton value="0">One</RadioButton>
  <RadioButton value="1">two</RadioButton>
</RadioButton.Group>
```

### Props

#### **value** (string required)

Set the input's value. Required for individual `RadioButton`.

#### **name** (string required)

Set name for the inputs.

```react
<RadioButton.Group name="wadus">
  <RadioButton value="hola">Hola</RadioButton>
  <RadioButton value="mundo">Mundo</RadioButton>
</RadioButton.Group>
```

#### **as** (string)

Choose the tag to render the group. You can choose from `div`, `ul` or `span`. By default `ul` is used.

```react
<RadioButton.Group name="wadus" as="div">
  <RadioButton value="hola">Hola</RadioButton>
  <RadioButton value="mundo">Mundo</RadioButton>
</RadioButton.Group>
```

#### **onChange** (function)

Callback to be called when the selected value changes.

```react
<RadioButton.Group name="wadus" onChange={selected => console.log(selected)}>
  <RadioButton value="hola">Hola</RadioButton>
  <RadioButton value="mundo">Mundo</RadioButton>
</RadioButton.Group>
```

#### **selected** (string)

Callback to be called when the selected value changes.

```react
<RadioButton.Group name="wadus" selected="mundo">
  <RadioButton value="hola">Hola</RadioButton>
  <RadioButton value="mundo">Mundo</RadioButton>
</RadioButton.Group>
```
