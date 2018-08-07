const Utils = require('../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('flag', 'flag'),
  u.spec('flag-block', 'flag-block'),
  u.spec('flag-l', 'flag-l'),
  u.spec('flag-xl', 'flag-xl')
];
