# KantUI

## 启动项目

```shell
npm i
npm run start
```

## 编译 storybook

```shell
npm run storybook:build
```

## Storybook 页面显示演示代码

### 生成同名 Markdown 文档

下面包在注释 `// demo:` 和 `// end-demo` 内的代码块将被导出为到 Markdown 文档中

- 示例

```js
// demo: 标题
const FormatData = () => {
  ......
};
// end-demo
```

- 生成 Markdown 内容如下：

```md
## 标题

<details><summary>展开查看</summary>

```jsx
const FormatData = () => {
  ...
};

```

</details>
```

### 在演示页面内调用通用组件并导入生成的 Markdown

```jsx
// 导入 stories/components 下的通用组件 Markdown
import { Markdown } from '../../components';
// 导入 Markdown
import markdownData from './xxxxxxxxxxx.md';

// 调用组件
<Markdown data={markdownData} />
```

## npm 包发布

### 一 编译

```shell
npm run build:publish
```

### 二 修改 package.json

- 修改版本号

```diff
{
+ "version": "0.1.4",
}
```

### 三 发布包

```shell
# 1. 切换官方源头
npm config set registry http://registry.npmjs.org

# 2. 登录 npm
npm login

# 3. 发布包
npm publish --access public

# 4. 如果需要则切换回淘宝源
npm config set registry https://registry.npm.taobao.org/

```

### 四 撤销 npm 包

根据规范，只有在发包的24小时内才允许撤销发布的包

```shell
 npm unpublish <包名> -f
```
