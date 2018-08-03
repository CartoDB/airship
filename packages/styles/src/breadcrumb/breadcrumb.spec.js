const path = require('path');

// -- Breadcrumb
const BREADCRUMB_REFERENCE = path.resolve(__dirname, 'test/img/breadcrumb-reference.png');
const BREADCRUMB_SCREENSHOT = path.resolve(__dirname, 'test/img/breadcrumb-out.png');
const BREADCRUMB_URL = `file://${path.resolve(__dirname, 'test/breadcrumb.html')}`;

module.exports = [
  { reference: BREADCRUMB_REFERENCE, screenshot: BREADCRUMB_SCREENSHOT, url: BREADCRUMB_URL },
];
