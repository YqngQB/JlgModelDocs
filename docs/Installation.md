
## 如何引入

在主文件中导入插件：

```js
import VueModal from '@/components/Modal/index'
```

```js
Vue.use(VueModal, {
    dialog: true,
    dynamicDefaults: {
        draggable: true
    }
})
```
