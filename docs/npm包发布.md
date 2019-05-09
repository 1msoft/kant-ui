# npm 包发布

## 一 编译

```shell
npm run build:publish
```

## 二 修改 package.json

- 修改版本号

```diff
{
+ "version": "0.1.4",
}
```

## 三 发布包

```shell
# 1. 切换官方源头
npm config set registry http://registry.npmjs.org

# 2. 登录 npm
npm login

# 3. 发布包
npm publish

# 4. 如果需要则切换回淘宝源
npm config set registry https://registry.npm.taobao.org/

```

### 四 撤销 npm 包

根据规范，只有在发包的24小时内才允许撤销发布的包

```shell
 npm unpublish <包名> -f
```
