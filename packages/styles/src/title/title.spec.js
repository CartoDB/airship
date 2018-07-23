const path = require('path');

const reference = path.resolve(__dirname, 'img/title-reference.png');
const screenshot = path.resolve(__dirname, 'img/title-out.png');

// Url to take the screenshot from
const url = `file://${path.resolve(__dirname, 'title.html')}`;


module.exports = { reference, screenshot, url };