const path = require('path');

// -- Avatar
const AVATAR_REFERENCE = path.resolve(__dirname, 'test/img/avatar-reference.png');
const AVATAR_SCREENSHOT = path.resolve(__dirname, 'test/img/avatar-out.png');
const AVATAR_URL = `file://${path.resolve(__dirname, 'test/avatar-base.html')}`;

// -- Avatar L
const AVATAR_L_REFERENCE = path.resolve(__dirname, 'test/img/avatar-l-reference.png');
const AVATAR_L_SCREENSHOT = path.resolve(__dirname, 'test/img/avatar-l-out.png');
const AVATAR_L_URL = `file://${path.resolve(__dirname, 'test/avatar-l.html')}`;

// -- Avatar XL
const AVATAR_XL_REFERENCE = path.resolve(__dirname, 'test/img/avatar-xl-reference.png');
const AVATAR_XL_SCREENSHOT = path.resolve(__dirname, 'test/img/avatar-xl-out.png');
const AVATAR_XL_URL = `file://${path.resolve(__dirname, 'test/avatar-xl.html')}`;

module.exports = [
  { reference: AVATAR_REFERENCE, screenshot: AVATAR_SCREENSHOT, url: AVATAR_URL },
  { reference: AVATAR_L_REFERENCE, screenshot: AVATAR_L_SCREENSHOT, url: AVATAR_L_URL },
  { reference: AVATAR_XL_REFERENCE, screenshot: AVATAR_XL_SCREENSHOT, url: AVATAR_XL_URL },
];
