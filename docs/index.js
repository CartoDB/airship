import React from 'react';
import ReactDOM from 'react-dom';
import { Catalog } from 'catalog';
import {
  Grid,
  Jumbo,
  Display,
  Title,
  Subheader,
  Text,
  Caption
} from '../src/components';

import css from './styles.css';

const pages = [
  { path: '/', title: 'Introduction', component: require('./introduction.md') },
  { path: '/colors', title: 'Colors', component: require('./colors.md') },
  {
    title: 'Typography',
    pages: [
      {
        path: '/typography',
        title: 'How to',
        component: require('./typography.md')
      },
      {
        imports: {
          Jumbo: require('../src/components/Typography/jumbo.js')
        },
        path: '/components/jumbo',
        title: 'Jumbo',
        component: require('./components/jumbo.md')
      },
      {
        imports: {
          Display: require('../src/components/Typography/display.js')
        },
        path: '/components/display',
        title: 'Display',
        component: require('./components/display.md')
      },
      {
        imports: {
          Title: require('../src/components/Typography/title.js')
        },
        path: '/components/title',
        title: 'Title',
        component: require('./components/title.md')
      },
      {
        imports: {
          Subheader: require('../src/components/Typography/subheader.js')
        },
        path: '/components/subheader',
        title: 'SubHeader',
        component: require('./components/subheader.md')
      },
      {
        imports: {
          Text: require('../src/components/Typography/text.js')
        },
        path: '/components/text',
        title: 'Text',
        component: require('./components/text.md')
      },
      {
        imports: {
          Caption: require('../src/components/Typography/caption.js')
        },
        path: '/components/caption',
        title: 'Caption',
        component: require('./components/caption.md')
      }
    ]
  },
  {
    title: 'Components',
    pages: [
      {
        path: '/components',
        title: 'Introduction',
        component: require('./components.md')
      },
      {
        imports: {
          Button: require('../src/components/Button/button.js'),
          PlusIcon: require('../src/components/Icons/plus.js')
        },
        path: '/components/button',
        title: 'Button',
        component: require('./components/button.md')
      },
      {
        imports: {
          ButtonGroup: require('../src/components/Button/button-group.js'),
          Button: require('../src/components/Button/button.js'),
          PlusIcon: require('../src/components/Icons/plus.js')
        },
        path: '/components/button-group',
        title: 'Button Group',
        component: require('./components/button-group.md')
      },
      {
        imports: {
          Table: require('../src/components/Table/table.js')
        },
        path: '/components/table',
        title: 'Table',
        component: require('./components/table.md')
      },
      {
        imports: {
          Tabs: require('../src/components/Tabs/tab.js')
        },
        path: '/components/tabs',
        title: 'Tabs',
        component: require('./components/tabs.md')
      },
      {
        imports: {
          Toggle: require('../src/components/Toggle/toggle.js')
        },
        path: '/components/toggle',
        title: 'Toggle',
        component: require('./components/toggle.md')
      },
      {
        imports: {
          Dropdown: require('../src/components/Dropdown/dropdown.js'),
          Button: require('../src/components/Button/button.js'),
          ChevronIcon: require('../src/components/Icons/chevron.js')
        },
        path: '/components/dropdown',
        title: 'Dropdown',
        component: require('./components/dropdown.md')
      },
      {
        imports: {
          Grid: require('../src/components/Grid/grid.js')
        },
        path: '/components/grid',
        title: 'Grid',
        component: require('./components/grid.md')
      },
      {
        imports: {
          Dropshadow: require('../src/components/Dropshadow/dropshadow.js')
        },
        path: '/components/dropshadow',
        title: 'Dropshadow',
        component: require('./components/dropshadow.md')
      }
    ]
  }
];

ReactDOM.render(
  <Catalog title="Airship" pages={pages} />,
  document.getElementById('catalog')
);
