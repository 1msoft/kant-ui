import Welcome from './overview/Welcome';
import Input from './form/Input';
import SideMenu from './sidemenu/SideMenu';

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
        title: '侧边栏',
        component: SideMenu
      }
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
