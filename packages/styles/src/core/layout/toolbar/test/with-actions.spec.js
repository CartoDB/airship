const path = require('path');

// Desktop
const reference = path.resolve(__dirname, 'img/layout.withactions-reference.png');
const screenshot = path.resolve(__dirname, 'img/layout.withactions-out.png');
const url = `file://${path.resolve(__dirname, 'with-actions.html')}`;

// Mobile
const viewportWidth = 375;
const viewportHeight = 667;

const mobileReference = path.resolve(__dirname, 'img/layout.withactionsmobile-reference.png');
const mobileScreenshot = path.resolve(__dirname, 'img/layout.withactionsmobile-out.png');
const mobileURL = `file://${path.resolve(__dirname, 'with-actions-mobile.html')}`;


module.exports = [
  { reference, screenshot, url },
  { reference: mobileReference, screenshot: mobileScreenshot, url: mobileURL, viewportWidth, viewportHeight }
];
