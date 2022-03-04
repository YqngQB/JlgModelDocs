# jlg-table  主页面表格

##### 封装说明

> - 基础的使用方式与 API 与 [官方版(Table)](https://element.faas.ele.me/#/zh-CN/component/table) 大致相同，只是在其基础上进行了封装。
>
> - Table 组件提供了单选的支持，只需要配置 highlight-current-row 属性即可实现单选 (该行高亮显示);
>
> - 无需在表格页面进行分页逻辑处理，如果不需要分页功能仅需向 Table 组件传递绑定 `:showPagination="false"` 即可
> - 默认会监听页面高度变化，自动调整table高度

> 注意： 后面由于需求变更，要求表格行内支持增删改查；数据校验及更多扩展，新增 `table-type="vxeTable"` 字段，设置后Table 会从`el-table` 切换成  `vxe-table`。
>
> 设置成 `table-type="vxeTable"` 后， 由于`el-table` 和  `vxe-table`是两个不同的组件库，导致部分API使用方式也有所不同 ！！！
> 
>  [vxeTable](https://element.faas.ele.me/#/zh-CN/component/table) 文档地址
```js

   // { label: '是否转采购单', value: 'isOrder', minWidth: 140, formatter: formatter, sort: 1 }

   // table-type="vxeTable"
    function formatter({ row, column, cellValue }) {
      switch (cellValue) {
        case 1:
          return '是'
        case 0:
          return '否'
        default:
          return ''
      }
    }
   // table-type="elTable"
    function formatter( row, column, cellValue) {
     switch (cellValue) {
         case 1:
            return '是'
        case 0:
            return '否'
        default:
            return ''
    }
}
```

##### 内置方法

> 通过 `this.$refs.[每个table对应的ref]` 调用
>
> `this.$refs.table.refresh(true)` 刷新列表 (用户新增/修改数据后，重载列表数据)
>
> `refresh()` 方法可以传一个 `bool` 值，当有传值 或值为 `true` 时，则刷新时会强制刷新到第一页（通常用户页面 点击 搜索 按钮进行搜索时，结果从第一页开始分页）
>
> ###### 注意：要调用 `refresh(bool)` 需要给表格组件设定 `ref` 值,ref值在每个菜单下具有唯一性（可以理解成唯一ID）

##### 内置属性
> 除去 `el-table` 自带属性外，还提供了一些额外属性

| 属性           | 说明                                            | 类型              | 默认值 |
| -------------- | ----------------------------------------------- | ----------------- | ------ |
| refName          | el-table对应的ref                          | String  | TABLE_REF|
| api            | 加载数据API 数据接口 | Function           | -      |
| alert          | 设置是否显示表格信息栏                          | boolean | true   |
| tabIndex | 是否显示序号         | [string, boolean] | true |
| checkBox | 是否有选择框         | [string, boolean] | false |
| showPagination | 显示分页选择器， boolean          | [string, boolean] | true |
| data           | 表格数据 |   [object, Array]         | -      |
| fieldList          | 表格字段配置                      | Array  | -|
| handle           | 操作栏配置 |   Object        | -      |
| query           | 查询条件 |   Object        | -      |
| radioWidth           | 单选框宽度 |   string        |  60px     |
| sortable           | 显示排序 |   [Boolean, String]        | custom      |
| listenHeight           | 监听页面高度变化，调整table高度 |   Boolean        | true     |

##### 用法示例

```vue

<template>
  <jlg-table
    ref="table"
    :ref-name="tableInfo.refName"
    :data.sync="tableInfo.data"
    :field-list.sync="tableInfo.fieldList"
    :api="getProjects"
    :query="filterInfo"
    :handle="tableInfo.handle"
    highlight-current-row
    @row-click="rowClick"
    @row-dblclick="rowDblclick"
    @handleClick="handleClick"
    @handleEvent="handleEvent">
    <!--         自定义插槽显示标题-->
    <template v-slot:col-title="scope">
      <el-tooltip class="item" effect="dark" content="查看文章详细信息" placement="left">
        <a :style="`color: red; padding: 0 20px;`" @click="handleClick('view', scope.row)">{{ scope.row.title }}</a>
      </el-tooltip>
    </template>
    <!-- 表头信息配置： 自定义插槽按钮 -->
    <template v-slot:commonButton="scope">
      <el-button v-waves size="mini" style="color: #C5C5C5" @click="btClick(scope.data.selection)">
        <i style="color: #22CD98;padding-right: 5px" class="el-icon-circle-plus-outline"/>新增
      </el-button>
      <el-button v-waves size="mini" style="color: #C5C5C5" @click="btClick(scope.data.selection)">
        <i style="color: #EA4335;padding-right: 5px" class="el-icon-delete"/>删除
      </el-button>
      <el-button v-waves size="mini" style="color: #C5C5C5" @click="btClick(scope.data.selection)">
        <i style="color: #4F89FB;padding-right: 5px" class="el-icon-edit"/>编辑
      </el-button>
      <el-button v-waves size="mini" style="color: #C5C5C5" @click="btClick(scope.data.selection)">
        <i style="color: #4F89FB;padding-right: 5px" class="el-icon-download"/>导出
      </el-button>
    </template>
    <!-- 自定义列 -->
    <template v-slot:col-title="scope">
      {{ scope.row.meta ? scope.row.meta.title:'' }}
    </template>
    <!-- 行内： 自定义插槽状态按钮 -->
    <template v-slot:bt-status="scope">
      <el-button
        v-if="scope.data.item.show && (!scope.data.item.ifRender || scope.data.item.ifRender(scope.data.row))"
        size="mini"
        :type="scope.data.row.status - 1 >= 0 ? 'danger' : 'success'"
        :icon="scope.data.item.icon"
        :disabled="scope.data.item.disabled"
        :loading="scope.data.row[scope.data.item.loading]"
        @click="handleClick(scope.data.item.event, scope.data.row)">
        {{ scope.data.row.status - 1 >= 0 ? '停用' : '启用' }}
      </el-button>
    </template>
  </jlg-table>
</template>

<script>
import jlgTable from '@/components/Table/index.vue'
import {getProjects} from '@/api/manage'

export default {
  components: {
    jlgTable
  },
  data() {
    function formatterCover(row, column, cellValue, index) {
      return '自定义封面内容'
    }
    return {
      getProjects, // 对应API地址
      filterInfo: [],
      // 表格相关
      tableInfo: {
        refName: 'jlgTableRef',
        data: [],
        fieldList: [
          {label: 'id', value: 'id', fixed: 'left', sort: 0},
          {label: '封面', value: 'cover', sort: 1, formatter: formatterCover},
          {label: '标题', value: 'title', minWidth: 120, type: 'slot', sort: 2},
          {label: '描述', value: 'description', width: 80, sort: 3},
          {label: '状态', value: 'status', width: 90, type: 'slot', sort: 4},
          {label: '更新时间', value: 'updatedAt', minWidth: 180, sort: 5}
        ],
        handle: {
          fixed: 'left',
          label: '操作',
          width: '280',
          btList: [
            {label: '启用', type: 'success', icon: 'el-icon-albb-process', event: 'status', show: true, slot: true},
            {label: '编辑', type: '', icon: 'el-icon-edit', event: 'update', show: true},
            {label: '删除', type: 'danger', icon: 'el-icon-delete', event: 'delete', show: true}
          ]
        }
      }
    }
  },
  methods: {
    rowClick(row, column, event) {
      console.log('单击选中当前行', row)
    },
    rowDblclick(row, column, event) {
      alert(`'双击了第'${row.id}行`)
      console.log('row, column, event', row, column, event)
    },
    handleClick() {
    }, // 派发按钮点击事件
    handleEvent(key, data) {
      // key:'tableCheck' 渲染事件的派发
      // key:'tableCheck'表格选择事件的派发
      console.log(key, data)
    },
    btClick(selection) {
      console.log('selection:', selection)
    }
  }
}
</script>

```
