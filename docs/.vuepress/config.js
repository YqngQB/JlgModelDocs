const sidebar = require('./sidebar')

module.exports = {
  base: '/jlg-modal/',
  title: '金六谷内包系统Model组件文档',
  description: '简单、灵活的 Modal 插件',
  themeConfig: {
    displayAllHeaders: false,

    sidebar,
    nav: [
      { text: '示例', link: '/examples/' }
    ]
  }
}
