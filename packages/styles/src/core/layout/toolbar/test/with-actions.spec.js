const Utils = require('../../../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('With actions', 'tabs-with-actions'),
  u.spec('With actions mobile', 'tabs-with-actions-visible'),
  u.spec('With actions mobile left', 'tabs-with-actions-visible-left')
];
