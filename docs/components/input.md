Icon component explanation here.

```react
<div>
  <Input
    htmlFor="email"
    label="Email"
    placeholder="wadus@carto.com"
  />
  <Input
    htmlFor="comment"
    label="Comment"
    placeholder="Write your comment here..."
    multiline
    rows={5}
  />
</div>
```

### Props

#### **htmlFor** (string, required)

This property sets the node ID for label and input:

```react
<Input
  htmlFor="htmlfor-email"
  label="Email"
  placeholder="wadus@carto.com"
/>
```

#### **type** (string)

This property sets the type of the input, the default is `text`.

```react
<div>
  <Input
    htmlFor="password"
    type="password"
    label="Password"
    defaultValue="this is a secret"
  />
  <Input
    htmlFor="number"
    type="number"
    label="Amount"
    defaultValue="10"
  />
  <Input
    htmlFor="color"
    type="color"
    label="Color"
    defaultValue="#FABADA"
  />
</div>
```

#### **disabled** (boolean)

Sets the input as disabled.

```react
<Input
  htmlFor="disabled-email"
  label="Email"
  placeholder="wadus@carto.com"
  disabled
/>
```

#### **readOnly** (boolean)

Sets the input as read only.

```react
<Input
  htmlFor="readonly-email"
  label="Email"
  placeholder="wadus@carto.com"
  readOnly
/>
```

#### **error** (string)

Uses the input `:invalid` styles and shows the error message below the input.

```react
<Input
  htmlFor="error-email"
  label="Email"
  placeholder="wadus@carto"
  error="Invalid email"
/>
```

#### **multiline** (boolean)

Renders a `textarea` instead of an `input`.

```react
<Input
  htmlFor="multiline-comment"
  label="Comment"
  placeholder="Write your comment here..."
  multiline
  rows={5}
/>
```
