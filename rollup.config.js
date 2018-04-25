import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

const { version } = require('./package.json');

export default {
  input: 'src/components/index.js',
  output: {
    file: 'dist/airship.js',
    format: 'cjs',
  },
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
      ],
    }),
    uglify({
      output: {
        preamble: `/*!
 * CARTO Airship https://carto.com/
 * Version: ${version}
 * 
 */`,
      },
    }),
  ],
  external: [
    'react',
    'react-dom',
    'prop-types',
    'styled-components',
  ],
};
