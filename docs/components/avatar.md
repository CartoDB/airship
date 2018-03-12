Use the Avatar component to show an image linked to the current user.

```react
<Avatar url="https://avatars0.githubusercontent.com/u/1366843" />
```

### Props

#### **url** (string required)

Sets the image's url to load. If it's empty, no image is shown.

```react
<Avatar url="" />
```

#### **size** (number)

Sets the component's width and height. You can choosen a value from `24`, `32` or `48`. By default `24` pixels is used.

```react
<Avatar url="https://avatars0.githubusercontent.com/u/1366843" size={48} />
```
