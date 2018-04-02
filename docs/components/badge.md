Use the Badge component to categorize content.

```react
<Badge>Store</Badge>
```

### Props

#### **as** (string)

Control how the component is rendered. By default is `li`.

```react
<Badge as="span">Store</Badge>
```

#### **color** (string)

Sets the background color of the badge. By default is UI03 (see colors documentation).

```react
<Badge color="rgba(128, 182, 34, 0.24)">Store</Badge>
```

#### **closable** (boolean)

Option to show the close button. Use it along the `onClose` callback.

```react
<Badge color="#E4D8EB" closable>
  Store 2
</Badge>
```

#### **onClose** (function)

Callback when the user closes the badge.

```react
<Badge color="#E4D8EB" closable onClose={e => console.log('closed badge')}>
  Store
</Badge>
```

#### **closeColor** (string)

Color of the close icon.

```react
<Badge closable closeColor="#1785FB">
  Store
</Badge>
```
