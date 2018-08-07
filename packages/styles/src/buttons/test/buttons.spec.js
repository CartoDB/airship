const Utils = require('../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('button-base'),
  u.spec('button-elements'),
  u.spec('button-icons'),
  u.spec('button-primary'),
  u.spec('button-secondary'),
];
