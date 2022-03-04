# jlgModal 写法示例
## 菜单主页面

```vue
<script>
// 导入弹窗所在组件
import ModalComponent from "../components/ModalComponent";
export default {
  data() {
    return {};
  },
  methods: {
    handleCancel() {
      this.$refs.table.refresh();
    },
    /**
     * 新增
     * @param {String} title 弹窗顶部显示的标题
     * @param {String} type 弹窗所属类型; add:新增 edit:编辑 read:查看 review:审核
     * @param {String} name 通过所传的name结合当前路由生成一个当前Modal的 Name
     * @param {String} height 设置Modal的高度
     */
    handleAdd() {
      this.$modal.show(
          ModalComponent,
        { title: "新增产品信息", type: "add" },
        { name: "ModalComponent", height: "auto" },
        {
          // 在Modal关闭之前发出。可以通过调用此事件侦听器阻止Modal的进一步关闭 event.cancel()
          "before-close": event => {
            if (event.params) {
              this.vxeTable.insert(event.params).then(({ row, rows }) => {
                this.$message.success("新增成功!");
                this.vxeTableData = this.getTableData();
              });
            }
          },
          // 在模态被销毁之前发出。
          closed: event => {
            this.handleCancel();
          }
        }
      );
    },
    /**
     * 查看
     * */
    handleRead(selection) {
      this.$modal.show(
          ModalComponent,
        { title: "查看产品信息", type: "read", value: selection },
        { name: "ModalComponent", height: "auto" }
      );
    },
    /**
     * 修改
     * */
    handleEdit(selection) {
      if (selection.length === 0 || !selection) {
        this.$message({ message: "操作无效，请先选择数据！", type: "warning" });
        return false;
      }
      // ......
      this.$modal.show(
          ModalComponent,
        { title: "编辑产品信息", type: "edit", value: selection },
        { name: "ModalComponent", height: "auto" },
        {
          closed: event => {
            this.handleCancel();
          }
        }
      );
    }
  }
};
</script>
```

#### ModalComponent 组件页面

