import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import omit from 'omit.js';
import _ from 'lodash';

const { Sider: AntSider } = Layout;
const { SubMenu: AntSubMenu } = Menu;
const MenuItemGroup = Menu.ItemGroup;

/**
 * 侧边栏
 * 侧边栏封装参数
 * @param {object}   props
 * @param {array}    props.dataSource=[] 菜单数据源
 * @param {string}   props.dataSource.key                   数据key 唯一标识
 * @param {string}   props.dataSource.title                 标题
 * @param {string}   props.dataSource.url                   跳转链接
 * @param {array}    props.dataSource.child                 子级路由
 * @param {string}   props.dataSource.icon                  图标
 * @param {string}   props.dataSource.className             类名
 * @param {boolean}  [props.isCollapsed=false]              是否收缩菜单栏
 * @param {boolean}  [props.collapsed=false]                菜单是否收缩
 * @param {string}   [props.retractMode=('half' | 'all')]   收缩模式
 * @param {string}   [props.openChildMode=('vertical' | 'inline')] 展开子级的方式
 * @param {function} [header]                               未收缩头部组件
 * @param {function} [footer]                               未收缩底部组件
 * @param {function} [halfRetractHeader]                    半收缩头部组件
 * @param {function} [halfRetractFooter]                    半收缩底部组件
 * @param {object}   [siderStyle]                           侧边栏样式覆盖
 * @param {string}   [inlineOpenStyle='normal' | 'hideOther'] mode=inline时的子菜单展开方式
 * @param {boolean}  [showChildMenu=true]                   关闭菜单是否收缩子菜单
 * @param {array}    [selectKeys=[]]                        当前selectKeys的数据
 * @param {array}    [openKeys=[]]                          当前openKeys的数据
 * @param {function} [menuItemDom]                          处理menuItem链接的自定义dom
 * @param {obeject}  [props.sideProps]                      layout.sider的api
 * @param {obeject}  [props.menuProps]                      menu的api
 * @param {object}   [props.menuItemProps]                  menuItem的api
 * @param {object}   [props.subMenuProps]                   subMenu的api
 * @param {function} [props.subMenuTitleDom]                subMenu标题内自定义dom
 * @param {function} [props.menuItemGroupDom]               menuItemGroup标题内自定义dom
 * @see {@link Layout.Sider参数参考  [antd 官网](https://ant.design/components/layout-cn/#Layout.Sider)}
 * @see {@link Menu参数参考 [antd 官网](https://ant.design/components/menu-cn/#API)}
 */
