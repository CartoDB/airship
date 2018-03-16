A Tooltip displays additional information on top of a page.

```react
<Tooltip>
  <Tooltip.Content>Hello world</Tooltip.Content>
  <Tooltip.Trigger>Hover me</Tooltip.Trigger>
</Tooltip>
```

### Props

#### **as** (string)

Use this property to handle how the component is rendered. By default, it uses a `span` tag:

```react
<Tooltip as='strong'>
  <Tooltip.Content>Hello world</Tooltip.Content>
  <Tooltip.Trigger>Hover me</Tooltip.Trigger>
</Tooltip>
```

#### **to** (string)

A Tooltip can be position around its trigger. You can choose from `top`, `bottom`, `left` and `right`. By the fault, `top` is used:

```react
<Tooltip to='bottom'>
  <Tooltip.Content>Hello world</Tooltip.Content>
  <Tooltip.Trigger>Bottom</Tooltip.Trigger>
</Tooltip>
```

```react
<Tooltip to='right'>
  <Tooltip.Content>Hello world</Tooltip.Content>
  <Tooltip.Trigger>Right</Tooltip.Trigger>
</Tooltip>
```

```react
<Tooltip to='left'>
  <Tooltip.Content>Hello world</Tooltip.Content>
  <Tooltip.Trigger>Left</Tooltip.Trigger>
</Tooltip>
```
