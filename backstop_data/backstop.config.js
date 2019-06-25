const glob = require("glob")
const path = require('path');

const defaultScenarioOptions = {
  misMatchThreshold: 0,
  requireSameDimensions: true,
  readyEvent: '_READY'
};

const defaultOptions = {
  "id": "airship",
  "viewports": [
    {
      "label": "phone",
      "width": 320,
      "height": 480
    },
    {
      "label": "tablet",
      "width": 1024,
      "height": 768
    }
  ],
  "onBeforeScript": "puppet/onBefore.js",
  "onReadyScript": "puppet/onReady.js",
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "backstop_data/engine_scripts",
    "html_report": "backstop_data/html_report",
    "ci_report": "backstop_data/ci_report"
  },
  "report": ["browser"],
  "engine": "puppeteer",
  "engineOptions": {
    "args": ["--no-sandbox"]
  },
  "asyncCaptureLimit": 5,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
};

const report = {
  report: process.env.CI ? ['ci'] : ['browser']
};

const specs = glob.sync(path.resolve(__dirname, '../packages/styles/src', '**/*.spec.js'));

const specDefinitions = specs.reduce((accum, spec) => {
  const files = require(spec);
  return [...accum, ...files];
}, []);

const scenarios = specDefinitions.map(definition => {
  return { ...defaultScenarioOptions, ...definition };
});

const options = { ...defaultOptions, scenarios, ...report };

module.exports = options;
