Radio button form component.

```react
<Radiobutton value="wadus" />
```

### Props

#### **value** (string required)

Set the input's value.

#### **name** (string)

Set name to the input. This prop is required if you use `Radiobutton.Group`

```react
<Radiobutton.Group name="wadus">
  <Radiobutton value="hola">Hola</Radiobutton>
  <Radiobutton value="mundo">Mundo</Radiobutton>
</Radiobutton.Group>
```

#### **as** (string)

Choose the tag to render the radio button from `div`, `li` or `span`. For group, you can choose from `div`, `ul` or `span`. By default `div` for single radio button and `ul` for group.

```react
<Radiobutton.Group name="wadus" as="div">
  <Radiobutton value="hola">Hola</Radiobutton>
  <Radiobutton value="mundo">Mundo</Radiobutton>
</Radiobutton.Group>
```

#### **onChange** (function)

Callback to be called when the selected value changes.

```react
<Radiobutton.Group name="wadus" onChange={e => console.log(e.target.value)}>
  <Radiobutton value="hola">Hola</Radiobutton>
  <Radiobutton value="mundo">Mundo</Radiobutton>
</Radiobutton.Group>
```

#### **selected** (string | boolean)

Callback to be called when the selected value changes.

```react
<Radiobutton.Group name="wadus" selected="mundo">
  <Radiobutton value="hola">Hola</Radiobutton>
  <Radiobutton value="mundo">Mundo</Radiobutton>
</Radiobutton.Group>
```

```react
<Radiobutton value="hola" selected>Hola</Radiobutton>
```
