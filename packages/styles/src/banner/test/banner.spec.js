const Utils = require('../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('banner-base'),
  u.spec('banner-error'),
  u.spec('banner-notification'),
  u.spec('banner-warning')
];
