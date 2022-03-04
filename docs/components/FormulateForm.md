## FormulateForm 使用 Vue 构建表单的最简单方法

##### 组件说明

> - 第三方组件
> - 优点： 内置常用的一些验证器。帮助文本、验证规则和验证消息都是简单的 `props`。也可以添加自定义验证器。
> - 缺点 ：部分场景下会有BUG（多个表单）
> - 文档：https://vueformulatecom-braid.vercel.app/zh/

#####  部分常用属性

| 属性    | 说明               | 类型   | 默认值 |
| ------- | ------------------ | ------ | ------ |
| v-model | 读/写表单域中的值  | Object | -      |
| name    | 必填，必须全局唯一 | string | -      |

##### 常用事件

| 事件名称 | 说明                        | 回调参数 |
| :------- | :-------------------------- | :------- |
| failedValidation     | 表单校验失败时触发           | —        |

Vue Formulate 引入了 “**命名表单**” 的概念，作为通过 `$formulate` 插件 *全局* 访问和操作表单的机制。 要利用命名表单，只需为任何 `<FormulateForm>` 组件提供一个`全局唯一`的 name prop 即可。 在整个项目的表单中名称应该是**唯一**的。 命名表单后，您可以轻松调用多个命名的表单方法。

> **<u>name</u>** 在整个项目必须是唯一的，不然通过命名表单的方法提交表单可能会触发其他vue页面中同名的FormulateForm 方法
>
> 命名规范：【vue页面对应的路由地址】-【name】_【索引】
>
> 示例：productInfo-formulate_1;productInfo-formulate_2;productInfo-formulate_3

