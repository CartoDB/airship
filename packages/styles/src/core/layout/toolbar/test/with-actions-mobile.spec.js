const path = require('path');

// Mobile Viewport Settings
const viewportWidth = 375;
const viewportHeight = 667;

const reference = path.resolve(__dirname, 'img/layout.withactionsmobile-reference.png');
const screenshot = path.resolve(__dirname, 'img/layout.withactionsmobile-out.png');

// URL to take the screenshot from
const url = `file://${path.resolve(__dirname, 'with-actions-mobile.html')}`;


module.exports = { reference, screenshot, url, viewportWidth, viewportHeight };
