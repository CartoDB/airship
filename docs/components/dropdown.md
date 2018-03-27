Dropdown component explanation here.

```react
<Dropdown>
  <Dropdown.Trigger>Click me</Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Menu>
      <Dropdown.Item>All</Dropdown.Item>
      <Dropdown.Item>Open</Dropdown.Item>
      <Dropdown.Item>Fullfilled</Dropdown.Item>
      <Dropdown.Item>Close</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown.Content>
</Dropdown>
```

### Props

#### **action** (boolean)

Action allows the user to handle the interaction to open the dropdown content. It has to be one of these values: `click`, `over`. By default is `click`.

```react
<Dropdown action="over">
  <Dropdown.Trigger>
    <Button borderless>
      Hover me&nbsp;<ChevronIcon width={8} height={4} />
    </Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Menu>
      <Dropdown.Item onClick={(e) => console.log(e.target)}>
        All
      </Dropdown.Item>
      <Dropdown.Item>Open</Dropdown.Item>
      <Dropdown.Item>Fullfilled</Dropdown.Item>
      <Dropdown.Item>Close</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown.Content>
</Dropdown>
```

#### **as** (string)

It manages how the component is rendered. You can choose `div` or `span`.

```code
lang: jsx
---
<Dropdown as="span">
  <Dropdown.Trigger>Menu</Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Menu>
      <Dropdown.Item>All</Dropdown.Item>
      <Dropdown.Item>None</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown.Content>
</Dropdown>
```

#### **size** (number)

To handle trigger's and content's width.

```react
<Dropdown action="click" size={300}>
  <Dropdown.Trigger>
    <Dropdown.Button>
      Dropdown <ChevronIcon width={12} height={12} />
    </Dropdown.Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Menu>
      <Dropdown.Item onClick={(e) => console.log(e.target)}>
        All
      </Dropdown.Item>
      <Dropdown.Item>Open</Dropdown.Item>
      <Dropdown.Item>Fullfilled</Dropdown.Item>
      <Dropdown.Item>Close</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown.Content>
</Dropdown>
```
