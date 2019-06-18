# 打印

- A4的纸张是 210*297 mm

## 引入打印样式

```css
@media print {
  @page {
    size: A4 portrait;
    margin: 3.7cm 2.6cm 3.5cm;
  }

  h1 {
    page-break-before: always;
  }

  h1, h2, h3, h4, h5, h6,
  thead, tfoot, tr, th, td,
  li {
    page-break-inside: avoid;
  }

  body {
    background-color: white;
    color: black;
  }

  nav, aside {
    display: none;
  }

  a::after {
    content: "(" attr(href) ")";
  }

  thead, tfoot {
    display: table-row-group;
  }
}
```

## 打印分页

- page-break-before，page-break-after: 用于控制元素之前、之后或之中是否分页

- page-break-before、page-break-after 属性支持 auto、always、avoid、left、right、recto 和 verso。

- auto 默认值，表示既不强制分页也不禁止分页
- always、avoid 表示在该元素之前（或之后）强制或禁止分页
- left、right 表示在该元素之前（或之后）强制分页，使得下一页出现在左页或右页
- recto、verso 页面进度从左至右时，分别与 right 和 left 一致；反之与 left 和 right 一致

```css
.page-break-before {
  page-break-before: auto;
}
.page-break-after {
  page-break-after: always;
}
```

## 调起打印页面

```js
window.print();
```

## iframe 标签
