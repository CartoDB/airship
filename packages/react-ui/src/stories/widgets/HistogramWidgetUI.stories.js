import React from 'react';
import HistogramWidgetUI from '../../widgets/HistogramWidgetUI';

// This default export determines where your story goes in the story list
export default {
  title: 'Widgets/HistogramWidgetUI',
  component: HistogramWidgetUI,
};

const DATA = [
  {
    "value": 170155,
    "tick": "2019-01-01"
  },
  {
    "value": 175562,
    "tick": "2019-02-01"
  },
  {
    "value": 156243,
    "tick": "2019-03-01"
  },
  {
    "value": 111641,
    "tick": "2019-04-01"
  },
  {
    "value": 53716,
    "tick": "2019-05-01"
  },
  {
    "value": 145437,
    "tick": "2019-06-01"
  },
  {
    "value": 58538,
    "tick": "2019-07-01"
  },
  {
    "value": 192782,
    "tick": "2019-08-01"
  },
  {
    "value": 57275,
    "tick": "2019-09-01"
  },
  {
    "value": 195200,
    "tick": "2019-10-01"
  },
  {
    "value": 69473,
    "tick": "2019-11-01"
  },
  {
    "value": 195346,
    "tick": "2019-12-01"
  }
]

const Template = (args) => <HistogramWidgetUI {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  name: 'STORE',
  data: DATA,
};

export const UNIQUE = Template.bind({});
UNIQUE.args = {
  name: 'STORE',
  data: DATA,
  config: {
    tooltipFormatter: ([serie]) =>{return serie.value + ' $'},
    xAxisData: ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  }
};
