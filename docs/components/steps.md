Collapsible displays additional content when opened.

```react
<Steps>
  <Steps.Header>
    <Subheader>Header</Subheader>
  </Steps.Header>
  <Steps.Content>
    <Text>Content 1</Text>
  </Steps.Content>
  <Steps.Content>
    <Text>Content 2</Text>
  </Steps.Content>
  <Steps.Content>
    <Text>Content 3</Text>
  </Steps.Content>
  <Steps.Content>
    <Text>Content 4</Text>
  </Steps.Content>
</Steps>
```

### Props

#### **step** (number)

Choose the content initially rendered. By default is `0`.

```react
<Steps step={2}>
  <Steps.Header>Header</Steps.Header>
  <Steps.Content>Content 1</Steps.Content>
  <Steps.Content>Content 2</Steps.Content>
  <Steps.Content>Content 3</Steps.Content>
  <Steps.Content>Content 4</Steps.Content>
</Steps>
```

#### **onChange** (function)

Callback to be called when the collapsible toggles..

```react
<Steps onChange={state => console.log(state.step)}>
  <Steps.Header>Header</Steps.Header>
  <Steps.Content>Content 1</Steps.Content>
  <Steps.Content>Content 2</Steps.Content>
</Steps>
```
