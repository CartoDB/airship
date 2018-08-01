const path = require('path');


// base
const BUTTON_BASE_REFERENCE = path.resolve(__dirname, 'test/img/button-base-reference.png');
const BUTTON_BASE_SCREENSHOT = path.resolve(__dirname, 'test/img/button-base-out.png');
const BUTTON_BASE_URL = `file://${path.resolve(__dirname, 'test/button-base.html')}`;

// primary
const BUTTON_PRIMARY_REFERENCE = path.resolve(__dirname, 'test/img/button-primary-reference.png');
const BUTTON_PRIMARY_SCREENSHOT = path.resolve(__dirname, 'test/img/button-primary-out.png');
const BUTTON_PRIMARY_URL = `file://${path.resolve(__dirname, 'test/button-primary.html')}`;

// secondary
const BUTTON_SECONDARY_REFERENCE = path.resolve(__dirname, 'test/img/button-secondary-reference.png');
const BUTTON_SECONDARY_SCREENSHOT = path.resolve(__dirname, 'test/img/button-secondary-out.png');
const BUTTON_SECONDARY_URL = `file://${path.resolve(__dirname, 'test/button-secondary.html')}`;

// elements
const BUTTON_ELEMENTS_REFERENCE = path.resolve(__dirname, 'test/img/button-elements-reference.png');
const BUTTON_ELEMENTS_SCREENSHOT = path.resolve(__dirname, 'test/img/button-elements-out.png');
const BUTTON_ELEMENTS_URL = `file://${path.resolve(__dirname, 'test/button-elements.html')}`;

module.exports = [
  { reference: BUTTON_BASE_REFERENCE, screenshot: BUTTON_BASE_SCREENSHOT, url: BUTTON_BASE_URL },
  { reference: BUTTON_PRIMARY_REFERENCE, screenshot: BUTTON_PRIMARY_SCREENSHOT, url: BUTTON_PRIMARY_URL },
  { reference: BUTTON_SECONDARY_REFERENCE, screenshot: BUTTON_SECONDARY_SCREENSHOT, url: BUTTON_SECONDARY_URL },
  { reference: BUTTON_ELEMENTS_REFERENCE, screenshot: BUTTON_ELEMENTS_SCREENSHOT, url: BUTTON_ELEMENTS_URL },
];
