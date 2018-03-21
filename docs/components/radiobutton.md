Radio buttons group form component.

```react
<Radiobutton.Group name="radios">
  <Radiobutton value="0">One</Radiobutton>
  <Radiobutton value="1">two</Radiobutton>
</Radiobutton.Group>
```

### Props

#### **value** (string required)

Set the input's value. Required for individual `Radiobutton`.

#### **name** (string required)

Set name for the inputs.

```react
<Radiobutton.Group name="wadus">
  <Radiobutton value="hola">Hola</Radiobutton>
  <Radiobutton value="mundo">Mundo</Radiobutton>
</Radiobutton.Group>
```

#### **as** (string)

Choose the tag to render the group. You can choose from `div`, `ul` or `span`. By default `ul` is used.

```react
<Radiobutton.Group name="wadus" as="div">
  <Radiobutton value="hola">Hola</Radiobutton>
  <Radiobutton value="mundo">Mundo</Radiobutton>
</Radiobutton.Group>
```

#### **onChange** (function)

Callback to be called when the selected value changes.

```react
<Radiobutton.Group name="wadus" onChange={selected => console.log(selected)}>
  <Radiobutton value="hola">Hola</Radiobutton>
  <Radiobutton value="mundo">Mundo</Radiobutton>
</Radiobutton.Group>
```

#### **selected** (string)

Callback to be called when the selected value changes.

```react
<Radiobutton.Group name="wadus" selected="mundo">
  <Radiobutton value="hola">Hola</Radiobutton>
  <Radiobutton value="mundo">Mundo</Radiobutton>
</Radiobutton.Group>
```
