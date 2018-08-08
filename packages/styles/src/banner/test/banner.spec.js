const Utils = require('../../test-utils');
const u = new Utils(__dirname);

const options = {
  delay: 100
};

module.exports = [
  u.spec('banner-base', 'banner-base', options),
  u.spec('banner-error', 'banner-error', options),
  u.spec('banner-notification', 'banner-notification', options),
  u.spec('banner-warning', 'banner-warning', options)
];
