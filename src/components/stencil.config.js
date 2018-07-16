const path = require('path');
const sass = require('@stencil/sass');

console.log([
  path.join(__dirname, './', 'src'),
  path.join(__dirname, '../', 'styles/src/**/*.scss')
])

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
