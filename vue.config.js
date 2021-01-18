/*
 * @author: linhuibin
 * @date: 2020-11-16 11:18:58
 * @lastEditTime: 2020-11-16 11:39:17
 * @lastEditors: linhuibin
 * @description:
 * @FilePath: \server-RCg:\projects\own-ui\vue.config.js
 */
const path = require('path')
const resolve = (filePath) => path.join(__dirname, './', filePath)
module.exports = {
  outputDir: 'docs',
  publicPath: '/',
  pages: {
    index: {
      entry: resolve('story/main.ts'),
      template: 'public/index.html',
      filename: 'index.html',
      title: '组件示例'
    }
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch-index').delete('preload-index')
    config.resolve.alias.set('story', resolve('story')).set('src', resolve('src'))
  }
}
