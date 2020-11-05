import React from 'react';
import HistogramWidgetUI from '../../widgets/HistogramWidgetUI';

// This default export determines where your story goes in the story list
export default {
  title: 'Widgets/HistogramWidgetUI',
  component: HistogramWidgetUI,
};

const DATA = [
  {
    "revenue": 170155,
    "date": "2019-01-01",
    "avg": 124866.42434721242
  },
  {
    "revenue": 175562,
    "date": "2019-02-01",
    "avg": 124866.42434721242
  },
  {
    "revenue": 156243,
    "date": "2019-03-01",
    "avg": 124866.42434721242
  },
  {
    "revenue": 111641,
    "date": "2019-04-01",
    "avg": 124866.42434721242
  },
  {
    "revenue": 53716,
    "date": "2019-05-01",
    "avg": 124866.42434721242
  },
  {
    "revenue": 145437,
    "date": "2019-06-01",
    "avg": 124866.42434721242
  },
  {
    "revenue": 58538,
    "date": "2019-07-01",
    "avg": 124866.42434721242
  },
  {
    "revenue": 192782,
    "date": "2019-08-01",
    "avg": 124866.42434721242
  },
  {
    "revenue": 57275,
    "date": "2019-09-01",
    "avg": 124866.42434721242
  },
  {
    "revenue": 195200,
    "date": "2019-10-01",
    "avg": 124866.42434721242
  },
  {
    "revenue": 69473,
    "date": "2019-11-01",
    "avg": 124866.42434721242
  },
  {
    "revenue": 195346,
    "date": "2019-12-01",
    "avg": 124866.42434721242
  }
]

const Template = (args) => <HistogramWidgetUI {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  name: 'STORE',
  data: DATA.map((month) => month.revenue),
  xAxis: ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
  config: {
    xAxisData: ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  }
};

export const UNIQUE = Template.bind({});
UNIQUE.args = {
  name: 'STORE',
  data: DATA.map((month) => month.revenue),
  config: {
    xAxisData: ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
    tooltipFormatter: ([serie]) =>{return serie.value + ' $'}
  }
};
