const path = require('path');

// -- Banner
const BANNER_REFERENCE = path.resolve(__dirname, 'test/img/banner-reference.png');
const BANNER_SCREENSHOT = path.resolve(__dirname, 'test/img/banner-out.png');
const BANNER_URL = `file://${path.resolve(__dirname, 'test/banner-base.html')}`;

// -- Banner notification
const BANNER_NOTIFICATION_REFERENCE = path.resolve(__dirname, 'test/img/banner-notification-reference.png');
const BANNER_NOTIFICATION_SCREENSHOT = path.resolve(__dirname, 'test/img/banner-notification-out.png');
const BANNER_NOTIFICATION_URL = `file://${path.resolve(__dirname, 'test/banner-notification.html')}`;

// -- Banner warning
const BANNER_WARNING_REFERENCE = path.resolve(__dirname, 'test/img/banner-warning-reference.png');
const BANNER_WARNING_SCREENSHOT = path.resolve(__dirname, 'test/img/banner-warning-out.png');
const BANNER_WARNING_URL = `file://${path.resolve(__dirname, 'test/banner-warning.html')}`;

// -- Banner error
const BANNER_ERROR_REFERENCE = path.resolve(__dirname, 'test/img/banner-error-reference.png');
const BANNER_ERROR_SCREENSHOT = path.resolve(__dirname, 'test/img/banner-error-out.png');
const BANNER_ERROR_URL = `file://${path.resolve(__dirname, 'test/banner-error.html')}`;


module.exports = [
  { reference: BANNER_REFERENCE, screenshot: BANNER_SCREENSHOT, url: BANNER_URL },
  { reference: BANNER_NOTIFICATION_REFERENCE, screenshot: BANNER_NOTIFICATION_SCREENSHOT, url: BANNER_NOTIFICATION_URL },
  { reference: BANNER_WARNING_REFERENCE, screenshot: BANNER_WARNING_SCREENSHOT, url: BANNER_WARNING_URL },
  { reference: BANNER_ERROR_REFERENCE, screenshot: BANNER_ERROR_SCREENSHOT, url: BANNER_ERROR_URL },
];
