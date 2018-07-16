const path = require('path');
const sass = require('@stencil/sass');

exports.config = {
  namespace: 'mycomponent',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: false
    }
  ],
  enableCache: false,
  plugins: [
    sass()
  ],
  includeSrc: [
    '**/*.ts',
    '**/*.tsx',
    path.join(__dirname, '../', 'styles/src/**/*.scss')
  ]
};
