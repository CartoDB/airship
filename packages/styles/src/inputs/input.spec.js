const path = require('path');

// -- Base
const INPUT_BASE_REFERENCE = path.resolve(__dirname, 'test/img/input-base-reference.png');
const INPUT_BASE_SCREENSHOT = path.resolve(__dirname, 'test/img/input-base-out.png');
const INPUT_BASE_URL = `file://${path.resolve(__dirname, 'test/input-base.html')}`;

// -- Disabled
const INPUT_DISABLED_REFERENCE = path.resolve(__dirname, 'test/img/input-disabled-reference.png');
const INPUT_DISABLED_SCREENSHOT = path.resolve(__dirname, 'test/img/input-disabled-out.png');
const INPUT_DISABLED_URL = `file://${path.resolve(__dirname, 'test/input-disabled.html')}`;

// -- Invalid
const INPUT_INVALID_REFERENCE = path.resolve(__dirname, 'test/img/input-invalid-reference.png');
const INPUT_INVALID_SCREENSHOT = path.resolve(__dirname, 'test/img/input-invalid-out.png');
const INPUT_INVALID_URL = `file://${path.resolve(__dirname, 'test/input-invalid.html')}`;

// -- Base
const INPUT_READONLY_REFERENCE = path.resolve(__dirname, 'test/img/input-readonly-reference.png');
const INPUT_READONLY_SCREENSHOT = path.resolve(__dirname, 'test/img/input-readonly-out.png');
const INPUT_READONLY_URL = `file://${path.resolve(__dirname, 'test/input-readonly.html')}`;


module.exports = [
  { reference: INPUT_BASE_REFERENCE, screenshot: INPUT_BASE_SCREENSHOT, url: INPUT_BASE_URL },
  { reference: INPUT_DISABLED_REFERENCE, screenshot: INPUT_DISABLED_SCREENSHOT, url: INPUT_DISABLED_URL },
  { reference: INPUT_INVALID_REFERENCE, screenshot: INPUT_INVALID_SCREENSHOT, url: INPUT_INVALID_URL },
  { reference: INPUT_READONLY_REFERENCE, screenshot: INPUT_READONLY_SCREENSHOT, url: INPUT_READONLY_URL },
];
