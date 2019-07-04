/**
 * 侧边栏
 * @author dxl
 * @module SideMenu
 */
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
 * @param {Object}   props
 * @param {Array}    props.dataSource=[]                菜单数据源
 * @param {String}   props.dataSource.key               数据key 唯一标识
 * @param {String}   props.dataSource.title             标题
 * @param {String}   props.dataSource.url               跳转链接
 * @param {Array}    props.dataSource.child             子级路由
 * @param {String}   props.dataSource.icon              图标
 * @param {String}   props.dataSource.className         类名
 * @param {Boolean}  [props.useCollapsed=false]         是否可以收缩菜单栏
 * @param {Boolean}  [props.isCollapsed=false]          默认收缩状态
 * @param {String}   [props.retractMode='half']         收缩模式       'half' | 'all'
 * @param {String}   [props.openChildMode='inline']     展开子级的方式 'vertical' | 'inline'
 * @param {Function} [props.header]                     未收缩头部组件 参数(retractMode(处理收缩特效函数)
 * @param {Function} [props.footer]                     未收缩底部组件
 * @param {Function} [props.halfRetractHeader]          半收缩头部组件
 * @param {Function} [props.halfRetractFooter]          半收缩底部组件
 * @param {Object}   [props.siderStyle]                 侧边栏样式覆盖
 * @param {String}   [props.inlineOpenStyle='normal']   mode=inline时的子菜单展开方式 'normal' | 'hideOther'
 * @param {Boolean}  [props.isShowChildMenu=true]       关闭菜单是否收缩子菜单
 * @param {Array}    [props.selectedKeys=[]]            当前selectedKeys的数据
 * @param {Array}    [props.openKeys=[]]                当前openKeys的数据
 * @param {Function} [props.menuItemDom]                处理menuItem链接的自定义dom 参数(item)
 * @param {Obeject}  [props.siderProps]                 layout.sider的api
 * @param {Obeject}  [props.menuProps]                  menu的api
 * @param {Object}   [props.menuItemProps]              menuItem的api
 * @param {Object}   [props.subMenuProps]               subMenu的api
 * @param {Function} [props.subMenuTitleDom]            subMenu标题内自定义dom 参数(item)
 * @param {Function} [props.menuItemGroupDom]           menuItemGroup标题内自定义dom 参数(item)
 * @param {Function} [props.onJumpway]                  使用默认a标签时的跳转方法 参数(url, e)
 * @param {Function} [props.menuItemOnClick]            覆盖antd中menuItem的onClick事件
 * @returns {ReactComponent} 侧边栏
 * @see {@link Layout.Sider参数参考  [antd 官网](https://ant.design/components/layout-cn/#Layout.Sider)}
 * @see {@link Menu参数参考 [antd 官网](https://ant.design/components/menu-cn/#API)}
 */
const SideMenu = (props) => {

  const filterArr = [
    'dataSource',
    'useCollapsed',
    'isCollapsed',
    'retractMode',
    'openChildMode',
    'header',
    'footer',
    'halfRetractHeader',
    'halfRetractFooter',
    'siderStyle',
    'inlineOpenStyle',
    'isShowChildMenu',
    'selectedKeys',
    'openKeys',
    'menuItemDom',
    'subMenuTitleDom',
    'menuItemGroupDom',
    'className',
    'href',
    'menuItemOnClick',
  ];
  const filterMenuItem = [
    'onClick'
  ];
  const filterMenuItemArr = [...filterArr, ...filterMenuItem];

  const siderProps = omit(props.siderProps, filterArr);
  const menuProps = omit(props.menuProps, filterArr);
  const menuItemProps = omit(props.menuItemProps, filterMenuItemArr);
  const subMenuProps = omit(props.subMenuProps, filterArr);

  const [selectedKeysState, setSelectedKeys] = useState([]);
  const [openKeysState, setOpenKeys] = useState([]);
  const [collapsed, setCollapsed] = useState(props.isCollapsed);
  const [mark, setMark] = useState(0);

  const jumpWay = (url) => {
    return {
      'onClick': !props.menuItemDom ? (e) => {
        !props.onJumpway ?  location.href = url :  props.onJumpway(url, e);
        _.isFunction(props.menuItemOnClick) ? props.menuItemOnClick(e) : null;
      } : ''
    };
  };

  const focuChildKey = (child, selectedKey) => {
    let isKey = false;
    if (child && child.length !== 0) {
      for (let i = 0; i < child.length; i++) {
        if (child[i].key === selectedKey) {
          isKey = true;
        }
      }
    }
    return isKey;
  };

  const menuNode = (data) => {
    const menuElement = menu => menu.map(item => {
      if (item.key === selectedKeysState[0] || focuChildKey(item.child, selectedKeysState[0])) {
        item.selectedClassName = "kant-selectedKeys";
      } else {
        delete item.selectedClassName;
      }
      if (item.child) {
        return (
          <AntSubMenu
            className={ item.className ? `${item.className} ${item.selectedClassName}`
              : `${item.selectedClassName}`}
            key={item.key}
            title={
              props.subMenuTitleDom ? props.subMenuTitleDom(item)
                :
                <div className="kant-submenu-title">
                  {
                    item.icon ? (typeof(item.icon) === 'string' ?
                      <span className={`kant-sub-icon iconfont ${item.icon}`}>
                      </span> : item.icon) : ''
                  }
                  <span className="kant-sub-text">{item.title}</span>
                  <Icon type="right"
                    className="kant-icon-allow"
                  />
                </div>
            }
            {...subMenuProps}
          >
            {
              props.retractMode === 'half'
                && collapsed === true ?
                <MenuItemGroup
                  className={'kant-menuitemgroup-content'}
                  title={
                    props.menuItemGroupDom ? props.menuItemGroupDom(item)
                      :
                      <div className="kant-itemgroup-title">
                        {
                          item.icon ? (typeof(item.icon) === 'string' ?
                            <span className={`kant-itemgroup-icon iconfont ${item.icon}`}>
                            </span> : item.icon) : ''
                        }
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
            {...jumpWay(item.url)}
          >
            {
              props.menuItemDom ? props.menuItemDom(item) :
                <div className="kant-menuitem-title">
                  <a>
                    {
                      item.icon ? (typeof(item.icon) === 'string' ?
                        <span className={`kant-menuitem-icon iconfont ${item.icon}`}>
                        </span> : item.icon)
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

  const toggelRetractMode = (mark, otherProps) => {
    if (mark === 'all') {
      otherProps.collapsedWidth = 0;
    }
    return otherProps;
  };

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

  const pullAll = (arr, rmarr) => {
    return arr.filter(e => !rmarr.includes(e));
  };

  const showMenuOpenKeys = (openKeys) => {
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

  const showOtherMenu = (openKeys) => {
    if (!props.isShowChildMenu) {
      showMenuOpenKeys(openKeys);
    } else {
      setOpenKeys(openKeys);
    }
  };

  const onOpenChange = (openKeys) => {
    if ( props.inlineOpenStyle === 'hideOther' ) {
      hideOtherMenu(openKeys);
    } else {
      showOtherMenu(openKeys);
    }
  };

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

  const resetMenuKeys = () => {
    const dataSource = props.dataSource;
    const selectedKeys = props.selectedKeys;
    let childMenu = loopChildMenu(dataSource);
    let childMenuArr = childMenu.childMenuArr;
    if (selectedKeys.length === 0 && childMenuArr) {
      setSelectedKeys([childMenuArr[0].key]);
    } else {
      setSelectedKeys(selectedKeys);
    }
  };

  const onSelect = ({ item, key, selectedKeys }) => {
    setSelectedKeys(selectedKeys);
  };

  const toogelOpenChildMode = (mark, otherProps) => {
    if (!collapsed && mark === 'inline') {
      otherProps.onOpenChange = onOpenChange;
      otherProps.openKeys = openKeysState;
      otherProps.mode = mark;
    } else if (collapsed && mark === 'inline') {
      otherProps.mode = 'vertical';
    }
    return otherProps;
  };

  //收起级联下级并且收缩菜单
  const retractMenu = () => {
    const element = document.getElementsByClassName('ant-menu-submenu-open');
    const elementList = [...element].reverse();
    const toggleClass = (element, j) => {
      const ul = element[j].getElementsByClassName('ant-menu-sub');
      element[j].className = element[j].className.replace(/ant-menu-submenu-open/g, ' ');
      ul[0].className += ' ant-menu-hidden';
      if (j === element.length - 1 || element.length === 0) {
        setTimeout( () => {
          setCollapsed(!collapsed);
        }, 50);
      }
    };
    const recur = (j, length) => {
      setTimeout(() => {
        if( ++j <= element.length || element.length > 0) {
          toggleClass(elementList, j - 1);
          recur(j, length);
        }
      }, 50);
    };
    if (element.length !== 0) {
      recur(0, element.length);
    }
    if (element.length === 0 ) {
      setCollapsed(!collapsed);
    }
  };

  //设置一个类名给sider
  const setClass = () => {
    const element = document.getElementsByClassName('ant-layout-sider')[0];
    // element.className += ' kant-sider-free';
  };

  const removeClass = () => {
    const element = document.getElementsByClassName('ant-layout-sider')[0];
    element.className = element.className.replace(/kant-sider-free/g, ' ');
  };

  const setScrollHeight = () => {
    let headDom = document.getElementsByClassName('kan-head-over')[0];
    let siderDom = document.getElementsByClassName('kant-sidermenu-content')[0];
    let scrollDom = document.getElementsByClassName('kant-scroll')[0];
    let headHeight = headDom ? headDom.clientHeight : 0;
    let siderHeight = siderDom ? siderDom.clientHeight : 0;
    scrollDom.style.height = (siderHeight - headHeight) + 'px';
  };

  const roteIcon = () => {
    let ele = document.getElementsByClassName('roteClass')[0];
    let mark = 0;
    if (mark === 0) {
      ele.className += ' kant-icon-rote';
      mark = 1;
    }
    setTimeout(() => {
      ele.className = ele.className.replace(/kant-icon-rote/g, '');
      mark = 0;
    }, 300);
  };

  window.onresize = function(){
    setScrollHeight();
  };

  useEffect( () => {
    if (props.dataSource.length !== 0) {
      resetMenuKeys();
      cascadeKeys();
    }
    setScrollHeight();
  }, []);

  //设置收缩/展开
  useEffect(() => {
    if (collapsed === false && mark === 0) {
      setMark(mark + 1);
    } else if (collapsed === false && mark !== 0 ) {
      setOpenKeys([]);
      setClass();
      setTimeout(() => {
        cascadeKeys();
      }, 100);
    } else if (collapsed === true && mark !== 0) {
      removeClass();
      setOpenKeys([]);
    }
  }, [collapsed]);

  const retractModeClassName = (retractMode, collapsed) => {
    if (retractMode === 'all' && collapsed === true) {
      return 'retractModeClass';
    } else {
      return '';
    }
  };

  return (
    <AntSider
      className={props.className ?
        `kant-sidermenu-content ${props.className}
          ${retractModeClassName(props.retractMode, collapsed)}`
        : `kant-sidermenu-content ${retractModeClassName(props.retractMode, collapsed)}`}
      style={props.siderStyle}
      collapsed={props.useCollapsed ? collapsed : false}
      trigger={null}
      theme="light"
      style={{ height: '100%' }}
      {...toggelRetractMode(props.retractMode, {})}
      {...siderProps}
    >
      <div className={'kan-head-over'}>
        {
          props.retractMode === 'half' && collapsed && props.halfRetractHeader ?
            props.halfRetractHeader(retractMenu)
            :
            (props.header ? props.header(retractMenu) :
              <div className="kant-menu-head">
                <span className="kant-head-icon roteClass"
                  onClick={ () => {
                    setTimeout(()=>{
                      retractMenu();
                    }, 150);
                    roteIcon();
                  } }
                >
                  <Icon type="swap-right" className="bottom-icon"></Icon>
                  <Icon type="swap-right" className="top-icon"></Icon>
                </span>
              </div>
            )
        }
      </div>
      <div className="kant-scroll" id="kant-scroll">
        <Menu
          onSelect={onSelect}
          selectedKeys={selectedKeysState}
          {...toogelOpenChildMode(props.openChildMode, menuProps)}
        >
          {
            menuNode(props.dataSource)
          }
        </Menu>
      </div>
      {
        props.retractMode === 'half' && collapsed && props.halfRetractFooter ?
          props.halfRetractFooter()
          :
          (props.footer ? props.footer() : '')
      }
    </AntSider>
  );

};

SideMenu.propTypes = {
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
      child: PropTypes.array,
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
      className: PropTypes.string,
    })
  ),
  useCollapsed: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  retractMode: PropTypes.string,
  openChildMode: PropTypes.string,
  header: PropTypes.func,
  footer: PropTypes.func,
  halfRetractHeader: PropTypes.func,
  halfRetractFooter: PropTypes.func,
  siderStyle: PropTypes.object,
  inlineOpenStyle: PropTypes.string,
  isShowChildMenu: PropTypes.bool,
  selectedKeys: PropTypes.array,
  openKeys: PropTypes.array,
  menuItemDom: PropTypes.func,
  siderProps: PropTypes.object,
  menuProps: PropTypes.object,
  menuItemProps: PropTypes.object,
  subMenuProps: PropTypes.object,
  subMenuTitleDom: PropTypes.func,
  menuItemGroupDom: PropTypes.func,
  onJumpway: PropTypes.func,
  menuItemOnClick: PropTypes.func,
};

SideMenu.defaultProps = {
  dataSource: [],
  useCollapsed: true,
  isCollapsed: false,
  retractMode: 'half',
  openChildMode: 'inline',
  inlineOpenStyle: 'normal',
  isShowChildMenu: true,
  selectedKeys: [],
  openKeys: [],
  menuItemDom: null,
  header: null,
  footer: null,
  halfRetractHeader: null,
  halfRetractFooter: null,
  subMenuTitleDom: null,
  menuItemGroupDom: null,
  onJumpway: null,
};

export default SideMenu;

