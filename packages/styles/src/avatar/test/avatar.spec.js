const Utils = require('../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('avatar-base'),
  u.spec('avatar-l'),
  u.spec('avatar-xl'),
];
