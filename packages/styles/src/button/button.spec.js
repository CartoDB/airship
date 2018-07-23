const path = require('path');

const reference = path.resolve(__dirname, 'img/button-reference.png');
const screenshot = path.resolve(__dirname, 'img/button-out.png');

// Url to take the screenshot from
const url = `file://${path.resolve(__dirname, 'button.html')}`;


module.exports = { reference, screenshot, url };
