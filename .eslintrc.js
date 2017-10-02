module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'indent': ['warn', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-unused-vars': ['warn'],
    'no-console': 0,
    'arrow-parens': ['error', 'always'],
    'arrow-body-style': ['error', 'as-needed', { 'requireReturnForObjectLiteral': false }],
    'no-param-reassign': [1, { 'props': false } ],
    'one-var': 0,
    'one-var-declaration-per-line': 0,
    'no-underscore-dangle': 0,
    'no-confusing-arrow': [1, { "allowParens": true } ],
    'class-methods-use-this': [0],
    'react/jsx-filename-extension': 0,
  },
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2017,
    'ecmaFeatures': {
      'jsx': true
    }
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.config.js',
      },
    },
  },
};
