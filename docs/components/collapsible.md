Collapsible displays additional content when opened.

```react
<Collapsible>
  <Collapsible.Header>
    <Subheader>Global index</Subheader>
  </Collapsible.Header>
  <Collapsible.Content>
    <Badge color="#B4E0FA">Store 1</Badge>
    <Text as="div">Some fanzy text here</Text>
  </Collapsible.Content>
</Collapsible>
```

### Props

#### **open** (boolean)

Choose if initially is open. By default is `true`.

```react
<Collapsible open={false}>
  <Collapsible.Header>Header</Collapsible.Header>
  <Collapsible.Content>Content</Collapsible.Content>
</Collapsible>
```

#### **overrides** (object)

It allows us to override the styles of the component. It needs an object where the key is the component name, and the value the styles we want to override.

```react
<Collapsible overrides={{
  Collapsible: `
    background: #EFEFEF;
    width: 400px;
  `,
  'Collapsible.Header': `
    background: #CCC;
    padding: 1rem;
  `,
  'Collapsible.Content': `
    padding: 1rem;
  `,
}}>
  <Collapsible.Header>Header</Collapsible.Header>
  <Collapsible.Content>Content</Collapsible.Content>
</Collapsible>
```

#### **onChange** (function)

Callback to be called when the collapsible toggles..

```react
<Collapsible onChange={state => console.log(state.open)}>
  <Collapsible.Header>Header</Collapsible.Header>
  <Collapsible.Content>Content</Collapsible.Content>
</Collapsible>
```
