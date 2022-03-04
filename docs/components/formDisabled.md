# form-disabled 控制组件内表单元素是否禁用

##### 封装说明

> - 全局组件，不需要单独引入
> - 通常编辑与查看可以复用一个页面，使用 form-disabled 包裹表单可以方便的控制表单是否禁用

| 属性     | 说明                                                         | 类型   | 默认值 |
| -------- | ------------------------------------------------------------ | ------ | ------ |
| disabled | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效 | String | false  |
##### 示例
```vue
      <formDisabled :disabled="type === 'read' || type === 'review'">
          <slot />
        </formDisabled>
```
