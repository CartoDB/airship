const path = require('path');

function utils (dirname) {
  function isObject (obj) {
    const type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }

  function isString (obj) {
    return toString.call(obj) === '[object String]';
  }

  this.html = function (filename) {
    const filePath = path.resolve(dirname, `${filename}`);
    return `file://${filePath}.html`;
  };

  this.spec = function (label, filename, options) {
    let scenario = {
      label,
      url: filename
        ? this.html(filename)
        : this.html(label)
    };

    if (filename && !isString(filename)) {
      throw new Error('filename must be a string.');
    }

    if (options && !isObject(options)) {
      throw new Error('options arguments must be an object.');
    }

    if (options) {
      scenario = {...scenario, ...options};
    }

    return scenario;
  }
}

module.exports = utils;
