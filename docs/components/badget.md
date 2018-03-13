Use the Badget component to categorize content.

```react
<Badget>Store</Badget>
```

### Props

#### **as** (string)

Control how the component is rendered. By default is `li`.

```react
<Badget as="span">Store</Badget>
```

#### **color** (string)

Sets the background color of the badget. By default is UI03 (see colors documentation).

```react
<Badget color="rgba(128, 182, 34, 0.24)">Store</Badget>
```

#### **closable** (boolean)

Option to show the close button. Use it along the `onClose` callback.

```react
<Badget color="#E4D8EB" closable>
  Store 2
</Badget>
```

#### **onClose** (function)

Callback when the user closes the badget.

```react
<Badget color="#E4D8EB" closable onClose={e => console.log('closed badget')}>
  Store
</Badget>
```

#### **closeColor** (string)

Color of the close icon.

```react
<Badget closable closeColor="#1785FB">
  Store
</Badget>
```
