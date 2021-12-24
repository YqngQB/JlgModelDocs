# 介绍

该库支持两种类型的Modal- static 和 dynamic.

- **Static** 通过模板明确定义。
- **Dynamic** 是根据传递给“show modal”函数的配置生成的。

## 静态导入

Modal是通过简单地使用 `<modal >` 组件来定义的。要控制它的可见性 - 使用 `modal.show` `modal.hide` 函数，例如：

```html{2,4,12,15}
<template>
    <modal name="my-first-modal">
        这是我的第一个Modal
    </modal>
</template>

<script>
export default {
    name: 'MyComponent',
    methods: {
        show () {
            this.$modal.show('my-first-modal');
        },
        hide () {
            this.$modal.hide('my-first-modal');
        }
    },
    mounted () {
        this.show()
    }
}
</script>
```

## 动态导入

为了在运行时实例化Modal，可以动态创建modal。要显示动态modal，可以使用带有扩展 API 的相同 `modal.show` 函数：

```js
this.$modal.show(
  component,
  componentProps,
  modalProps,
  modalEvents
)
```

- `component` - 内联或导入的 Vue 组件
- `componentProps` - `component` 中使用的 prop
- `modalProps` -Modal组件属性（参见属性部分）
- `modalEvents` -Modal事件处理程序（参见事件部分）

示例1:

```js
import MyComponent from './MyComponent.vue'

...

this.$modal.show(
  MyComponent,
  { text: 'This text is passed as a property' },
  { draggable: true }
)
```

---

示例2

```js
this.$modal.show(
  {
    template: `
      <div>
        <h1>This is created inline</h1>
        <p>{{ text }}</p>
      </div>
    `,
    props: ['text']
  },
  { text: 'This text is passed as a property' },
  { height: 'auto' },
  { 'before-close': event => {} }
)
```

还可以通过发出 `'close'` 事件来关闭动态Modal：

```js{5}
this.$modal.show({
  template: `
    <div>
      <p>Close using this button:</p>
      <button @click="$emit('close')">Close</button>
    </div>
  `
})
```

可以为Modal设置默认属性值：

```js{4-8}
import VueModal from '@/components/Modal/index'

Vue.use(VueModal, {
  dialog: true,
  dynamicDefaults: {
    draggable: true
  }
})
```
