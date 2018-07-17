const path = require('path');
const sass = require('@stencil/sass');

exports.config = {
  namespace: 'airship',
  outputTargets:[
    { type: 'dist' },
    { type: 'www', serviceWorker: false }
  ],
  plugins: [
    sass({
      outFile: path.join(__dirname, '.generated-styles')
    })
  ]
};
