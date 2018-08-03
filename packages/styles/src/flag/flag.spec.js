const path = require('path');

// -- Flag
const FLAG_REFERENCE = path.resolve(__dirname, 'test/img/flag-reference.png');
const FLAG_SCREENSHOT = path.resolve(__dirname, 'test/img/flag-out.png');
const FLAG_URL = `file://${path.resolve(__dirname, 'test/flag.html')}`;

// -- Flag L
const FLAG_L_REFERENCE = path.resolve(__dirname, 'test/img/flag-l-reference.png');
const FLAG_L_SCREENSHOT = path.resolve(__dirname, 'test/img/flag-l-out.png');
const FLAG_L_URL = `file://${path.resolve(__dirname, 'test/flag-l.html')}`;

// -- Flag XL
const FLAG_XL_REFERENCE = path.resolve(__dirname, 'test/img/flag-xl-reference.png');
const FLAG_XL_SCREENSHOT = path.resolve(__dirname, 'test/img/flag-xl-out.png');
const FLAG_XL_URL = `file://${path.resolve(__dirname, 'test/flag-xl.html')}`;

// -- Flag block
const FLAG_BLOCK_REFERENCE = path.resolve(__dirname, 'test/img/flag-block-reference.png');
const FLAG_BLOCK_SCREENSHOT = path.resolve(__dirname, 'test/img/flag-block-out.png');
const FLAG_BLOCK_URL = `file://${path.resolve(__dirname, 'test/flag-block.html')}`;

module.exports = [
  { reference: FLAG_REFERENCE, screenshot: FLAG_SCREENSHOT, url: FLAG_URL },
  { reference: FLAG_L_REFERENCE, screenshot: FLAG_L_SCREENSHOT, url: FLAG_L_URL },
  { reference: FLAG_XL_REFERENCE, screenshot: FLAG_XL_SCREENSHOT, url: FLAG_XL_URL },
  { reference: FLAG_BLOCK_REFERENCE, screenshot: FLAG_BLOCK_SCREENSHOT, url: FLAG_BLOCK_URL },
];
