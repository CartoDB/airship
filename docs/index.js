import React from 'react';
import ReactDOM from 'react-dom';
import { Catalog } from 'catalog';

import './styles.css';
import '../src/components/reset.css';

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
          Input: require('../src/components/Input/input.js'),
        },
        path: '/components/input',
        title: 'Input',
        component: require('./components/input.md')
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
          Toggle: require('../src/components/Toggle/toggle.js'),
          Text: require('../src/components/Typography/text')
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
          Badge: require('../src/components/Badge/badge.js')
        },
        path: '/components/badge',
        title: 'Badge',
        component: require('./components/badge.md')
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
          Badge: require('../src/components/Badge/badge')
        },
        path: '/components/collapsible',
        title: 'Collapsible',
        component: require('./components/collapsible.md')
      },
      {
        imports: {
          Steps: require('../src/components/Steps/steps.js'),
          Dropshadow: require('../src/components/Dropshadow/dropshadow'),
          Subheader: require('../src/components/Typography/subheader'),
          Text: require('../src/components/Typography/text')
        },
        path: '/components/steps',
        title: 'Steps',
        component: require('./components/steps.md')
      },
      {
        imports: {
          Legend: require('../src/components/Legend/legend.js'),
          Steps: require('../src/components/Steps/steps.js'),
          Collapsible: require('../src/components/Collapsible/collapsible.js'),
          Subheader: require('../src/components/Typography/subheader'),
          Text: require('../src/components/Typography/text'),
          Toggle: require('../src/components/Toggle/toggle.js')
        },
        path: '/components/legend',
        title: 'Legend',
        component: require('./components/legend.md')
      },
      {
        imports: {
          Flag: require('../src/components/Flag/flag.js'),
          Text: require('../src/components/Typography/text'),
          AlertFillIcon: require('../src/components/Icons/alert-fill.js')
        },
        path: '/components/flag',
        title: 'Flag',
        component: require('./components/flag.md')
      },
      {
        imports: {
          Banner: require('../src/components/Banner/banner.js'),
          Text: require('../src/components/Typography/text'),
          AlertFillIcon: require('../src/components/Icons/alert-fill.js')
        },
        path: '/components/banner',
        title: 'Banner',
        component: require('./components/banner.md')
      },
      {
        imports: {
          Datepicker: require('../src/components/Datepicker/datepicker.js')
        },
        path: '/components/datepicker',
        title: 'Datepicker',
        component: require('./components/datepicker.md')
      },
      {
        imports: {
          Radiobutton: require('../src/components/Radiobutton/radiobutton.js')
        },
        path: '/components/radiobutton',
        title: 'Radiobutton',
        component: require('./components/radiobutton.md')
      },
      {
        imports: {
          Checkbox: require('../src/components/Checkbox/checkbox.js')
        },
        path: '/components/checkbox',
        title: 'Checkbox',
        component: require('./components/checkbox.md')
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
      },
      {
        imports: {
          Widget: require('../src/components/Widget/widget.js'),
          GaugeChart: require('../src/components/GaugeChart/gauge.js'),
        },
        path: '/components/gaugechart',
        title: 'Gauge Chart',
        component: require('./components/gaugechart.md')
      },
      {
        imports: {
          Widget: require('../src/components/Widget/widget.js'),
          DonutChart: require('../src/components/DonutChart/donut.js'),
          data: require('../src/components/DonutChart/donut.fixtures.js')
        },
        path: '/components/donutchart',
        title: 'Donut Chart',
        component: require('./components/donutchart.md')
      },
      {
        imports: {
          Button: require('../src/components/Button/button.js'),
          Widget: require('../src/components/Widget/widget.js'),
          CategoryWidget: require('../src/components/CategoryWidget/categoryWidget.js'),
          data: require('../src/components/CategoryWidget/categoryWidget.fixtures.js')
        },
        path: '/components/categoryWidget',
        title: 'Category Widget',
        component: require('./components/categoryWidget.md')
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
