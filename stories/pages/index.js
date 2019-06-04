import Welcome from './overview/Welcome';
import Input from './form/Input';
import SideMenu from './side-menu/SideMenu';
import SelectDoc from './form/SelectDoc';
import Breadcrumb from './breadcrumb/Breadcrumb';

import HeaderComponent from './layout/HeaderComponent';
import InputNumber from './form/InputNumber';
import FormLayout from './form/FormLayout';
import DatePickerComponent from './form/DatePicker';
import Context from './other/Context';
import Button from './button/Button';

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
      },
    ]
  },
  {
    title: '表单',
    parents: [
      {
        title: '输入框',
        component: Input
      }, {
        title: 'Select 选择器',
        component: SelectDoc
      },
      {
        title: 'InputNumber 数字输入框',
        component: InputNumber,
      },
      {
        title: 'FormLayout 表单',
        component: FormLayout,
      },
      {
        title: 'DatePicker 日期范围选择器',
        component: DatePickerComponent,
      },
      {
        title: 'Button 按钮',
        component: Button,
      }
    ]
  },
  {
    title: '布局',
    parents: [
      {
        title: 'Header 头部导航栏',
        component: HeaderComponent,
      },
      {
        title: 'SideMenu 侧边栏',
        component: SideMenu
      },
      {
        title: 'Breadcrumb 面包屑导航',
        component: Breadcrumb,
      },
    ]
  },
  {
    title: '其他',
    parents: [
      {
        title: 'Context 上下文',
        component: Context,
      }
    ]
  }
];