```vue
<template>
  <!--
    属性：
    @param {String} model.sync 必填项，是jlg-dialog全局组件中FormulateForm表单域的 model 字段
    @param {String} title 必填,jlg-dialog全局组件中的title
    @param {String} type 必填,jlg-dialog全局组件中的type; add:新增 edit:编辑 read:查看 review:审核
    @param {Boolean} show-to-be-submitted 非必填,是否显示暂存按钮
    @param {Boolean} show-review-process 非必填,是否显示审核流程
    @param {String} process-status-api 需要显示审核流程时必填
    @param {Boolean} anchor-point-navigation 是否显示锚点导航组件
    @param {Array} catalogs-list 显示锚点导航组件时必填, 锚点导航组件目录列表
    @param {String} saveText 提交按钮显示的文本，默认值是 “提 交”
  -->
  <!--
  事件：
  @opened 在Modal变为可见或开始转换后发出（设计目的是为了兼顾之前旧Modal，有BUG!!!不推荐使用！！！推荐 赋值操作放在 created 或者 mounted 中）
  @submit 表单验证全部通过后触发
  @review 点击审核通过或者驳回时触发
  -->
  <jlg-dialog
    ref="jlgDialog"
    :model.sync="formData"
    :title="title"
    :type="type"
    :show-to-be-submitted="true"
    :show-review-process="true"
    :process-status-api="
      value && `/Product/GetProAuditProcessList?returnId=${value.Id}`
    "
    :anchor-point-navigation="true"
    :catalogs-list="catalogsList"
    @opened="handleOpen"
    @submit="handlesSubmit"
    @review="handlesReview"
  >
    <template slot="alert">
      <!--  当前审核状态的插槽 1（已保存、已暂存） 2（已提交、待审核）3（审核通过） 4（驳回） 5（撤废）   -->
      <el-alert
        v-if="value && (value.ProcessStatus === 3 || value.ProcessStatus === 4)"
        :title="value.ProcessStatus === 3 ? '已审核' : '已驳回'"
        :type="value.ProcessStatus === 3 ? 'success' : 'error'"
        :description="
          value.ProcessStatus === 4 ? `驳回原因：${value.CheckReason}` : ''
        "
        :closable="false"
        show-icon
      />
    </template>
    <jlg-collapse v-ref="r => (catalogsList[0].ref = r)" title="基本信息">
      <div class="jlu-row--flex">
        <FormulateInput
          validation="^required"
          class="el-col-8"
          type="el-input"
          name="_商品名"
          label="商品名"
          disabled
        />
        <FormulateInput
          validation="^required"
          class="el-col-8"
          type="el-input"
          name="_通用名"
          label="通用名"
          disabled
        />
        <FormulateInput
          class="el-col-8"
          type="el-input"
          name="_剂型"
          label="剂型"
          disabled
        />
        <FormulateInput
            class="el-col-8"
            type="el-input"
            name="_规格"
            label="规格"
            disabled
        />
        <FormulateInput
            class="el-col-8"
            type="el-input"
            name="_小包装"
            label="小包装"
            disabled
        />
        <FormulateInput
            validation="^required"
            class="el-col-8"
            type="el-select"
            name="公司名称"
            filterable
            remote
            reserve-keyword
            clearable
            placeholder="请输入选择"
            :loading="remoteLoading"
            :remote-method="remoteMethodZd"
            :options="TermList"
            :option-config="{ label: 'TermName', value: 'TermCode' }"
            label="公司名称"
        />
      </div>
    </jlg-collapse>
    <jlg-collapse v-ref="r => (catalogsList[1].ref = r)" title="产品信息">
      <div class="jlu-row--flex">
        <FormulateInput
          class="el-col-8"
          type="el-input"
          name="YBCode"
          label="医保药品编码"
        />
        <FormulateInput
          validation="^required"
          class="el-col-8"
          type="el-input"
          name="ProComName"
          label="实际通用名"
        />
        <FormulateInput
          validation="^required"
          class="el-col-8"
          type="el-input"
          name="ComDrug"
          label="实际剂型"
        />
        <FormulateInput
          validation="^required|number"
          class="el-col-8"
          type="el-input"
          name="ExpiryDate"
          label="有效期"
          append="月"
        />
        <FormulateInput
          validation="^required|money"
          class="el-col-8"
          type="el-input"
          name="BidPackPrice"
          label="包装中标价"
          append="元"
        />
      </div>
    </jlg-collapse>
  </jlg-dialog>
</template>

<script>
import jlgCollapse from "@/components/Collapse";
import jlgTable from "@/components/Table/index";
import { SaveBaseProList, CheckBasePro } from "@/api";
import { GetBaseCustomerList } from "@/api/product";

export default {
  components: {
    jlgCollapse,
    jlgTable
  },
  props: {
    title: { type: String, default: "" },
    type: { type: String, default: "add" },
    value: { type: Object }
  },
  data() {
    return {
      formData: {
        Id: "",
        _商品名: "",
        _通用名: "",
        _剂型: "",
        _规格: "",
        _小包装: "",
        _生产企业: ""
      },
      catalogsList: [
        {
          name: "基本信息",
          ref: ""
        },
        {
          name: "产品信息",
          ref: ""
        }
      ],
      remoteLoading: false,
      TermList: [] // 终端列表
    };
  },
  created() {},
  mounted() {
    /**
     * 推荐在此处进行一些表单赋值操作
     * */
    if (this.type !== "add") {
      this.$global.fillObj(this.formData, this.value); // 弹框打开时，给this.formData赋值
      this.showData()
    }
  },
  methods: {
    /**
     * 在Modal变为可见或开始转换后发出;可以进行一些赋值操作
     * */
    handleOpen() {
      if (this.type !== "add") {
        this.$global.fillObj(this.formData, this.value); // 弹框打开时，给this.formData赋值
      }
    },
    /**
     * 表单验证全部通过后触发
     * @param {String} type = add(新增)，edit(编辑)，toBeSubmitted（暂存），
     * */
    handlesSubmit(type, sourceData, data) {
      switch (type) {
        case "toBeSubmitted":
          sourceData.ProcessStatus = 1;
          break;
        case "add":
        case "edit":
          sourceData.ProcessStatus = 2;
          break;
        default:
          break;
      }
      SaveBaseProList(sourceData).then(res => {
        this.$message.success("操作成功！");
        this.$emit("close");
      });
    },
    /**
     * 点击审核通过或者驳回时触发
     * @param {String} type = allow(通过)，reject(驳回)
     * */
    handlesReview(type) {
      if (type === "reject") {
        // 审核不通过，需要输入原因
        this.$prompt("请输入驳回原因", "驳回原因", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputType: "textarea",
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: "请输入驳回原因"
        }).then(({ value }) => {
          this.CheckBasePro({
            Id: this.value.Id,
            CheckStatus: 2,
            CheckReason: value
          });
        });
      } else {
        this.CheckBasePro({ Id: this.value.Id, CheckStatus: 1 });
      }
    },
    CheckBasePro(parameter) {
      return CheckBasePro(parameter).then(res => {
        this.$message.success("审核成功！");
        this.$emit("close");
      });
    },
    // 查询终端
    remoteMethodZd(query) {
      this.remoteLoading = true;
      GetBaseCustomerList({
        TermName: query,
        CurrentPageIndex: 1,
        PageRows: 30
      }).then(res => {
        this.remoteLoading = false;
        this.TermList = res.data;
      });
    },
    // 编辑查看时： 数据 回显
    showData() {
      this.remoteMethodZd(this.value.TermName);
    }
  }
};
</script>

<style lang="scss" scoped></style>
```
