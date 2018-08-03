const Utils = require('../../../../test-utils');
const u = new Utils(__dirname);

// Desktop
const desktopReference = u.image('panels-reference.png');
const desktopScreenshot = u.image('panels-out.png');
const url = u.html('panels.html');

// Mobile
const mobileReference = u.image('panels-mobile-reference.png');
const mobileScreenshot = u.image('panels-mobile-out.png');
const mobileURL = u.html('panels-mobile.html');

module.exports = [
  u.spec(desktopReference, desktopScreenshot, url),
  u.spec(mobileReference, mobileScreenshot, mobileURL, true)
];