const SideMenu = (props) => {

  const filterArr = [
    'dataSource',
    'isCollapsed',
    'collapsed',
    'retractMode',
    'openChildMode',
    'header',
    'footer',
    'halfRetractHeader',
    'halfRetractFooter',
    'siderStyle',
    'inlineOpenStyle',
    'showChildMenu',
    'selectKeys',
    'openKeys',
    'menuItemDom',
    'subMenuTitleDom',
    'menuItemGroupDom',
  ];

  const sideProps = omit(props.sideProps, filterArr);
  const menuProps = omit(props.menuProps, filterArr);
  const menuItemProps = omit(props.menuItemProps, filterArr);
  const subMenuProps = omit(props.subMenuProps, filterArr);

  //定义hook state
  const [selectedKeysState, setSelectedKeys] = useState([]);
  const [openKeysState, setOpenKeys] = useState([]);

  //loop菜单
  const menuNode = (data) => {
    const menuElement = menu => menu.map(item => {

      if (item.child) {
        return (
          <AntSubMenu
            className={ ` ant-menu-submenu-active ${item.className ? `${item.className}` : ''}` }
            key={item.key}
            title={
              props.subMenuTitleDom ? props.subMenuTitleDom(item)
                :
                <div className="kant-submenu-title">
                  <span className={`kant-sub-icon iconfont ${item.icon}`}>
                    &nbsp;
                  </span>
                  <span className="kant-sub-text">{item.title}</span>
                </div>
            }
            {...subMenuProps}
          >
            {
              props.retractMode === 'half'
                && props.collapsed === true ?
                <MenuItemGroup
                  title={
                    props.menuItemGroupDom ? props.menuItemGroupDom(item)
                      :
                      <div className="kant-itemgroup-title">
                        <span className={`kant-itemgroup-icon iconfont ${item.icon}`}>
                          &nbsp;
                        </span>
                        <span className="kant-itemgroup-text">{item.title}</span>
                      </div>
                  }>
                  {menuElement(item.child)}
                </MenuItemGroup> : menuElement(item.child)
            }
          </AntSubMenu>
        );
      } else {
        return (
          <Menu.Item
            className={ item.className ? `${item.className}` : '' }
            key={item.key}
            {...menuItemProps}
          >
            {
              props.menuItemDom ? props.menuItemDom(item) :
                <div className="kant-menuitem-title">
                  <a href={'javascript:;'}>
                    {
                      item.icon ?
                        <span className={`kant-menuitem-icon iconfont ${item.icon}`}>
                          &nbsp;
                        </span>
                        : ''
                    }
                    <span className="kant-menuitem-text">{item.title}</span>
                  </a>
                </div>
            }
          </Menu.Item>
        );
      }
    });
    return menuElement(data);
  };

  //收缩模式insetProps
  const toggelRetractMode = (mark, otherProps) => {
    if (mark === 'all') {
      otherProps.collapsedWidth = 0;
    }
    return otherProps;
  };

  //递归遍历子级的菜单url 及其索引拥有子级菜单的key
  const loopChildMenu = (data) => {
    let loopMenuObject = {};
    let childMenuArr = [];
    let cascadeKeys = [];
    const loopData = data => data.forEach( item => {
      if (item.child) {
        loopData(item.child);
        cascadeKeys.push(item.key);
      } else {
        childMenuArr.push(item);
      }
    });
    loopMenuObject.childMenuArr = childMenuArr;
    loopMenuObject.cascadeKeys = cascadeKeys;
    loopData(data);
    return loopMenuObject;
  };

  //展开子菜单隐藏其他项
  const hideOtherMenu = (openKeys) => {
    let dataSource = props.dataSource;
    let rootSubmenuKeys = [];
    dataSource.forEach( (item) => {
      rootSubmenuKeys.push(item.key);
    });
    const latestOpenKey = openKeys.find(key => openKeysState.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(openKeys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  //删除接收数组方法
  const pullAll = (arr, rmarr) => {
    return arr.filter(e => !rmarr.includes(e));
  };

  const showMenuOpenKeys = (openKeys) => {
    //根据这个openKeys 找到子级的key 收缩的时候将子级的key 关闭
    //遍历所有项的级联Keys
    const dataSource = props.dataSource;
    let cascadeListArr = [];
    for (let i = 0; i < dataSource.length; i++) {
      let loopArr = loopChildMenu([dataSource[i]]);
      cascadeListArr.push(loopArr.cascadeKeys.reverse());
    }
    let cont = 0;
    let arr = [];
    cascadeListArr.forEach( (item) => {
      if (!item[0]) return;
      if (item[0] && cont < 1 && openKeys.indexOf(item[0]) === -1) {
        let a = pullAll(openKeys, item);
        arr.push(...a);
        setOpenKeys(arr);
        cont++;
      } else if(cont < 1){
        setOpenKeys(openKeys);
      }
    } );
  };

  //展开子菜单项不隐藏其他项
  const showOtherMenu = (openKeys) => {
    if (!props.showChildMenu) {
      showMenuOpenKeys(openKeys);
    } else {
      setOpenKeys(openKeys);
    }
  };

  //展开的子菜单项 找到openKeys目前点击的openkey
  const onOpenChange = (openKeys) => {
    //传入一个函数处理openKey 并且返回值我们自动给他设置入useState
    if ( props.inlineOpenStyle === 'hideOther' ) {
      //隐藏其他项
      hideOtherMenu(openKeys);
    } else {
      //正常显示打开的菜单项
      showOtherMenu(openKeys);
    }
  };

  //默认展开当前第一项的菜单栏
  const cascadeKeys = () => {
    const dataSource = props.dataSource;
    const openKeys = props.openKeys;
    const data = dataSource && [dataSource[0]];
    const cascadeList = loopChildMenu(data);
    if (openKeys.length === 0 ) {
      setOpenKeys(cascadeList.cascadeKeys.reverse());
    } else {
      setOpenKeys(openKeys);
    }
  };

  //首次设置传入数据源数据的第一项菜单可点击子项为selectedKeys
  const resetMenuKeys = () => {
    const dataSource = props.dataSource;
    const selectKeys = props.selectKeys;
    let childMenu = loopChildMenu(dataSource);
    let childMenuArr = childMenu.childMenuArr;
    if (selectKeys.length === 0 && childMenuArr) {
      setSelectedKeys([childMenuArr[0].key]);
    } else {
      setSelectedKeys(selectKeys);
    }
  };

  //设置selecteKeys到hook
  const onSelect = ({ item, key, selectedKeys }) => {
    setSelectedKeys(selectedKeys);
  };

  //展开的子级的方式
  const toogelOpenChildMode = (mark, otherProps) => {
    /**根据子级方式来确定选择完菜单栏的聚焦形式 */
    if (!props.collapsed && mark === 'inline') {
      otherProps.onOpenChange = onOpenChange;
      otherProps.openKeys = openKeysState;
      otherProps.mode = mark;
    } else if (props.collapsed && mark === 'inline') {
      otherProps.mode = 'vertical';
    }
    return otherProps;
  };

  const halfRetractHeaderDom = props.halfRetractHeader ? props.halfRetractHeader : null;
  const halfRetractFooterDom = props.halfRetractFooter ? props.halfRetractFooter : null;
  const headerDom = props.header ? props.header : null;
  const footerDom = props.footer ? props.footer : null;

  useEffect( () => {
    if (props.dataSource.length !== 0) {
      resetMenuKeys();
      cascadeKeys();
    }
  }, []);

  return (
    <Layout>
      <AntSider
        style={props.siderStyle}
        collapsed={props.isCollapsed ? props.collapsed : false}
        trigger={null}
        {...toggelRetractMode(props.retractMode, {})}
        {...sideProps}
      >
        {
          props.retractMode === 'half' && props.collapsed && props.halfRetractHeader ?
            halfRetractHeaderDom
            :
            (props.header ? headerDom : '')
        }
        <Menu
          onSelect={onSelect}
          selectedKeys={selectedKeysState}
          {...toogelOpenChildMode(props.openChildMode, menuProps)}
        >
          {
            menuNode(props.dataSource)
          }
        </Menu>
        {
          props.retractMode === 'half' && props.collapsed && props.halfRetractFooter ?
            halfRetractFooterDom
            :
            (props.footer ? footerDom : '')
        }
      </AntSider>
    </Layout>
  );

};

SideMenu.propTypes = {
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
      child: PropTypes.array,
      icon: PropTypes.string,
    })
  ),
  isCollapsed: PropTypes.bool,
  collapsed: PropTypes.bool,
  retractMode: PropTypes.string,
  openChildMode: PropTypes.string,
  header: PropTypes.object,
  footer: PropTypes.object,
  halfRetractHeader: PropTypes.object,
  halfRetractFooter: PropTypes.object,
  siderStyle: PropTypes.object,
  inlineOpenStyle: PropTypes.string,
  showChildMenu: PropTypes.bool,
  selectKeys: PropTypes.array,
  openKeys: PropTypes.array,
  menuItemDom: PropTypes.func,
  sideProps: PropTypes.object,
  menuProps: PropTypes.object,
  menuItemProps: PropTypes.object,
  subMenuProps: PropTypes.object,
  subMenuTitleDom: PropTypes.func,
  menuItemGroupDom: PropTypes.func,
};

SideMenu.defaultProps = {
  dataSource: [],
  isCollapsed: false,
  collapsed: false,
  retractMode: 'half',
  openChildMode: 'inline',
  inlineOpenStyle: 'normal',
  showChildMenu: true,
  selectKeys: [],
  openKeys: [],
  menuItemDom: null,
  header: null,
  footer: null,
  halfRetractHeader: null,
  halfRetractFooter: null,
  subMenuTitleDom: null,
  menuItemGroupDom: null,
};

export default SideMenu;

