const Utils = require('../../../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('tabs'),
  u.spec('tabs', { mobile: true }),
  u.spec('tabs-with-actions'),
  u.spec('tabs-with-actions', { mobile: true }),
  u.spec('tabs-with-actions-visible'),
  u.spec('tabs-with-actions-visible', { mobile: true }),
];
