import Welcome from './overview/Welcome';
import Input from './form/Input';
import FixedMenu_ from './fixedmenu/FixedMenu';

import HeaderComponent from './layout/HeaderComponent';

import InputNumber from './form/InputNumber';
import DatePickerComponent from './form/DatePicker';

export default [
  {
    title: '综述',
    parents: [
      {
        title: '欢迎页面',
        component: Welcome
      },
      {
        title: '欢迎页面111',
        component: Welcome
      }
    ]
  },
  {
    title: '菜单',
    parents: [
      {
        title: '悬停菜单',
        component: FixedMenu_
      }
    ]
  },
  {
    title: '表单',
    parents: [
      {
        title: '输入框',
        component: Input
      },
      {
        title: 'InputNumber 数字输入框',
        component: InputNumber,
      },
      {
        title: 'DatePicker 日期范围选择器',
        component: DatePickerComponent,
      }
    ]
  },
  {
    title: '布局',
    parents: [
      {
        title: 'Header 头部导航栏',
        component: HeaderComponent,
      }
    ]
  }
];
