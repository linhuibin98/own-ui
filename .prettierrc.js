/*
 * @author: linhuibin
 * @date: 2020-11-16 10:59:50
 * @lastEditTime: 2020-11-16 10:59:51
 * @lastEditors: linhuibin
 * @description:
 * @FilePath: \server-RCg:\projects\own-ui\.prettierrc.js
 */
module.exports = {
  printWidth: 150,
  singleQuote: true,
  trailingComma: 'none',
  semi: false,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  proseWrap: 'preserve',
  overrides: [
    {
      files: ['*.json', '.eslintrc', '.tslintrc', '.prettierrc', '.tern-project'],
      options: {
        parser: 'json',
        tabWidth: 2
      }
    },
    {
      files: '*.{css,sass,scss,less}',
      options: {
        parser: 'css',
        tabWidth: 2
      }
    },
    {
      files: '*.ts',
      options: {
        parser: 'typescript'
      }
    },
    {
      files: '*.vue',
      options: {
        parser: 'vue'
      }
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown'
      }
    }
  ]
}
