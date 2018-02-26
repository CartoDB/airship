Tab component explanation here.

```react
<Tabs>
  <Tabs.Panel label="hello">
    <div className='Panel'>Hola</div>
  </Tabs.Panel>
  <Tabs.Panel label="world">
    <div className='Panel'>Mundo</div>
  </Tabs.Panel>
</Tabs>
```

### Props

#### **large** (boolean)

Use this property to set the size of the buttons in tabs:

```react
<Tabs large>
  <Tabs.Panel label="hello">
    <div className='Panel'>Hola</div>
  </Tabs.Panel>
  <Tabs.Panel label="world">
    <div className='Panel'>Mundo</div>
  </Tabs.Panel>
</Tabs>
```

#### **selected** (number or string)

Using this prop you can pass the tab is selected initially. It accepts a number starting on 0 or a string that it needs to be one of the labels of the panels:

```react
<Tabs selected={1}>
  <Tabs.Panel label="hello">
    <div className='Panel'>Hola</div>
  </Tabs.Panel>
  <Tabs.Panel label="world">
    <div className='Panel'>Mundo</div>
  </Tabs.Panel>
</Tabs>
```

```react
<Tabs selected='world'>
  <Tabs.Panel label="hello">
    <div className='Panel'>Hola</div>
  </Tabs.Panel>
  <Tabs.Panel label="world">
    <div className='Panel'>Mundo</div>
  </Tabs.Panel>
</Tabs>
```
