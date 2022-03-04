# screen-container  主页面查询

#####  FscreenContainer  属性

| 参数       | 说明                                       | 类型               | 可选值 | 默认值     |
| :--------- | :----------------------------------------- | :----------------- | :----- | :--------- |
| panes      | 以标签页形式展示筛选条件；例：采购订单页面 | Array              | —      | []         |
| activeName | 与panes搭配使用，指定当前选中的标签页      | String             | —      | —          |
| clearKey   | 清空查询条件                               | [String, Function] |        | filterInfo |

##### FscreenContainer  事件

| 事件名称 | 说明               | 回调参数 |
| :------- | :----------------- | :------- |
| search   | 点击查询按钮时触发 | —        |
| tabClick | tsb页切换时触发    |          |

### screen-item 属性

| 参数        | 说明      | 类型          | 可选值 | 默认值 |
| :---------- | :-------- | :------------ | :----- | :----- |
| v-model     | 绑定值    | any           | —      | —      |
| label     | 标签文本    | string           | —      | —      |
| label-width | label宽度 | String,Number | —      | 80     |
| type     | 查询条件类型    | string           | input,select,cascader,date,daterange      | —      |
| options | 下拉列表，搭配cascader，select使用 | Array   | —      | —      |
| valueFilter | 值过滤，搭配type='cascader'使用 | string | String, lastValue, Array | —      |
| placeholder | input提示 | string        | —      | —      |
