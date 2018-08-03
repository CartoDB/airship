const Utils = require('../../../../test-utils');
const u = new Utils(__dirname);

// Desktop test
// Tabs should be hidden
const reference = u.image('layout.tabs-reference.png');
const screenshot = u.image('layout.tabs-out.png');

// Desktop test
// Tabs should be hidden
const mobileReference = u.image('layout.tabs-mobile-reference.png');
const mobileScreenshot = u.image('layout.tabs-mobile-out.png');

// URL to take the screenshot from
const url = u.html('tabs.html');

module.exports = [
  u.spec(reference, screenshot, url),
  u.spec(mobileReference, mobileScreenshot, url, true)
];
