# jlgDialog

全局组件 `jlg-dialog`

## Properties

#### `title: string`

弹窗标题，必填

---

#### `model.sync: Object`

表单数据对象，必填

如果要对 `model` 进行“双向绑定”,必须添加 `.sync` 修饰符

---

#### `type: string`

弹窗类型
可选值：add,  read,  edit,  review

---

#### `anchorPointNavigation: Boolean`

是否显示锚点导航组件

---

#### `catalogsList: Array`

anchorPointNavigation 必须为 `true`, 锚点导航组件目录列表

---

#### `processStatusApi: string`

审核流程状态API地址，都是get请求
```js
 :process-status-api="value&&`/Product/GetProAuditProcessList?returnId=${value.Id}`"
```

## Events

#### `@opened`

在Modal变为可见或开始转换后发出.

---

#### `@submit`

表单验证全部通过后触发.

@param {String} type = add(新增)，edit(编辑)，toBeSubmitted（暂存）

---
#### `@review`

点击审核通过或驳回时触发.

@param {String} type = allow(通过)，reject(驳回)

---
