const Utils = require('../../../../test-utils');
const u = new Utils(__dirname);

// Desktop
const reference = u.image('layout.withactions-reference.png');
const screenshot = u.image('layout.withactions-out.png');
const url = u.html('with-actions.html');

// Mobile
const viewportWidth = 375;
const viewportHeight = 667;

const mobileReference = u.image('layout.withactionsmobile-reference.png');
const mobileScreenshot = u.image('layout.withactionsmobile-out.png');
const mobileURL = u.html('with-actions-mobile.html');


module.exports = [
  u.spec(reference, screenshot, url),
  u.spec(mobileReference, mobileScreenshot, mobileURL, true)
];
