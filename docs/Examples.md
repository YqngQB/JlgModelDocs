# 示例

浏览器访问(跑的是我本地项目，可能打不开) 

[http://192.168.19.155:9528/#/ModelDemo](http://192.168.19.155:9528/#/ModelDemo) 

##  jlgModal 写法示例

#### 菜单主页面
```vue
<script>
import ModalProduct from '../components/ModalProduct'
import jlgTable from '@/components/Table/index.vue'
import { GetBaseProList } from '@/api/index'
export default {
  name: 'ProductHome',
  components: {
    jlgTable
  },
  props: {},
  data() {
    return {
      GetBaseProList,
      filterInfo: {},
      formData: {},
      // 表格相关
      tableInfo: {
        refName: 'ProductHomeTable',
        data: [],
        handle: {},
        fieldList: []
      }
    }
  },
  methods: {
    handleCancel() {
      this.$refs.table.refresh()
    },
    /**
     * 新增
     * */
    handleAdd() {
      this.$modal.show(ModalProduct, { title: '新增产品信息', type: 'add' }, { name: 'ModalProduct', height: 'auto' }, {
        // 在模态被销毁之前发出。
        'closed': (event) => {
          this.handleCancel()
        }
      })
    },
    /**
     * 查看
     * */
    handleRead(selection) {
      this.$modal.show(ModalProduct, { title: '查看产品信息', type: 'read', value: selection }, { name: 'ModalProduct', height: 'auto' })
    },
    /**
    * 修改
    * */
    handleEdit(selection) {
      if ((selection.length === 0 || !selection)) {
        this.$message({ message: '操作无效，请先选择数据！', type: 'warning' })
        return false
      }
      // ......
      this.$modal.show(ModalProduct, { title: '编辑产品信息', type: 'edit', value: selection }, { name: 'ModalProduct', height: 'auto' }, {
            'closed': (event) => {
              this.handleCancel()
            }
          }
      )
    }
  }
}
</script>
```

#### ModalProduct 组件页面
```vue

<template>
  <!--
    @model: 必填
    @title: 必填
    @type: 必填
    @show-to-be-submitted: 是否显示暂存按钮
    @show-review-process: 是否显示审核流程
    @process-status-api: 显示审核流程时必填
  -->
  <jlg-dialog
      ref="jlgDialog" :model.sync="formData" :title="title"
      :type="type" :show-to-be-submitted="true"
      :show-review-process="true"
      :process-status-api="value&&`/Product/GetProAuditProcessList?returnId=${value.Id}`"
      @opened="handleOpen" 
      @submit="handlesSubmit"
      @review="handlesReview">
    <template slot="alert">
     <!--  当前审核状态的插槽    -->
      <el-alert
          v-if="value && (value.ProcessStatus===3 || value.ProcessStatus===4)"
          :title="value.ProcessStatus===3?'已审核':'已驳回'"
          :type="value.ProcessStatus===3?'success':'error'"
          :description="value.ProcessStatus===4?`驳回原因：${value.CheckReason}`:''"
          :closable="false"
          show-icon />
    </template>
    <jlg-collapse title="基本信息">
      <div class="jlu-row--flex">
        <FormulateInput
            validation="^required" class="el-col-8" type="el-input"
            name="ZBProComName" label="招标通用名"
            disabled />
        <FormulateInput validation="^required" class="el-col-8" type="el-input" name="ZBComDrug" label="招标剂型" disabled />
        <FormulateInput class="el-col-8" type="el-input" name="ZBComSpec" label="招标规格" disabled />
      </div>
    </jlg-collapse>
    <jlg-collapse title="产品信息">
      <div class="jlu-row--flex">
        <FormulateInput class="el-col-8" type="el-input" name="YBCode" label="医保药品编码" />
        <FormulateInput validation="^required" class="el-col-8" type="el-input" name="ProComName" label="实际通用名" />
        <FormulateInput validation="^required" class="el-col-8" type="el-input" name="ComDrug" label="实际剂型" />
        <FormulateInput validation="^required|number" class="el-col-8" type="el-input" name="ExpiryDate" label="有效期" append="月" />
        <FormulateInput validation="^required|money" class="el-col-8" type="el-input" name="BidPackPrice" label="包装中标价" append="元" />
      </div>
    </jlg-collapse>
  </jlg-dialog>
</template>

<script>
import jlgCollapse from '@/components/Collapse'
import jlgTable from '@/components/Table/index'
import {  SaveBaseProList, CheckBasePro } from '@/api'

export default {
  components: {
    jlgCollapse,
    jlgTable
  },
  props: {
    title: { type: String, default: '' },
    type: { type: String, default: 'add' },
    value: { type: Object }
  },
  data() {
    return {
      formData: {
        Id: '',
        CatalogId: '',
        ZBProComName: '',
        ZBComDrug: '',
        ZBComSpec: '',
        YBCode: ''
      }
    }
  },
  methods: {
    /**
     * 在Modal变为可见或开始转换后发出;可以进行一些赋值操作
     * */
    handleOpen() {
      if (this.type !== 'add') {
        this.$global.fillObj(this.formData, this.value) // 弹框打开时，给this.formData赋值
      }
    },
    /**
     * 表单验证全部通过后触发
     * @param {String} type = add(新增)，edit(编辑)，toBeSubmitted（暂存），
     * */
    handlesSubmit(type, sourceData, data) {
      switch (type) {
        case 'toBeSubmitted':
          sourceData.ProcessStatus = 1
          break
        case 'add':
        case 'edit':
          sourceData.ProcessStatus = 2
          break
        default:
          break
      }
      SaveBaseProList(sourceData).then(res => {
        this.$message.success('操作成功！')
        this.$emit('close')
      })
    },
    /**
     * 点击审核通过货驳回时触发
     * @param {String} type = allow(通过)，reject(驳回)
     * */
    handlesReview(type) {
      if (type === 'reject') { // 审核不通过，需要输入原因
        this.$prompt('请输入驳回原因', '驳回原因', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: 'textarea',
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: '请输入驳回原因'
        }).then(({ value }) => {
          this.CheckBasePro({ Id: this.value.Id, CheckStatus: 2, CheckReason: value })
        })
      } else {
        this.CheckBasePro({ Id: this.value.Id, CheckStatus: 1 })
      }
    },
    CheckBasePro(parameter) {
      return CheckBasePro(parameter).then(res => {
        this.$message.success('审核成功！')
        this.$emit('close')
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>


```

