const path = require('path');

// -- Flags
const FLAGS_REFERENCE = path.resolve(__dirname, 'test/img/flags-reference.png');
const FLAGS_SCREENSHOT = path.resolve(__dirname, 'test/img/flags-out.png');
const FLAGS_URL = `file://${path.resolve(__dirname, 'test/flags.html')}`;

module.exports = [
  { reference: FLAGS_REFERENCE, screenshot: FLAGS_SCREENSHOT, url: FLAGS_URL },
];
