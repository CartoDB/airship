const Utils = require('../../../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('With actions', 'with-actions.html'),
  u.spec('With actions mobile', 'with-actions-mobile.html')
];
