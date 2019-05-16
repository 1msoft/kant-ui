import Welcome from './overview/Welcome';
import Input from './form/Input';
import SelectDoc from './form/SelectDoc';
import InputNumber from './form/InputNumber';

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
    title: '表单',
    parents: [
      {
        title: '输入框',
        component: Input
      }, {
        title: '选择器',
        component: SelectDoc
      },
      {
        title: 'InputNumber 数字输入框',
        component: InputNumber,
      }
    ]
  }
];
