const sidebar = require('./sidebar')

module.exports = {
  base: '/JlgModelDocs/',
  title: '金六谷内包系统组件文档',
  theme: 'antdocs',
  description: '在开发过程中，大部分页面结构都是大同小异，在此总结一下封装的一些组件的使用方式，提高日常的开发效率。尽量避免复制粘贴无意义的代码',
  themeConfig: {
    displayAllHeaders: false,
    sidebar,
    nav: [
      { text: '示例', link: '/examples/' },
      { text: '团队协作流程', link: '/apiFox/index' }
    ]
  }
}
