const Utils = require('../../test-utils');
const u = new Utils(__dirname);

// tabs
const TABS_REFERENCE = u.image('tabs-reference.png');
const TABS_SCREENSHOT = u.image('tabs-out.png');
const TABS_URL = u.html('tabs.html');

// tabs-xl
const TABS_XL_REFERENCE = u.image('tabs-xl-reference.png');
const TABS_XL_SCREENSHOT = u.image('tabs-xl-out.png');
const TABS_XL_URL = u.html('tabs-xl.html');

// tabs-accesible
const TABS_ACCESIBLE_REFERENCE = u.image('tabs-accesible-reference.png');
const TABS_ACCESIBLE_SCREENSHOT = u.image('tabs-accesible-out.png');
const TABS_ACCESIBLE_URL = u.html('tabs-accesible.html');

module.exports = [
  u.spec(TABS_REFERENCE, TABS_SCREENSHOT, TABS_URL),
  u.spec(TABS_XL_REFERENCE, TABS_XL_SCREENSHOT, TABS_XL_URL),
  u.spec(TABS_ACCESIBLE_REFERENCE, TABS_ACCESIBLE_SCREENSHOT, TABS_ACCESIBLE_URL)
];
