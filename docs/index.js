import React from 'react';
import ReactDOM from 'react-dom';
import { Catalog } from 'catalog';

import './styles.css';

const pages = [
  { path: '/', title: 'Introduction', component: require('./introduction.md') },
  { path: '/colors', title: 'Colors', component: require('./colors.md') },
  {
    title: 'Typography',
    pages: [
      {
        path: '/typography',
        title: 'How to',
        component: require('./typography.md'),
      },
      {
        imports: {
          Jumbo: require('../src/components/Typography/jumbo'),
        },
        path: '/components/jumbo',
        title: 'Jumbo',
        component: require('./components/jumbo.md'),
      },
      {
        imports: {
          Display: require('../src/components/Typography/display'),
        },
        path: '/components/display',
        title: 'Display',
        component: require('./components/display.md'),
      },
      {
        imports: {
          Title: require('../src/components/Typography/title'),
        },
        path: '/components/title',
        title: 'Title',
        component: require('./components/title.md'),
      },
      {
        imports: {
          Subheader: require('../src/components/Typography/subheader'),
        },
        path: '/components/subheader',
        title: 'SubHeader',
        component: require('./components/subheader.md'),
      },
      {
        imports: {
          Text: require('../src/components/Typography/text'),
        },
        path: '/components/text',
        title: 'Text',
        component: require('./components/text.md'),
      },
      {
        imports: {
          Caption: require('../src/components/Typography/caption'),
        },
        path: '/components/caption',
        title: 'Caption',
        component: require('./components/caption.md'),
      },
    ],
  },
  {
    title: 'Components',
    pages: [
      {
        path: '/components',
        title: 'Introduction',
        component: require('./components.md'),
      },
      {
        imports: {
          Button: require('../src/components/Button/button'),
          PlusIcon: require('../src/components/Icons/plus'),
        },
        path: '/components/button',
        title: 'Button',
        component: require('./components/button.md'),
      },
      {
        imports: {
          ButtonGroup: require('../src/components/Button/button-group'),
          Button: require('../src/components/Button/button'),
          PlusIcon: require('../src/components/Icons/plus'),
        },
        path: '/components/button-group',
        title: 'Button Group',
        component: require('./components/button-group.md'),
      },
      {
        imports: {
          Input: require('../src/components/Input/input'),
        },
        path: '/components/input',
        title: 'Input',
        component: require('./components/input.md'),
      },
      {
        imports: {
          Table: require('../src/components/Table/table'),
        },
        path: '/components/table',
        title: 'Table',
        component: require('./components/table.md'),
      },
      {
        imports: {
          Tabs: require('../src/components/Tabs/tab'),
        },
        path: '/components/tabs',
        title: 'Tabs',
        component: require('./components/tabs.md'),
      },
      {
        imports: {
          Toggle: require('../src/components/Toggle/toggle'),
          Text: require('../src/components/Typography/text'),
        },
        path: '/components/toggle',
        title: 'Toggle',
        component: require('./components/toggle.md'),
      },
      {
        imports: {
          Dropdown: require('../src/components/Dropdown/dropdown'),
          Button: require('../src/components/Button/button'),
          ChevronIcon: require('../src/components/Icons/chevron-down'),
        },
        path: '/components/dropdown',
        title: 'Dropdown',
        component: require('./components/dropdown.md'),
      },
      {
        imports: {
          Range: require('../src/components/Range/range'),
        },
        path: '/components/range',
        title: 'Range',
        component: require('./components/range.md'),
      },
      {
        imports: {
          Breadcrumb: require('../src/components/Breadcrumb/breadcrumb'),
        },
        path: '/components/breadcrumb',
        title: 'Breadcrumb',
        component: require('./components/breadcrumb.md'),
      },
      {
        imports: {
          Loading: require('../src/components/Loading/loading'),
        },
        path: '/components/loading',
        title: 'Loading',
        component: require('./components/loading.md'),
      },
      {
        imports: {
          Loading: require('../src/components/Loading/loading'),
          Avatar: require('../src/components/Avatar/avatar'),
        },
        path: '/components/avatar',
        title: 'Avatar',
        component: require('./components/avatar.md'),
      },
      {
        imports: {
          Badge: require('../src/components/Badge/badge'),
        },
        path: '/components/badge',
        title: 'Badge',
        component: require('./components/badge.md'),
      },
      {
        imports: {
          Tooltip: require('../src/components/Tooltip/tooltip'),
        },
        path: '/components/tooltip',
        title: 'Tooltip',
        component: require('./components/tooltip.md'),
      },
      {
        imports: {
          Collapsible: require('../src/components/Collapsible/collapsible'),
          Text: require('../src/components/Typography/text'),
          Subheader: require('../src/components/Typography/subheader'),
          Badge: require('../src/components/Badge/badge'),
        },
        path: '/components/collapsible',
        title: 'Collapsible',
        component: require('./components/collapsible.md'),
      },
      {
        imports: {
          Steps: require('../src/components/Steps/steps'),
          Dropshadow: require('../src/components/Dropshadow/dropshadow'),
          Subheader: require('../src/components/Typography/subheader'),
          Text: require('../src/components/Typography/text'),
        },
        path: '/components/steps',
        title: 'Steps',
        component: require('./components/steps.md'),
      },
      {
        imports: {
          Legend: require('../src/components/Legend/legend'),
          Steps: require('../src/components/Steps/steps'),
          Collapsible: require('../src/components/Collapsible/collapsible'),
          Subheader: require('../src/components/Typography/subheader'),
          Text: require('../src/components/Typography/text'),
          Toggle: require('../src/components/Toggle/toggle'),
        },
        path: '/components/legend',
        title: 'Legend',
        component: require('./components/legend.md'),
      },
      {
        imports: {
          Popup: require('../src/components/Popup/popup'),
          Badge: require('../src/components/Badge/badge'),
          Caption: require('../src/components/Typography/caption'),
          Subheader: require('../src/components/Typography/subheader'),
          Text: require('../src/components/Typography/text'),
          Toggle: require('../src/components/Toggle/toggle'),
        },
        path: '/components/popup',
        title: 'Popup',
        component: require('./components/popup.md'),
      },
      {
        imports: {
          Flag: require('../src/components/Flag/flag'),
          Text: require('../src/components/Typography/text'),
          AlertFillIcon: require('../src/components/Icons/alert-fill'),
        },
        path: '/components/flag',
        title: 'Flag',
        component: require('./components/flag.md'),
      },
      {
        imports: {
          Banner: require('../src/components/Banner/banner'),
          Text: require('../src/components/Typography/text'),
          AlertFillIcon: require('../src/components/Icons/alert-fill'),
        },
        path: '/components/banner',
        title: 'Banner',
        component: require('./components/banner.md'),
      },
      {
        imports: {
          Datepicker: require('../src/components/Datepicker/datepicker'),
        },
        path: '/components/datepicker',
        title: 'Datepicker',
        component: require('./components/datepicker.md'),
      },
      {
        imports: {
          RadioButton: require('../src/components/RadioButton/radiobutton'),
        },
        path: '/components/radiobutton',
        title: 'RadioButton',
        component: require('./components/radiobutton.md'),
      },
      {
        imports: {
          Checkbox: require('../src/components/Checkbox/checkbox'),
        },
        path: '/components/checkbox',
        title: 'Checkbox',
        component: require('./components/checkbox.md'),
      },
      {
        imports: {
          Grid: require('../src/components/Grid/grid'),
        },
        path: '/components/grid',
        title: 'Grid',
        component: require('./components/grid.md'),
      },
      {
        imports: {
          Dropshadow: require('../src/components/Dropshadow/dropshadow'),
        },
        path: '/components/dropshadow',
        title: 'Dropshadow',
        component: require('./components/dropshadow.md'),
      },
      {
        imports: {
          Widget: require('../src/components/Widget/widget'),
          GaugeChart: require('../src/components/GaugeChart/gauge'),
        },
        path: '/components/gaugechart',
        title: 'Gauge Chart',
        component: require('./components/gaugechart.md'),
      },
      {
        imports: {
          Widget: require('../src/components/Widget/widget'),
          DonutChart: require('../src/components/DonutChart/donut'),
          data: require('../src/components/DonutChart/donut.fixtures'),
        },
        path: '/components/donutchart',
        title: 'Donut Chart',
        component: require('./components/donutchart.md'),
      },
      {
        imports: {
          Button: require('../src/components/Button/button'),
          Widget: require('../src/components/Widget/widget'),
          CategoryWidget: require('../src/components/CategoryWidget/categoryWidget'),
          data: require('../src/components/CategoryWidget/categoryWidget.fixtures'),
        },
        path: '/components/categoryWidget',
        title: 'Category Widget',
        component: require('./components/categoryWidget.md'),
      },
      {
        imports: {
          Widget: require('../src/components/Widget/widget'),
          Histogram: require('../src/components/Histogram/histogram'),
          data: require('../src/components/Histogram/histogram.fixtures'),
        },
        path: '/components/histogram',
        title: 'Histogram',
        component: require('./components/histogram.md'),
      },
      {
        imports: {
          Widget: require('../src/components/Widget/widget'),
          StackedBar: require('../src/components/StackedBar/stackedBar'),
          data: require('../src/components/StackedBar/stackedBar.fixtures'),
        },
        path: '/components/stackedbar',
        title: 'Stacked bar',
        component: require('./components/stackedbar.md'),
      },
    ],
  },
];

const theme = {
  // Patterns
  checkerboardPatternLight:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=',
  checkerboardPatternDark:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkWAsAALMAr6o4KHcAAAAASUVORK5CYII=',
};

ReactDOM.render(
  <Catalog title="Airship" pages={pages} theme={theme} />,
  document.getElementById('catalog')
);
