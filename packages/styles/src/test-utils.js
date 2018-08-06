const path = require('path');

function utils (dirname) {
  this.html = function (filename) {
    const filePath = path.resolve(dirname, `${filename}`);
    return `file://${filePath}`;
  };

  this.spec = function (label, filename) {
    return {
      label,
      url: this.html(filename)
    };
  }
}

module.exports = utils;
