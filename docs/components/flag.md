Flag displays contextual information about events on the page.

```react
<Flag onClick={(e) => console.log('flag closed')}>
  <Flag.Icon>
    <AlertFillIcon color='#80B622' width={12} height={12} />
  </Flag.Icon>
  <Flag.Content>
    <Text color='#2c2c2c' weight="medium">
      You are now conected
    </Text>
    <Text color='#747474'>
      You have been added to the group “New Store on this region”
    </Text>
  </Flag.Content>
</Flag>
```

### Props

#### **onClick** (function)

Callback to be called when the close button it's clicked.
