const path = require('path');

const reference = path.resolve(__dirname, 'img/layout.withactions-reference.png');
const screenshot = path.resolve(__dirname, 'img/layout.withactions-out.png');

// URL to take the screenshot from
const url = `file://${path.resolve(__dirname, 'with-actions.html')}`;


module.exports = { reference, screenshot, url };
