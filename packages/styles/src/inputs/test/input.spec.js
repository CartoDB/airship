const Utils = require('../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('input-base'),
  u.spec('input-disabled'),
  u.spec('input-invalid'),
  u.spec('input-readonly')
];
