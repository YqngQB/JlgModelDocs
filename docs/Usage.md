---
sidebarDepth: 2
---

# 用法

## 配置


dynamicDefaults 选项可以作为第二个参数传递给`Vue.use`。

```js
import VModal from '@/components/Modal/index'

Vue.use(VModal, { ... })
```

####  `dialog: Boolean` 

是否将 `jlg-dialog`组件注册成全局组件

---


#### `componentName: String`

将组件名称从“modal”更改为任何其他字符串值。
```js
Vue.use(VModal, { componentName: 'Foo' })
```
```html
<foo name="example">This is a modal</foo>
```


---


#### `dynamicDefaults: object`

注入动态Modal的默认属性。

```js
Vue.use(VModal, { dynamicDefaults: { draggable: true, resizable: true } })
```

## API

插件API可以通过“this.$modal”在任何组件内调用：


---

#### `$modal.show(component, componentProps, modalProps, modalEvents)`

用于在运行时显示动态模型

#### `$modal.hide(name)`

使用给定的'name'属性隐藏Modal

#### `$modal.hideAll()`

隐藏应用程序中的所有 modal
