A button clearly communicates what action will occur when the user touches it. It consists of text, an icon, or both, designed in accordance with your app's color theme.

```react
<div>
  <Button>
    Default
  </Button>
</div>
```

```react
<div>
  <Button>
    <Icon icon="plus" style={{ marginRight: '0.5rem' }} />
    With icon
  </Button>
</div>
```

```react
<div>
  <Button>
    <Icon icon="pencil" />
  </Button>
</div>
```

### Props

#### **large** (boolean)

Sets the button as large one.

```react
<Button large>Large</Button>
```

#### **small** (boolean)

Sets the button as small one.

```react
<Button small>Small</Button>
```

#### **secondary** (boolean)

Theme the button as a secondary one.

```react
<Button secondary>Secondary</Button>
```

#### **borderless** (boolean)

Theme the button as a borderless one.

```react
<Button borderless>Without border</Button>
```
