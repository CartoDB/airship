Text component explanation here.

```react
<div>
  <Text>I'm thinking two circus clowns dancing. You?</Text>
  <Text weight="medium">I'm thinking two circus clowns dancing. You?</Text>
  <Text font="mono">I'm thinking two circus clowns dancing. You?</Text>
</div>
```

### Props

#### **as** (string)

Sets the tag rendered choosing from `p`, `span`, `div`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`. By default `h1` is used.

```code
<Text as="h2">I'm an h2 Text</Text>
```

#### **font** (string)

Sets the font face choosing from `normal` or `mono`. By default `normal` is used.

```code
<Text font="mono">I'm a monotype Text</Text>
```

#### **weight** (string)

Sets the text weight choosing from `regular` or `medium`. By default `regular` is used.

```code
<Text weight="medium">I'm a medium weight Text</Text>
```

#### **color** (string)

Sets the text color.

```code
<Text color="skyblue">I'm blue</Text>
```

#### **margin** (string)

Sets the margin.

```code
<Text margin="0 0 20px">I'm breathing</Text>
```
