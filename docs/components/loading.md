Loading component is a wait-animation progress indicator to provide a system status for users when something is happening or loading.

```react
<Loading />
```

### Props

#### **size** (number)

Sets the component's width and height. You can choosen a value from `16`, `32`, `48` or `64`. By default `16` pixels is used.

```react
<Loading size={32}/>
```

#### **negative** (boolean)

Theme the loading to use with dark backgrounds.

```react
dark: true
---
<Loading negative/>
```
