const path = require('path');

const RADIO_BASE_REFERENCE = path.resolve(__dirname, 'test/img/radio-base-reference.png');
const RADIO_BASE_SCREENSHOT = path.resolve(__dirname, 'test/img/radio-base-out.png');
const RADIO_BASE_URL = `file://${path.resolve(__dirname, 'test/radio-base.html')}`;

module.exports = [
  { reference: RADIO_BASE_REFERENCE, screenshot: RADIO_BASE_SCREENSHOT, url: RADIO_BASE_URL },
];
