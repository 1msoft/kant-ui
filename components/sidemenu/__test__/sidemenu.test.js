import React from 'react';
import Enzyme from 'enzyme';
import sinon from 'sinon';
import { assert } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import SideMenu from '../index.jsx';
import { Button, Icon } from 'antd';

const { mount } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });

describe('侧边栏菜单', function () {

  it('给入数据源是否正确渲染数据', function () {
    const dataSource = [
      { key: '123', title: '菜单1', url: '/abc', icon: 'delete',
        child: [{ key: '345', title: '菜单2', url: '/abcd', icon: 'delete',
        child: [{ key: '778', title: '菜单3', url: '/abcdea', icon: 'delete',
          child: [{
            key: '999', title: '菜单99', url: '/abcdea', icon: 'delete'
          }]
        },
          { key: '878', title: '菜单99', url: '/abcdea', icon: 'delete'},
          { key: '078', title: '菜单00', url: '/abcdea', icon: 'delete'},
        ]}
      ]},
      { key: '678', title: '菜单3', url: '/abcde', icon: 'delete',
        child: [{ key: '3456', title: '菜单62', url: '/abcdh', icon: 'delete'}]
      },
      { key: '798', title: '菜单4', url: '/abcde', icon: 'delete'},
      { key: '789', title: '菜单5', url: '/abcde', icon: 'delete'},
      { key: '978', title: '菜单6', url: '/abcde', icon: 'delete'}
    ];
    const testDom = (props) => (
      <div style={{height: '100px', border: '1px solid red'}}></div>
    );
    const wrapper = mount(
      <SideMenu dataSource={dataSource} header={testDom} collapsedDom={testDom} halfRetractHeader={testDom} halfRetractFooter={testDom}
      footer={testDom} />
    );
    assert.equal(wrapper.find('.ant-menu-item').length, 6);
    assert.equal(wrapper.find('.ant-menu-submenu').length, 4);
    //默认高亮是否正确
    assert.equal(wrapper.find('.ant-menu-item-selected').text(),
      dataSource[0].child[0].child[0].child[0].title);
  });

  it('自定义dom能否正确接收，并接受事件', function () {
    const onClick = sinon.fake();
    const testButtonDom = (props) => (
      <Button type="primary"
        className="testButton111"
        onClick={onClick}
        style={{ marginBottom: 16, width: '50px'}}>
        <Icon type={props.collapsed ? 'menu-unfold' : 'menu-fold'} />点击
      </Button>
    );
    const wrapper = mount(
      <SideMenu isCollapsed={true}
        retractMode={'half'}
        collapsedDom={testButtonDom}/>
    );
    assert.equal(wrapper.find('.ant-btn').at(0).text(), '点击');
    (wrapper.find('.ant-btn').at(0)).simulate('click');
    assert.isTrue(onClick.called);
  });

})
