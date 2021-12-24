# 其他注意事项

新Modal 相较于 旧组件 用法上精简了不少

## 原有的旧弹窗 改成 新modal 步骤

#### 第一步

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
         this.$global.fillObj(this.formData, this.value)
         this.$refs.jlgDialog.setValues(this.formData)
         // 其他赋值操作 ...... 
       }
     },
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
#### 第四步

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

