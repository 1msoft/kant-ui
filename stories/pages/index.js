import Welcome from './overview/Welcome';
import Input from './form/Input';
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
    title: '表单',
    parents: [
      {
        title: '输入框',
        component: Input
      },
      {
        title: '日期范围选择器',
        component: DatePickerComponent,
      }
    ] 
  }
];
