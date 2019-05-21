import React from 'react';
import Enzyme from 'enzyme';
import sinon from 'sinon';
import { assert } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import SideMenu from '../index.jsx';
import { Button, Icon } from 'antd';

const { mount } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });

const dataSource = [
  { key: '123', title: '菜单1', url: '/abc', icon: 'delete',
    child: [{ key: '345', title: '菜单2', url: '/abcd', icon: 'delete',
      child: [{ key: '778', title: '菜单3', url: '/abcdea', icon: 'delete',
        child: [{
          key: '999', title: '菜单99', url: '/abcdea', icon: 'delete'
        }]
      },
      { key: '878', title: '菜单99', url: '/abcdea', icon: 'delete' },
      { key: '078', title: '菜单00', url: '/abcdea', icon: 'delete' },
      ] }
    ] },
  { key: '678', title: '菜单3', url: '/abcde', icon: 'delete',
    child: [{ key: '3456', title: '菜单62', url: '/abcdh', icon: 'delete' }]
  },
  { key: '798', title: '菜单4', url: '/abcde', icon: 'delete' },
  { key: '789', title: '菜单5', url: '/abcde', icon: 'delete' },
  { key: '978', title: '菜单6', url: '/abcde', icon: 'delete' }
];

describe('侧边栏菜单', function () {

  it('给入数据源是否正确渲染数据', function () {

    const testDom = (props) => (
      <div style={{ height: '100px', border: '1px solid red' }}></div>
    );
    const wrapper = mount(
      <SideMenu dataSource={dataSource}
        header={testDom}
        collapsedDom={testDom}
        halfRetractHeader={testDom}
        halfRetractFooter={testDom}
        footer={testDom} />
    );
    assert.equal(wrapper.find('.kant-menu-link span').at(0).length, 1);
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
        className="kant-button"
        onClick={onClick}
        style={{ marginBottom: 16, width: '50px' }}>
        <Icon type={props.collapsed ? 'menu-unfold' : 'menu-fold'} />点击
      </Button>
    );
    const wrapper = mount(
      <SideMenu isCollapsed={true}
        retractMode={'half'}
        openChildMode={'vertical'}
        collapsedDom={testButtonDom}/>
    );
    assert.equal(wrapper.find('.ant-btn').at(0).text(), '点击');
    (wrapper.find('.ant-btn').at(0)).simulate('click');
    assert.isTrue(onClick.called);
  });

  it ('接收头部低部Dom', function () {
    const onClick = sinon.fake();
    const testDom = (props) => (
      <div className="kant-div"></div>
    );
    const testButtonDom = (props) => (
      <Button type="primary"
        className="kant-button"
        onClick={onClick}
        style={{ marginBottom: 16, width: '50px' }}>
        <Icon type={props.collapsed ? 'menu-unfold' : 'menu-fold'} />点击
      </Button>
    );
    const wrapper = mount(
      <SideMenu isCollapsed={true}
        retractMode={'half'}
        collapsedDom={testButtonDom}
        header={testDom}
        footer={testDom}>
      </SideMenu>
    );
    assert.equal(wrapper.find('.kant-div').length, 2);
    (wrapper.find('.ant-btn').at(0)).simulate('click');
    assert.equal(wrapper.find('kant-div').length, 0);
  });

  it ('打开菜单事件触发', function () {
    const onClick = sinon.fake();

    const wrapper = mount(
      <SideMenu dataSource={dataSource} onClick={onClick}/>
    );

    (wrapper.find('.kant-menu-link').at(0)).simulate('click');
    assert.isTrue(onClick.called);
    (wrapper.find('.ant-menu-submenu-title').at(0)).simulate('click');
    assert.isTrue(onClick.called);
  });

  it ('传入自定义的链接方法是否生效', function () {
    const onClick = sinon.fake();

    const onLink = (props) => (
      <a href={props.url}  className="kant-a">{props.title}</a>
    );

    const wrapper = mount(
      <SideMenu
        dataSource={dataSource}
        onClick={onClick}
        onLink={onLink}
        retractMode={'all'}
        showChildMenu={false}
      />
    );

    assert.equal(wrapper.find('.kant-a').length, 6
    );
    (wrapper.find('.kant-a').at(0)).simulate('click');
    assert.isTrue(onClick.called);

    (wrapper.find('.ant-menu-submenu-title').at(1)).simulate('click');
    assert.isTrue(onClick.called);
  });

  it ('传入是否排除其他菜单，是否生效', function () {

    const onClick = sinon.fake();

    const wrapper = mount(
      <SideMenu
        dataSource={dataSource}
        onClick={onClick}
        inlineOpenStyle={'hideOther'}
        openKeysArr={['678']}
        selectKeysArr={['3456']}
        showChildMenu={true}
      />
    );
    (wrapper.find('.ant-menu-submenu-title').at(0)).simulate('click');
    assert.isTrue(onClick.called);
    (wrapper.find('.ant-menu-submenu-title').at(0)).simulate('click');
    assert.isTrue(onClick.called);

    assert.equal(wrapper.find('.ant-menu-item-selected a').text(),
      dataSource[1].child[0].title);

  });
});
