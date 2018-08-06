const path = require('path');

function utils (dirname) {
  this.spec = function (label, filename) {
    return {
      label,
      url: this.html(filename)
    };
  }
}

module.exports = utils;
