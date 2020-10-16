// const path = require('path');
const config = require('./webpack.config.js');

config.mode = 'production';
config.output.filename = 'asreactui.min.js';

module.exports = config;
