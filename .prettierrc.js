/**
 * @type {import('prettier').Config}
 */
module.exports = {
  trailingComma: 'all',
  useTabs: false,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 120,
  bracketSpacing: true,
  arrowParens: 'always',
  bracketSameLine: true,
  endOfLine: 'auto', //fix this error -> [eslint] Delete `CR` [prettier/prettier]
};
