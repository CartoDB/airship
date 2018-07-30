const path = require('path');

// Mobile Viewport Settings
const viewportWidth = 375;
const viewportHeight = 667;

// Desktop
const desktopReference = path.resolve(__dirname, 'img/panels-reference.png');
const desktopScreenshot = path.resolve(__dirname, 'img/panels-out.png');
const url = `file://${path.resolve(__dirname, 'panels.html')}`;

// Mobile
const mobileReference = path.resolve(__dirname, 'img/panels-mobile-reference.png');
const mobileScreenshot = path.resolve(__dirname, 'img/panels-mobile-out.png');
const mobileURL = `file://${path.resolve(__dirname, 'panels-mobile.html')}`;

module.exports = [
  { reference: desktopReference, screenshot: desktopScreenshot, url },
  { reference: mobileReference, screenshot: mobileScreenshot, url: mobileURL, viewportWidth, viewportHeight },
];
