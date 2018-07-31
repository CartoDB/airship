// TODO: Add UI test
const path = require('path');


// tabs
const TABS_REFERENCE = path.resolve(__dirname, 'img/tabs-reference.png');
const TABS_SCREENSHOT = path.resolve(__dirname, 'img/tabs-out.png');
const TABS_URL = `file://${path.resolve(__dirname, 'tabs.html')}`;

// tabs-xl
const TABS_XL_REFERENCE = path.resolve(__dirname, 'img/tabs-xl-reference.png');
const TABS_XL_SCREENSHOT = path.resolve(__dirname, 'img/tabs-xl-out.png');
const TABS_XL_URL = `file://${path.resolve(__dirname, 'tabs-xl.html')}`;

module.exports = [
  { reference: TABS_REFERENCE, screenshot: TABS_SCREENSHOT, url: TABS_URL },
  { reference: TABS_XL_REFERENCE, screenshot: TABS_XL_SCREENSHOT, url: TABS_XL_URL },
];
