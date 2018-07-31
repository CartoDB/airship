const path = require('path');


// tabs
const TABS_REFERENCE = path.resolve(__dirname, 'test/img/tabs-reference.png');
const TABS_SCREENSHOT = path.resolve(__dirname, 'test/img/tabs-out.png');
const TABS_URL = `file://${path.resolve(__dirname, 'test/tabs.html')}`;

// tabs-xl
const TABS_XL_REFERENCE = path.resolve(__dirname, 'test/img/tabs-xl-reference.png');
const TABS_XL_SCREENSHOT = path.resolve(__dirname, 'test/img/tabs-xl-out.png');
const TABS_XL_URL = `file://${path.resolve(__dirname, 'test/tabs-xl.html')}`;

// tabs-accesible
const TABS_ACCESIBLE_REFERENCE = path.resolve(__dirname, 'test/img/tabs-accesible-reference.png');
const TABS_ACCESIBLE_SCREENSHOT = path.resolve(__dirname, 'test/img/tabs-accesible-out.png');
const TABS_ACCESIBLE_URL = `file://${path.resolve(__dirname, 'test/tabs-accesible.html')}`;

module.exports = [
  { reference: TABS_REFERENCE, screenshot: TABS_SCREENSHOT, url: TABS_URL },
  { reference: TABS_XL_REFERENCE, screenshot: TABS_XL_SCREENSHOT, url: TABS_XL_URL },
  { reference: TABS_ACCESIBLE_REFERENCE, screenshot: TABS_ACCESIBLE_SCREENSHOT, url: TABS_ACCESIBLE_URL },
];
