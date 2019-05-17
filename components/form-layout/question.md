# 表单组件封装

## 存在问题
- 能否支持`Antd`表单的风格切换 `'horizontal'|'vertical'|'inline'`
- 能否支持非表单布局组件显示 string 非定义类型的ReactNode ？
  - 能
    - 计算每行的栅格布局存在偏差
  - 不能
    - 如需插入非表单布局组件， 则需要使用表单组件包裹

### 方案一
- 直接对`FormItem`进行二次封装
- 可以直接使用`Antd`的表单风格切换
- `label``wrapper`的宽度无法动态计算，不可控，不稳定，实现可能比较麻烦

### 方案二
- `FormItem` 负责自身逻辑部分（校验，提示等）
- `FormItem` 的`label`自己定义， 需增加DOM层级
- 表单的值校验能否穿透？（需测试）
- 表单布局联动需要自己实现， 且`Form`标签的属性获取需要实现（`antd`部分参数未使用`React.context`）？

### 方案三 （简化传参, 快速使用）
- `Form`
- `FormItem`
  - `labelCol = {{ span: 12 }}` -> `labelSpan={12}`
  - `wrapperCol = {{ span: 12 }}` -> `wrapperSpan={12}`

### Solution By Grid 栅格解决方案