| 方法                        | 说明                                                         |
| --------------------------- | ------------------------------------------------------------ |
| `handle(err, formName)`     | 用于在表单上设置错误消息，通常来自后端服务器。阅读有关 [错误处理](https://vueformulatecom-braid.vercel.app/zh/guide/forms/error-handling/) 了解更多信息。 |
| `reset(formName, values)`   | 重置表单的值、验证消息和错误消息。                           |
| `resetValidation(formName)` | 重置所有验证和错误消息。                                     |
| `setValues(formName)`       | 设置表单模型的值（即使没有 `v-model` 定义）                  |
| `submit(formName)`          | 用于以编程方式提交表单。                                     |

#### FormulateInput

##### 组件说明

> - FormulateForm 子组件
> - 在原 **FormulateInput** 组件基础上为 `vueformulate` 项目加上了 `element-ui` 皮肤，在 `element-ui` 项目中保持风格统一;
> - 添加 element-ui 常用的表单域组件的支持


| 组件        | FormulateInput type | 说明                  |
| ----------- | ------------------- | --------------------- |
| Input       | `el-input`          | element-ui输入框      |
| Select      | `el-select`         | element-ui 下拉选择   |
| Date        | `el-el-date-picker` | element-ui 日期选择   |
| Cascader    | `el-cascader`       | element-ui 级联选择器 |
| ColorPicker | `el-color-picker`   | element-ui 颜色选择器 |
| InputNumber | `el-input-number`   | element-ui 计数器     |
| Rate        | `el-rate`           | 评分                  |
| Switch      | `el-switch`         | 开关                  |
| Slider      | `el-slider`         | 滑块                  |

###### 以上扩展基本满足了工作需要

如果需要使用行内表单（所有的表单域在一行内展示），则可以在 `FormulateForm` 组件上加一个 `el-formulate__form-inline` 样式即可：

```vue
<FormulateForm :form-class="['el-formulate__form-inline']">
  <FormulateInput
    label="个性签名"
    type="el-input"
    value="你好，Element-UI"
  />
</FormulateForm>
```

######  必填字段

只要是 `FormulateInput` 的验证规则中包含 `required` ,则会默认加上这个红色 `*` ，如果希望强制不显示，则可以在 `FormulateInput` 上设置 `requiredTip` prop 为 `false`,即可：

```
<FormulateInput :required-tip="false" />
```

>**注意：当type='el-select'时，当options中的value 为string类型的数字时会自动转int类型**

```js
  '123'会转成 123
```

### 全局验证规则

- [**accepted**  该规则要求输入的值必须是 `yes`, `on`, `1` 或 `true`](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#accepted)



- [**after**：检查日期是否在另一个日期之后。如果未提供日期参数，则将使用当前时间。该值必须是 `Date` 对象或可被 `Date.parse` 求值的字符串。](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#after)

  ```vue
  <FormulateInput
    type="date"
    label="Select a time after the new year."
    name="date"
    validation="after:01/01/2022"
  />
  ```

- [**alpha**：检查值是否仅为字母字符。有两个字符集 `latin` 和 `default`. 前者是严格 `[a-zA-Z]` 规则，而 `default` 集包括最重音符号，如: `ä`, `ù`, 或 `ś`.](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#alpha)



- [**alphanumeric**：检查输入的值是否仅由字母字符或数字组成。对于字母部分，您可以通过 `default` 或 `latin`](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#alphanumeric)



- [**bail** :用于在第一个后续验证错误时在逻辑上停止验证](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#bail)



- [**before** 检查日期是否在另一个日期之前](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#before)

  ```vue
  <FormulateInput
    type="date"
    label="Select a time before the new year."
    name="date"
    validation="before:01/01/2022"
  />
  ```

- [**between** 检查数字或字符串长度是否介于最小值或最大值之间。最大值和最小值都是互斥的。如果要验证的值是字符串，则使用字符串的长度进行比较。如果使用数字，则使用数值进行比较。在 `v2.2.4+` 版本中你可以强制它总是通过一个可选的第三个参数设置检查数值或字符串长度 `value` 或 `length` 。](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#between)

  **提示: 如果你希望日期是两个日期之间，请考虑一起使用其他两个日期的 [before](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#before) 和 [after](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#after) 的验证规则。**

  ```vue
  <FormulateInput
    type="range"
    min="5"
    max="35"
    name="Age"
    label="How old are you?"
    validation="between:10,18,value"
    :show-value="true"
    :value="15"
    error-behavior="live"
  />
  ```

- [**confirm** :检查字段值是否与另一个字段的值匹配。主要用于隐藏字段 - 如密码确认。 ](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#confirm)



- [**date** :根据 `Date.parse()` 来检查输入是否为有效日期 ，或者如果提供了格式参数，它将根据给定的格式进行验证。](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#date)



- [**email** :检查输入的值是否为有效的电子邮件地址格式。](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#email)



- [**ends_with** :检查输入的值是否以提供的选项之一结束](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#ends-with)



- [**in** :检查输入的值是否包含在选项数组中。](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#in)

  ```vue
  <FormulateInput
    type="select"
    :options="{chocolate: 'Chocolate', vanilla: 'Vanilla', strawberry: 'Strawberry'}"
    name="flavor"
    label="Favorite ice cream flavor?"
    placeholder="Select a flavor"
    validation="in:chocolate,vanilla"
    error-behavior="live"
  />
  ```

- [**matches** :检查输入的值是否与特定值或模式匹配。如果您传递多个参数，它会检查每个参数，直到找到匹配项。](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#matches)



- [**max**  :检查一个 Number 的值, 或一个 String 或 Array 的长度是否小于某个值。默认值是 10.可以使用第二个参数来强制验证器验证长度或值 length or value。](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#max)

  ```vue
  <FormulateInput
    type="text"
    name="coupon"
    label="Enter a coupon code"
    validation="max:5,length"
    error-behavior="live"
  />
  ```

- [**mime**](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#mime)



- [**min** :检查一个 `Number` 的值, 或一个 `String` 或 `Array` 的长度是否大于某个值。默认值是 `1`.可以使用第二个参数来强制验证器验证长度或值 `length` or `value`](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#min)

  ```vue
  <FormulateInput
    type="text"
    name="code"
    label="Enter your SSN"
    validation="min:9,length"
    validation-name="Social security code"
    error-behavior="live"
  />
  ```

- [**not** 要求输入的数据与一组预定义的任意的值都不匹配](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#not)

  ```vue
  <FormulateInput
    type="text"
    name="framework"
    label="What is your favorite javascript framework?"
    validation="not:jquery,ember,mootools"
    error-behavior="live"
  />
  ```

- [**number** 检查是否是数字 ](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#number)



- [**optional** 使用此规则可将字段设为可选。使用时，如果值为空，则所有验证规则都会通过。它在验证规则列表中的位置没有影响。](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#optional)



- [**required** 必填](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#required)

  默认情况下，只有空格的字符串（如 ``）被视为有效输入，但是可以使用参数来改变此行为，例如：

  ```vue
  <FormulateInput
    type="el-input"
    name="city"
    label="What city do you live in?"
    validation="required:trim"
    error-behavior="live"
  />
  该规则 `required:trim` 将在评估验证之前修剪输入中的任何空格，因此，只有空格的字符串将无法通过验证。注意：它不会修改输入值。
  ```

- [**starts_with** 检查输入的值是否以提供的选项之一开头](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#starts-with)

  ```vue
  <FormulateInput
    type="text"
    name="hashtag"
    label="What's your favorite hashtag on Twitter?"
    validation="starts_with:#"
  />
  ```

- [**url** 检查输入值是否显示为包含协议的格式正确的 URL。这不会检查 URL 是否实际解析。](https://vueformulatecom-braid.vercel.app/zh/guide/validation/#url)

### 全局自定义验证规则

- **mobile** ：手机号码格式验证

  ```vue
  <FormulateInput
    name="mobile"
    type="el-input"
    class="jlu-col--flex"
    validation="^required|mobile"
    label="手机号"/>
  ```



- **idcard** ：18位身份证格式验证
  ```vue
  <FormulateInput
    name="idcard"
    type="el-input"
    class="jlu-col--flex"
    validation="^required|idcard"
    label="身份证"/>
  ```
- **money** ：金额格式验证（允许4位数的金额格式）

 ```vue
  <FormulateInput
    name="CostPrice"
    type="el-input"
    class="jlu-col--flex"
    validation="^required|money"
    label="底价"
    append="元" />vue
 ```

- **positiveInteger** ：正整数校验

  ```vue
  positiveInteger:allowZero   allowZero：是否允许为0
  ```

 ```vue
  <FormulateInput
    name="number"
    type="el-input"
    class="jlu-col--flex"
    validation="^required|positiveInteger"
    label="采购数量"
    append="件" />
 ```

```tex
使用数组语法时，请确保 prop 使用 v-bind:validation 或 :validation。
```

```
复杂的表单通常具有不需要提交给服务器的表单域， 例如仅用于控制表单显示的表单域。这些表单域可以通过添加 ignored prop 来选择退出表单参与
```

自定义校验

```vue
<!--       自定义校验       -->
<FormulateInput
   validation="^required|Digits" type="el-input"
   name="TicketPrice"
   :validation-rules="{Digits:({value})=>{ return digits(value)}}"
   :validation-messages="{Digits: '最多保留4位数'}"
   :disabled="disabledList.TicketPrice"
   label="打款价格" />


   methods: {
    digits(price) {
      price = price + ''
      const priceIndex = price.indexOf('.') + 1 // 小数位置
      const priceCount = price.length - priceIndex // 获取小数点后的位数
      return priceCount <= 4
    },
  }                    
```
