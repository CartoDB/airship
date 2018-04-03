import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

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
      plugins: [
        "@babel/plugin-external-helpers"
      ]
    }),
    uglify(),
  ],
  external: [
    'react',
    'react-dom',
    'prop-types',
  ],
};
