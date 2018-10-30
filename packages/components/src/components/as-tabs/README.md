## As tabs

Tabs organize content into separate views where only one view can be visible at a time. Each tab's label is shown in the tab header and the active tab's will be highlighted. 


- Tab items **must** have the `[role="tabpanel"]` attribute.
- A custom title can be specified using the `data-title` attribute.


```html
noSource: true
---
<iframe src="/examples/components/as-tabs/simple.html" style="width: 100%; height: 354px;">
```

```code
lang: html
showSource: false
---
<as-tabs>
  <div role="tabpanel">
    <h1>TAB 0</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum explicabo omnis sed, perferendis maiores
      itaque debitis perspiciatis repellendus adipisci deserunt modi ad atque! Obcaecati beatae, rem laborum a
      blanditiis eligendi.
    </p>
  </div>
  <div role="tabpanel" data-title="Custom title">
    <h1>TAB 1</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum explicabo omnis sed, perferendis maiores
      itaque debitis perspiciatis repellendus adipisci deserunt modi ad atque! Obcaecati beatae, rem laborum a
      blanditiis eligendi.
    </p>
  </div>
  <div role="tabpanel">
    <h1>TAB 2</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum explicabo omnis sed, perferendis maiores
      itaque debitis perspiciatis repellendus adipisci deserunt modi ad atque! Obcaecati beatae, rem laborum a
      blanditiis eligendi.
    </p>
  </div>
</as-tabs>
```


### Props

#### **activeTab**: number = 0
Indicates which tab is currently visible, defaults to 0;

```code
lang: html
---
<as-tabs active-tab="2">
  <div role="tabpanel"> Tab 1 </div>
  <div role="tabpanel"> Tab 2 </div>
</as-tabs>
```

```code
lang: javascript
---
tabs.activeTab = 2;
```

#### **xl**: boolean = false
Use this attribute to make tabs larger. Defaultsto false

```code
lang: html
---
<as-tabs xl="true">
  <div role="tabpanel"> Tab 1 </div>
  <div role="tabpanel"> Tab 2 </div>
</as-tabs>
```

```code
lang: javascript
---
tabs.xl = true;
```