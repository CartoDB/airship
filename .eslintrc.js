const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    // -- ESLint
    'arrow-body-style': [WARNING, 'as-needed'],
    'arrow-parens': [WARNING, 'as-needed'],
    'prefer-arrow-callback': WARNING,
    'space-before-function-paren': [ERROR, 'never'],
    'func-names': OFF,
    'no-param-reassign': WARNING,
    'max-len': [WARNING, 120, { tabWidth: 2, ignoreComments: true }],
    'prefer-template': WARNING,
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'camelcase': [OFF, { properties: 'never' }],
    'newline-per-chained-call': OFF,
    'consistent-return': OFF,
    'no-shadow': OFF,
    'function-paren-newline': OFF,
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-newline': OFF,
    'no-use-before-define': OFF,

    // -- Import plugin
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': OFF,

    // -- React plugin
    'react/jsx-filename-extension': OFF,
    'react/prefer-stateless-function': OFF,
    'react/forbid-prop-types': OFF,
    'react/require-default-props': OFF,
    'react/sort-comp': OFF,
    'react/jsx-no-bind': OFF,
    'react/default-props-match-prop-types': OFF,
    'react/no-unused-prop-types': OFF,

    // -- a11y plugin
    'jsx-a11y/anchor-is-valid': OFF,
    'jsx-a11y/label-has-for': OFF,
  },
  globals: {
    atom: true,
  },
  env: {
    browser: true,
    jest: true,
  },
};
