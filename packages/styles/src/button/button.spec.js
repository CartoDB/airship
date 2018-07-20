const path = require('path');


// Reference image
const input = path.resolve(__dirname, 'img/button-reference.png');
// Path where the screenshot will be saved
const output = path.resolve(__dirname, 'img/button.png');

// Url to take the screenshot from
const url = `file://${path.resolve(__dirname, 'button.html')}`;


module.exports = { input, output, url };
