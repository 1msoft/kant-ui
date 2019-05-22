import React from 'react';
import { assert, expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const { mount } = Enzyme;
import Breadcrumb from '../index.jsx';

//为Enzyme 配置适配器

Enzyme.configure({ adapter: new Adapter() });

describe('<Breadcrumb />', function() {

  it ('判断是否能正确接收导航路由数据', function() {
    //渲染组件
    const breadcrumbs = [{ path: '/abcc', text: '测试1', icon: 'delete' },
      { path: '/abcd', text: '测试2', icon: 'delete' }
    ];
    const app = mount(<Breadcrumb
      targetItemClass="kant-link"
      breadcrumbs={breadcrumbs}
    />);

    //判断相不相等
    assert.equal(app.find('.ant-breadcrumb span .kant-link').at(0).text().trim(),
      breadcrumbs[1].text);

    assert.equal(app.find('.ant-breadcrumb span a').at(0).text(),
      breadcrumbs[0].text);
  });

  it ('判断传入函数是否生效', function() {
    const breadcrumbs = [{ path: '/abcc', text: '测试1', icon: 'delete' },
      { path: '/abcd', text: '测试2', icon: 'delete' }
    ];
    const freeDom = (props) => {
      return <a  href={props.path} className="kant-a">{props.text}</a>;
    };
    const app = mount(<Breadcrumb
      targetItemClass="kant-link"
      breadcrumbs={breadcrumbs}
      itemRender={freeDom}
    />);

    assert.equal(app.find('.kant-a').at(0).text().trim(),
      breadcrumbs[0].text);
  });

});

