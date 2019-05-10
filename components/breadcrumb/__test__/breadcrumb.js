import React from 'react';
import { assert, expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const { mount }= Enzyme;
import Breadcrumb from '../index.jsx';

//为Enzyme 配置适配器

Enzyme.configure({ adapter: new Adapter() });

describe('<Breadcrumb />', function() {
  it ('判断是否能正确接收导航路由数据，及其高亮颜色', function() {
    //渲染组件
    const app = mount(<Breadcrumb
      breadcrumbs={{path: '/abcc', text: '小狼1', icon: 'delete'}}
      color="red"/>);
    //判断相不相等
    expect(app.props().color).to.equal('red');

  })
})

