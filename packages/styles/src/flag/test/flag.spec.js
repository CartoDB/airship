const Utils = require('../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('flag'),
  u.spec('flag-block'),
  u.spec('flag-l'),
  u.spec('flag-xl')
];
