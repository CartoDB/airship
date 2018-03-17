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
          ChevronIcon: require('../src/components/Icons/chevron-down.js')
        },
        path: '/components/dropdown',
        title: 'Dropdown',
        component: require('./components/dropdown.md')
      },
      {
        imports: {
          Range: require('../src/components/Range/range.js')
        },
        path: '/components/range',
        title: 'Range',
        component: require('./components/range.md')
      },
      {
        imports: {
          Breadcrumb: require('../src/components/Breadcrumb/breadcrumb.js')
        },
        path: '/components/breadcrumb',
        title: 'Breadcrumb',
        component: require('./components/breadcrumb.md')
      },
      {
        imports: {
          Loading: require('../src/components/Loading/loading.js')
        },
        path: '/components/loading',
        title: 'Loading',
        component: require('./components/loading.md')
      },
      {
        imports: {
          Loading: require('../src/components/Loading/loading.js'),
          Avatar: require('../src/components/Avatar/avatar.js')
        },
        path: '/components/avatar',
        title: 'Avatar',
        component: require('./components/avatar.md')
      },
      {
        imports: {
          Badget: require('../src/components/Badget/badget.js')
        },
        path: '/components/badget',
        title: 'Badget',
        component: require('./components/badget.md')
      },
      {
        imports: {
          Tooltip: require('../src/components/Tooltip/tooltip.js')
        },
        path: '/components/tooltip',
        title: 'Tooltip',
        component: require('./components/tooltip.md')
      },
      {
        imports: {
          Collapsible: require('../src/components/Collapsible/collapsible.js'),
          Text: require('../src/components/Typography/text'),
          Subheader: require('../src/components/Typography/subheader'),
          Badget: require('../src/components/Badget/badget')
        },
        path: '/components/collapsible',
        title: 'Collapsible',
        component: require('./components/collapsible.md')
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

const theme = {
  // Patterns
  checkerboardPatternLight:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=',
  checkerboardPatternDark:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkWAsAALMAr6o4KHcAAAAASUVORK5CYII='
};

ReactDOM.render(
  <Catalog title="Airship" pages={pages} theme={theme} />,
  document.getElementById('catalog')
);
