module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parser: '@babel/eslint-parser',
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'function-paren-newline': ['error', 'never'],
    'array-element-newline': [
      'error',
      {
        ArrayExpression: 'consistent',
        ArrayPattern: { minItems: 3 },
      },
    ],
  },
}
