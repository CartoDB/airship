const path = require('path');

// Mobile Viewport Settings
const viewportWidth = 375;
const viewportHeight = 667;

// Desktop test
// Tabs should be hidden
const reference = path.resolve(__dirname, 'img/layout.tabs-reference.png');
const screenshot = path.resolve(__dirname, 'img/layout.tabs-out.png');

// Desktop test
// Tabs should be hidden
const mobileReference = path.resolve(__dirname, 'img/layout.tabs-mobile-reference.png');
const mobileScreenshot = path.resolve(__dirname, 'img/layout.tabs-mobile-out.png');

// URL to take the screenshot from
const url = `file://${path.resolve(__dirname, 'tabs.html')}`;


module.exports = [
  { reference, screenshot, url }, // Desktop
  { reference: mobileReference, screenshot: mobileScreenshot, url, viewportWidth, viewportHeight } // Mobile
];
