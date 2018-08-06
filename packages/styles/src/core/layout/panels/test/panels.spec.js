const Utils = require('../../../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('Panels', 'panels.html'),
  u.spec('Panels in mobile', 'panels-mobile.html')
];
