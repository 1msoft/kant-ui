import React from 'react';
import { assert, expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const { mount }= Enzyme;
import Breadcrumb from '../index.jsx';

//为Enzyme 配置适配器

Enzyme.configure({ adapter: new Adapter() });

describe('<Breadcrumb />', function() {

  it ('判断是否能正确接收导航路由数据，及其当前路由高亮颜色', function() {
    //渲染组件
    const app = mount(<Breadcrumb
      breadcrumbs={[{path: '/abcc', text: '测试1', icon: 'delete'}]}
      />);

      //判断相不相等
    expect(app.props().breadcrumbs[0].path).to.equal('/abcc');
    expect(app.props().breadcrumbs[0].text).to.equal('测试1');
    expect(app.props().breadcrumbs[0].icon).to.equal('delete');

    //设置props会不会改变值
    app.setProps({ breadcrumbs: [{path: '/abcd', text: '测试2', icon: 'add'}] });
    expect(app.props().breadcrumbs[0].path).to.equal('/abcd');
    expect(app.props().breadcrumbs[0].text).to.equal('测试2');
    expect(app.props().breadcrumbs[0].icon).to.equal('add');
  });

})

