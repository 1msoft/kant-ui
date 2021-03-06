import React from 'react';
import Enzyme from 'enzyme';
import sinon from 'sinon';
import { assert } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import SideMenu from '../index.jsx';

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

    const testDom = (props) => {
      return (
        <div className="kant-head-test" style={{ height: '100px', border: '1px solid red' }}></div>
      );
    };
    const wrapper = mount(
      <SideMenu dataSource={dataSource}
        header={testDom()}
        halfRetractHeader={testDom()}
        halfRetractFooter={testDom()}
        footer={testDom()} />
    );
    assert.equal(wrapper.find('.kant-head-test').at(0).length, 1);
    assert.equal(wrapper.find('.ant-menu-item').length, 6);
    assert.equal(wrapper.find('.ant-menu-submenu').length, 4);
    //默认高亮是否正确
    assert.equal(wrapper.find('.ant-menu-item-selected').text().trim(),
      dataSource[0].child[0].child[0].child[0].title);
  });

  it ('接收头部低部Dom', function () {
    const testDom = (props) => {
      return (
        <div className="kant-div"></div>
      );
    };
    const wrapper = mount(
      <SideMenu useCollapsed={true}
        retractMode={'half'}
        header={testDom()}
        footer={testDom()}>
      </SideMenu>
    );
    assert.equal(wrapper.find('.kant-div').length, 2);
  });

  it ('打开菜单事件触发', function () {
    const onClick = sinon.spy();

    const wrapper = mount(
      <SideMenu dataSource={dataSource}
        menuItemProps={{ onClick: onClick }}
      />
    );
    (wrapper.find('.kant-menuitem-title a').at(0)).simulate('click');
    assert.isTrue(onClick.called);
    (wrapper.find('.ant-menu-submenu-title').at(0)).simulate('click');
    assert.isTrue(onClick.called);
  });

  it ('传入自定义的链接方法是否生效', function () {
    const onClick = sinon.fake();

    const menuItemDom = (props) => (
      <a href={props.url}  className="kant-a">{props.title}</a>
    );

    const wrapper = mount(
      <SideMenu
        dataSource={dataSource}
        menuItemProps={{ onClick: onClick }}
        subMenuProps={{ onClick: onClick }}
        menuItemDom={menuItemDom}
        retractMode={'all'}
        isShowChildMenu={false}
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
        siderProps={{ onClick: onClick }}
        inlineOpenStyle={'hideOther'}
        openKeys={['678']}
        selectedKeys={['3456']}
        isShowChildMenu={true}
      />
    );
    (wrapper.find('.ant-menu-submenu-title').at(0)).simulate('click');
    assert.isTrue(onClick.called);
    (wrapper.find('.ant-menu-submenu-title').at(0)).simulate('click');
    assert.isTrue(onClick.called);

    assert.equal(wrapper.find('.ant-menu-item-selected a').text().trim(),
      dataSource[1].child[0].title);

  });
});
