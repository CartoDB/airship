const glob = require("glob")
const path = require('path');

const tests = [
  '',
  '/packages/styles/src/core/layout/toolbar/test/with-actions.html
];

module.exports = options => {
  options.scenarios = [
    {
      "label": "Tabs",
      "url": "/packages/styles/src/core/layout/toolbar/test/tabs.html",
      "misMatchThreshold" : 0.1,
      "requireSameDimensions": true
    },
    {
      "label": "With actions",
      "url": "/packages/styles/src/core/layout/toolbar/test/with-actions.html",
      "misMatchThreshold" : 0.1,
      "requireSameDimensions": true
    }
  ];

  return options;
}