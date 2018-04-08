Talk about the Histogram

```react
  <Histogram data={data} />
```

The Histogram can be used along with the `<Widget />` component

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>

  <Histogram data={data} />
</Widget>
```

### Props

#### **data** (array)

Value that will be shown in the widget.

#### **color** (array)

Colors used in the histogram bars.

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>

  <Histogram data={data} color="#FABADA" />
</Widget>
```
