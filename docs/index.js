/* eslint global-require: 0 */

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
        title: 'Avatar',
        path: '/components/avatar',
        component: require('./components/avatar.md'),
        imports: {
          Loading: require('../src/components/Loading/loading'),
          Avatar: require('../src/components/Avatar/avatar'),
        },
      },
      {
        title: 'Badge',
        path: '/components/badge',
        component: require('./components/badge.md'),
        imports: {
          Badge: require('../src/components/Badge/badge'),
        },
      },
      {
        title: 'Banner',
        path: '/components/banner',
        component: require('./components/banner.md'),
        imports: {
          Banner: require('../src/components/Banner/banner'),
          Text: require('../src/components/Typography/text'),
          Icon: require('../src/components/Icon/icon'),
        },
      },
      {
        title: 'Breadcrumb',
        path: '/components/breadcrumb',
        component: require('./components/breadcrumb.md'),
        imports: {
          Breadcrumb: require('../src/components/Breadcrumb/breadcrumb'),
        },
      },
      {
        title: 'Button',
        path: '/components/button',
        component: require('./components/button.md'),
        imports: {
          Button: require('../src/components/Button/button'),
          Icon: require('../src/components/Icon/icon'),
        },
      },
      {
        title: 'Button Group',
        path: '/components/button-group',
        component: require('./components/button-group.md'),
        imports: {
          ButtonGroup: require('../src/components/Button/button-group'),
          Button: require('../src/components/Button/button'),
          Icon: require('../src/components/Icon/icon'),
        },
      },
      {
        title: 'Category Widget',
        path: '/components/categoryWidget',
        component: require('./components/categoryWidget.md'),
        imports: {
          Button: require('../src/components/Button/button'),
          Widget: require('../src/components/Widget/widget'),
          CategoryWidget: require('../src/components/CategoryWidget/categoryWidget'),
          data: require('../src/components/CategoryWidget/categoryWidget.fixtures'),
        },
      },
      {
        title: 'Checkbox',
        path: '/components/checkbox',
        component: require('./components/checkbox.md'),
        imports: {
          Checkbox: require('../src/components/Checkbox/checkbox'),
        },
      },
      {
        title: 'Collapsible',
        path: '/components/collapsible',
        component: require('./components/collapsible.md'),
        imports: {
          Collapsible: require('../src/components/Collapsible/collapsible'),
          Text: require('../src/components/Typography/text'),
          Subheader: require('../src/components/Typography/subheader'),
          Badge: require('../src/components/Badge/badge'),
        },
      },
      {
        title: 'Datepicker',
        path: '/components/datepicker',
        component: require('./components/datepicker.md'),
        imports: {
          Datepicker: require('../src/components/Datepicker/datepicker'),
        },
      },
      {
        title: 'Donut Chart',
        path: '/components/donutchart',
        component: require('./components/donutchart.md'),
        imports: {
          Widget: require('../src/components/Widget/widget'),
          DonutChart: require('../src/components/DonutChart/donut'),
          data: require('../src/components/DonutChart/donut.fixtures'),
        },
      },
      {
        title: 'Dropdown',
        path: '/components/dropdown',
        component: require('./components/dropdown.md'),
        imports: {
          Dropdown: require('../src/components/Dropdown/dropdown'),
          Button: require('../src/components/Button/button'),
          Icon: require('../src/components/Icon/icon'),
        },
      },
      {
        title: 'Dropshadow',
        path: '/components/dropshadow',
        component: require('./components/dropshadow.md'),
        imports: {
          Dropshadow: require('../src/components/Dropshadow/dropshadow'),
        },
      },
      {
        title: 'Flag',
        path: '/components/flag',
        component: require('./components/flag.md'),
        imports: {
          Flag: require('../src/components/Flag/flag'),
          Text: require('../src/components/Typography/text'),
          Icon: require('../src/components/Icon/icon'),
        },
      },
      {
        title: 'Gauge Chart',
        path: '/components/gaugechart',
        component: require('./components/gaugechart.md'),
        imports: {
          Widget: require('../src/components/Widget/widget'),
          GaugeChart: require('../src/components/GaugeChart/gauge'),
        },
      },
      {
        title: 'Histogram',
        path: '/components/histogram',
        component: require('./components/histogram.md'),
        imports: {
          Widget: require('../src/components/Widget/widget'),
          Histogram: require('../src/components/Histogram/histogram'),
          data: require('../src/components/Histogram/histogram.fixtures'),
        },
      },
      {
        title: 'Input',
        path: '/components/input',
        component: require('./components/input.md'),
        imports: {
          Input: require('../src/components/Input/input'),
        },
      },
      {
        title: 'Legend',
        path: '/components/legend',
        component: require('./components/legend.md'),
        imports: {
          Legend: require('../src/components/Legend/legend'),
          Steps: require('../src/components/Steps/steps'),
          Collapsible: require('../src/components/Collapsible/collapsible'),
          Subheader: require('../src/components/Typography/subheader'),
          Text: require('../src/components/Typography/text'),
          Toggle: require('../src/components/Toggle/toggle'),
        },
      },
      {
        title: 'Loading',
        path: '/components/loading',
        component: require('./components/loading.md'),
        imports: {
          Loading: require('../src/components/Loading/loading'),
        },
      },
      {
        title: 'Popup',
        path: '/components/popup',
        component: require('./components/popup.md'),
        imports: {
          Popup: require('../src/components/Popup/popup'),
          Badge: require('../src/components/Badge/badge'),
          Caption: require('../src/components/Typography/caption'),
          Subheader: require('../src/components/Typography/subheader'),
          Text: require('../src/components/Typography/text'),
          Toggle: require('../src/components/Toggle/toggle'),
        },
      },
      {
        title: 'RadioButton',
        path: '/components/radiobutton',
        component: require('./components/radiobutton.md'),
        imports: {
          RadioButton: require('../src/components/RadioButton/radiobutton'),
        },
      },
      {
        title: 'Range',
        path: '/components/range',
        component: require('./components/range.md'),
        imports: {
          Range: require('../src/components/Range/range'),
        },
      },
      {
        title: 'Stacked bar',
        path: '/components/stackedbar',
        component: require('./components/stackedbar.md'),
        imports: {
          Widget: require('../src/components/Widget/widget'),
          StackedBar: require('../src/components/StackedBar/stackedBar'),
          data: require('../src/components/StackedBar/stackedBar.fixtures'),
        },
      },
      {
        title: 'Steps',
        path: '/components/steps',
        component: require('./components/steps.md'),
        imports: {
          Steps: require('../src/components/Steps/steps'),
          Dropshadow: require('../src/components/Dropshadow/dropshadow'),
          Subheader: require('../src/components/Typography/subheader'),
          Text: require('../src/components/Typography/text'),
        },
      },
      {
        title: 'Table',
        path: '/components/table',
        component: require('./components/table.md'),
        imports: {
          Table: require('../src/components/Table/table'),
        },
      },
      {
        title: 'Tabs',
        path: '/components/tabs',
        component: require('./components/tabs.md'),
        imports: {
          Tabs: require('../src/components/Tabs/tabs'),
        },
      },
      {
        title: 'Toggle',
        path: '/components/toggle',
        component: require('./components/toggle.md'),
        imports: {
          Toggle: require('../src/components/Toggle/toggle'),
          Text: require('../src/components/Typography/text'),
        },
      },
      {
        title: 'Tooltip',
        path: '/components/tooltip',
        component: require('./components/tooltip.md'),
        imports: {
          Tooltip: require('../src/components/Tooltip/tooltip'),
        },
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
