import Welcome from './overview/Welcome';
import Input from './form/Input';
import Breadcrumb from './breadcrumb/breadcrumb';

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
      {
        title: '面包屑导航',
        component: Breadcrumb
      },
    ]
  },
  {
    title: '表单',
    parents: [
      {
        title: '输入框',
        component: Input
      }
    ]
  }
];
