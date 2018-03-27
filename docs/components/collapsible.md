Collapsible displays additional content when opened.

```react
<Collapsible>
  <Collapsible.Header>
    <Subheader>Global index</Subheader>
  </Collapsible.Header>
  <Collapsible.Content>
    <Badget color="#B4E0FA">Store 1</Badget>
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

#### **onChange** (function)

Callback to be called when the collapsible toggles..

```react
<Collapsible onChange={state => console.log(state.open)}>
  <Collapsible.Header>Header</Collapsible.Header>
  <Collapsible.Content>Content</Collapsible.Content>
</Collapsible>
```
