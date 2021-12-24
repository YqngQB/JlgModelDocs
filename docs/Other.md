# 其他注意事项

新Modal 相较于 旧组件 用法上精简了不少

## 原有的旧弹窗 改成 新modal 步骤

#### 第一步

主页面：

> 1.删除
>
> ```vue
>     <formDialog
>       :visible.sync="dialogTableVisible" :value="formData" :type="dialogType"
>       :title="dialogTableTitle"
>       @close="handleCancel" />
> 
> import formDialog from './Dialog/formDialog.vue'
> 
>   components: {
>     formDialog,
>   },
> ```
>
> 2.(只是示例不能直接复制)：
>
> ```vue
>   methods: {
>     handleCancel() {
>       this.$refs.table.refresh()
>     },
>     /**
>      * 新增
>      * */
>     handleAdd() {
>       this.$modal.show(ModalXXX, { title: 'XXX', type: 'add' }, { name: 'ModalXXX', height: 'auto' }, {
>         // 在模态被销毁之前发出。
>         'closed': (event) => {
>           this.handleCancel()
>         }
>       })
>     },
>     /**
>      * 查看
>      * */
>     handleRead(selection) {
>       this.$modal.show(ModalXXX, { title: '查看产品信息', type: 'read', value: selection }, { name: 'ModalXXX', height: 'auto' })
>     },
>     /**
>     * 修改
>     * */
>     handleEdit(selection) {
>       if ((selection.length === 0 || !selection)) {
>         this.$message({ message: '操作无效，请先选择数据！', type: 'warning' })
>         return false
>       }
>       // ......
>       this.$modal.show(ModalXXX, { title: '编辑产品信息', type: 'edit', value: selection }, { name: 'ModalXXX', height: 'auto' }, {
>             'closed': (event) => {
>               this.handleCancel()
>             }
>           }
>       )
>     }
> 
> 
>   }
> ```



```vue
<!-- 旧 -->
<jlg-dialog :title="title" :visible.sync="dialogVisible" width="1200px" @close="handleCancel"
            @opened="handleOpen"></jlg-dialog>
<!-- 新  ref，title，type 是必须的 -->
<jlg-dialog
    ref="jlgDialog"
    :model.sync="formData"
    :title="title"
    :type="type"
    :anchor-point-navigation="true"
    :catalogs-list="catalogsList"
    @submit="handleSave"
    @opened="handleOpen"></jlg-dialog>
<!-- 删除项：visible  width  @close -->
<!-- anchor-point-navigation：是否需要锚点导航组件，看情况添加-->
<!-- catalogs-list：与 anchor-point-navigation 属性配合使用 -->
<script>
export default {
  data() {
    return {
      // 注意：catalogsList格式
      catalogsList: [
        {
          name: '基本信息',
          ref: ''
        }, {
          name: '退货明细',
          ref: ''
        }
      ],
      formData:{}
    }
  },
  methods: {
    /**
     * 在Modal变为可见或开始转换后发出;可以进行一些赋值操作
     * */
    handleOpen() {
      // 非新增时，打开弹窗给表单赋值
      if (this.type !== 'add') {
        this.$global.fillObj(this.formData, this.value) // 弹框打开时，给this.formData赋值
        // 其他赋值操作 ...... 
      }
    },
    handleSave(type, data) {
      // ......
    }
  }
</script>

```

#### 第二步

```vue
<!-- 旧 -->
<formDisabled :disabled="this.type === 'read'">
<FormulateForm v-model="formData" name="Returns-Dialog-addReturns-formulate_1"
               @failed-validation="failedValidation"
               @submit="handleSave">
</FormulateForm>
</formDisabled>

<!-- 新   -->

<!-- 删除项：formDisabled组件 FormulateForm组件 -->

```

> ~~`import jlgDialog from '@/components/Dialog'`~~
>
> components: {
>   ~~jlgDialog,~~
> },

#### 第三步

```vue
<!-- 旧 -->
<el-alert
    v-if="value.ProcessStatus===2 || value.ProcessStatus===3"
    :title="value.ProcessStatus===2?'已审核':'已驳回'"
    :type="value.ProcessStatus===2?'success':'error'"
    :description="value.ProcessStatus===3?`驳回原因：${value.CheckReason}`:''"
    :closable="false"
    show-icon />

<!-- 新   -->
<template slot="alert">
  <el-alert
      v-if="value.ProcessStatus===2 || value.ProcessStatus===3"
      :title="value.ProcessStatus===2?'已审核':'已驳回'"
      :type="value.ProcessStatus===2?'success':'error'"
      :description="value.ProcessStatus===3?`驳回原因：${value.CheckReason}`:''"
      :closable="false"
      show-icon />
</template>

<!-- el-alert需要放到 alert 插槽内 -->

```
#### 第四步 （不需要锚点导航组件跳过这一步）

```vue
<!-- 旧 -->
<jlg-collapse id="basicInfoRef" title="基本信息">
<template slot="icon">
  <i class="iconfont icon-chanpinxinxi" style="font-size: 22px" />
  <!-- ...... -->
</template>
</jlg-collapse>
<jlg-collapse id="productInformationRef" title="退货明细">
<template slot="icon">
  <i class="iconfont icon-chanpinxinxi" style="font-size: 22px" />
</template>
<!-- ...... -->
</jlg-collapse>

<!-- 新   -->
<jlg-collapse v-ref="r=>catalogsList[0].ref=r" title="基本信息"></jlg-collapse>
<jlg-collapse v-ref="r=>catalogsList[1].ref=r" title="基本信息"></jlg-collapse>

<script>
export default {
  data() {
    return {
      // 注意：catalogsList格式
      catalogsList: [
        {
          name: '基本信息',
          ref: ''
        }, {
          name: '退货明细',
          ref: ''
        }
      ]
    }
  }
}
</script>

```
#### 第五步

```vue
<!-- 旧： -->
<span>
          <template>
            <el-button
                v-if="type!=='read'"
                type="primary" icon="el-icon-circle-check"
                @click="$formulate.submit('Returns-Dialog-addReturns-formulate_1')">保 存</el-button>
          </template>
          <template v-if="title==='审核退货单'">
            <!-- ...... -->
          </template>
          <el-button icon="el-icon-circle-close" @click="dialogVisible = false">取 消</el-button>
        </span>

<!-- 新   -->
<span>
          <template>
            <el-button
                v-if="type!=='read' && type!=='review'"
                type="primary" icon="el-icon-circle-check"
                @click="$refs.jlgDialog.submitForm">保 存</el-button>
          </template>
          <template v-if="title==='审核退货单'">
            <!-- ...... -->
          </template>
          <!-- 新：$emit('close')   -->
          <el-button icon="el-icon-circle-close" @click="$emit('close')">取 消</el-button>
        </span>

```

1.  提交表单： `$formulate.submit('Returns-Dialog-addReturns-formulate_1')` 修改成  `$refs.jlgDialog.submitForm`
2. 关闭表单：` this.dialogVisible = false` 修改成 ` $emit('close')`
3. 需要注意 页面代码中 可能多次用到了  ` this.dialogVisible = false`
4. 审核时需要注意 type =  ` review `, 原有判断需要请根据情况修改

#### 第六步

删除 计算属性 dialogVisible ；删除 props: visible

```js
computed: {
    /* 控制弹框显示隐藏*/
    // dialogVisible: {
    //   get() {
    //     return this.visible
    //   },
    //   set(newVal) {
    //     this.$emit('update:visible', newVal)
    //   }
    // },
}
},
```

