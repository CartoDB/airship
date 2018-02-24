Caption component explanation here.

```react
<div>
  <Caption>I'm thinking two circus clowns dancing. You?</Caption>
  <Caption weight="medium">I'm thinking two circus clowns dancing. You?</Caption>
  <Caption font="mono">I'm thinking two circus clowns dancing. You?</Caption>
</div>
```

### Props

#### **as** (string)

Sets the tag rendered choosing from `p`, `span`, `div`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`. By default `h1` is used.

```code
<Caption as="h2">I'm an h2 Caption</Caption>
```

#### **font** (string)

Sets the font face choosing from `normal` or `mono`. By default `normal` is used.

```code
<Caption font="mono">I'm a monotype Caption</Caption>
```

#### **weight** (string)

Sets the text weight choosing from `regular` or `medium`. By default `regular` is used.

```code
<Caption weight="medium">I'm a medium weight Caption</Caption>
```

#### **color** (string)

Sets the text color.

```code
<Caption color="skyblue">I'm blue</Caption>
```

#### **margin** (string)

Sets the margin.

```code
<Caption margin="0 0 20px">I'm breathing</Caption>
```
