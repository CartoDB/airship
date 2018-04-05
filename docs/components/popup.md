Use this component to show extra information about the data.

```react
<Popup>
  <Subheader>CARTO Locations</Subheader>
  <Text color="#747474">The biggest Location Intelligence Summit. More than 300 thought leaders, innovators, and practitioners will come together to discuss how location data is powering a new wave of innovation.</Text>
</Popup>
```

### Props

#### **background** (string)

It changes the popup background. By default is `white`.

```react
<Popup background="#555">
  <Subheader color="#FFF">CARTO Locations</Subheader>
  <Text color="#CCC">The biggest Location Intelligence Summit. More than 300 thought leaders, innovators, and practitioners will come together to discuss how location data is powering a new wave of innovation.</Text>
</Popup>
```

#### **image** (string)

It adds an image on top of the content.

```react
<Popup image="https://im.vsco.co/aws-us-west-2/ec3d56/1426587/5abf9f9b8ce3db5809e53a5c/vsco5abf9f9c4ce23.jpg?w=608&h=415&dpr=1">
  <Text color="#747474">Author</Text>
  <Text margin="0 0 1rem">Emilio García</Text>

  <Text color="#747474">Place</Text>
  <Text margin="0 0 1rem">New York</Text>

  <Text color="#747474">Twitter</Text>
  <Text>@piensaenpixel</Text>
</Popup>
```

If the popup has no children, the image will cover the whole popup:

```react
<Popup image="https://im.vsco.co/aws-us-west-2/ec3d56/1426587/5abf9f9b8ce3db5809e53a5c/vsco5abf9f9c4ce23.jpg?w=608&h=415&dpr=1" />
```
