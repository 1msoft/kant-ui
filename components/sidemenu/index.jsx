import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import omit from 'omit.js';
import _ from 'lodash';

const { Sider: AntSider } = Layout;
const { SubMenu: AntSubMenu } = Menu;

/**
 * 侧边栏
 * 侧边栏封装参数
 * @param {object}   props
 * @param {array}    props.dataSource=[{key = id, title: '', url: '', child: [], icon: ''}] 菜单数据源
 * @param {function} [props.collapsedDom]                   传入自定义控制菜单栏显示
 * @param {boolean}  [props.isCollapsed=false]              是否收缩菜单栏
 * @param {string}   [props.retractMode=('half' | 'all')]   收缩模式
 * @param {string}   [props.openChildMode=('vertical' | 'inline')] 展开子级的方式
 * @param {object}   [props.lightHeightstyle: {}]           当前选中菜单的高亮样式
 * @param {function} [header]                               全收缩头部组件
 * @param {function} [footer]                               全收缩底部组件
 * @param {function} [halfRetractHeader]                    半收缩头部组件
 * @param {function} [halfRetractFooter]                    半收缩底部组件
 * @param {object}   [siderStyle]                           侧边栏样式覆盖
 * @param {string}   [inlineOpenStyle='normal' | 'hideOther']   mode=inline是的子菜单展开方式
 * @param {boolean}  [showChildMenu=true]                   关闭菜单是否收缩子菜单
 * @param {array}    [selectKeysArr=[]]                     初始selectKeys的数据
 * @param {array}    [openKeysArr=[]]                       初始openKeys的数据
 * @param {function} [onLink]                               处理menuItem链接的函数
 * @param {function} [menuListDom]                          自定义的DOM处理菜单
 */

const SideMenu = (props) => {
  const otherProps = omit(props, [
    'dataSource',
    'collapsedDom',
    'isCollapsed',
    'retractMode',
    'openChildMode',
    'header',
    'footer',
    'halfRetractHeader',
    'halfRetractFooter',
    'siderStyle',
    'inlineOpenStyle',
    'showChildMenu',
    'selectKeysArr',
    'openKeysArr',
    'onLink',
    'menuListDom',
  ]);

  //定义hook state
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeysState, setSelectedKeys] = useState([]);
  const [openKeysState, setOpenKeys] = useState([]);

  //loop菜单
  const menuNode = (data) => {
    const menuElement = menu => menu.map(item => {
      if (selectedKeysState.length === 1
        && selectedKeysState[0] === item.key) {
        item.style = props.lightHeightstyle || { color: 'red' }
      } else {
        item.style = {}
      }
      if (item.child) {
        return (
          <AntSubMenu
            key={item.key}
            title={
              <span>
                {item.icon ? <Icon type={item.icon} /> : ''}
                <span>{item.title}</span>
              </span>
            }
            {...otherProps}
          >
            {menuElement(item.child)}
          </AntSubMenu>
        );
      } else {
        return (
          <Menu.Item
            style={item.style ? {...item.style} : ''}
            key={item.key}
            {...otherProps}
          >
            {
              item.url ? (!_.isEmpty(props.onLink) ? props.onLink(item.title, item.icon, item.url) :
                <a href={item.url} className='em-menu-link'>
                  {item.icon ? <Icon type={item.icon} /> : ''}
                  <span>
                    {item.title}
                  </span>
                </a>)
                : <span>{item.title}</span>
            }
          </Menu.Item>
        );
      }
    });
    return menuElement(data);
  }

  //点击显示/隐藏菜单
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }

  //收缩模式insetProps
  const toggelRetractMode = (mark, otherProps) => {
    if (mark === 'all') {
      otherProps.collapsedWidth = 0;
    }
    return otherProps;
  }

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
    })
    loopMenuObject.childMenuArr = childMenuArr;
    loopMenuObject.cascadeKeys = cascadeKeys;
    loopData(data);
    return loopMenuObject;
  }

  //展开子菜单隐藏其他项
  const hideOtherMenu = (openKeys) => {
    let dataSource = props.dataSource;
    let rootSubmenuKeys = [];
    dataSource.forEach( (item) => {
      rootSubmenuKeys.push(item.key)
    });
    const latestOpenKey = openKeys.find(key => openKeysState.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(openKeys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }

  //删除接收数组方法
  const pullAll = (arr, rmarr) => {
    return arr.filter(e => !rmarr.includes(e));
  }

  const showMenuOpenKeys = (openKeys) => {
    //根据这个openKeys 找到子级的key 收缩的时候将子级的key 关闭
    //遍历所有项的级联Keys
    const dataSource = props.dataSource;
    let cascadeListArr = [];
    for (let i = 0; i < dataSource.length; i++) {
      let loopArr = loopChildMenu([dataSource[i]]);
      cascadeListArr.push(loopArr.cascadeKeys.reverse())
    }
    let cont = 0 ;
    let arr = [];
    cascadeListArr.forEach( (item) => {
      if (!item[0]) return;
      if (item[0] && cont < 1 && openKeys.indexOf(item[0]) === -1) {
        let a = pullAll(openKeys, item);
        arr.push(...a);
        setOpenKeys(arr);
        cont++
      } else if(cont < 1){
        setOpenKeys(openKeys);
      }
    } )
  }

  //展开子菜单项不隐藏其他项
  const showOtherMenu = (openKeys) => {
    if (!props.showChildMenu) {
      showMenuOpenKeys(openKeys)
    } else {
      setOpenKeys(openKeys);
    }
  }

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
  }

  //默认展开当前第一项的菜单栏
  const cascadeKeys = () => {
    const dataSource = props.dataSource;
    const openKeysArr = props.openKeysArr;
    const data = dataSource && [dataSource[0]];
    const cascadeList = loopChildMenu(data);
    if (openKeysArr.length === 0 ) {
      setOpenKeys(cascadeList.cascadeKeys.reverse());
    } else {
      setOpenKeys(openKeysArr);
    }
  }

  //首次设置传入数据源数据的第一项菜单可点击子项为selectedKeys
  const resetMenuKeys = () => {
    const dataSource = props.dataSource;
    const selectKeysArr = props.selectKeysArr;
    let childMenu = loopChildMenu(dataSource);
    let childMenuArr = childMenu.childMenuArr;
    if (selectKeysArr.length === 0 && childMenuArr) {
      setSelectedKeys([childMenuArr[0].key]);
    } else {
      setSelectedKeys(selectKeysArr);
    }
  }

  //设置selecteKeys到hook
  const onSelect = ({item, key, selectedKeys}) => {
    setSelectedKeys(selectedKeys);
  }

  //展开的子级的方式
  const toogelOpenChildMode = (mark, otherProps) => {
    /**根据子级方式来确定选择完菜单栏的聚焦形式 */
    if (!collapsed && mark === 'inline') {
      otherProps.onOpenChange = onOpenChange;
      otherProps.openKeys = openKeysState;
      otherProps.mode = mark;
    } else if (collapsed && mark === 'inline') {
      otherProps.mode = 'vertical';
    }
    return otherProps;
  }

  const CollapsedDom = !!props.collapsedDom ? props.collapsedDom : '';
  const HalfRetractHeaderDom = !!props.halfRetractHeader ? props.halfRetractHeader : '';
  const HalfRetractFooterDom = !!props.halfRetractFooter ? props.halfRetractFooter : '';
  const HeaderDom = !!props.header ? props.header : '';
  const FooterDom = !!props.footer ? props.footer : '';
  const MenuListDom = !!props.menuListDom ? props.menuListDom : '';

  useEffect( () => {
    if (props.dataSource.length !== 0) {
      resetMenuKeys();
      cascadeKeys();
    }
  }, [])

  return (
    <Layout>
      {
        props.isCollapsed ?
          (CollapsedDom ?
            <CollapsedDom
              onClick={toggleCollapsed}
              collapsed={collapsed} />
            : '')
          : ''
      }
      <AntSider
        style={props.siderStyle}
        collapsed={props.isCollapsed ? collapsed : false}
        trigger={null}
        {...toggelRetractMode(props.retractMode, {})}
        {...otherProps}
      >
        {
          props.retractMode === 'half' ?
            (HalfRetractHeaderDom ? <HalfRetractHeaderDom /> : '')
            :
            (HeaderDom ? <HeaderDom /> : '')
        }
        <Menu
          onSelect={onSelect}
          selectedKeys={selectedKeysState}
          {...toogelOpenChildMode(props.openChildMode, otherProps)}
        >
          {
            props.retractMode === 'half'
              && collapsed === true
              && MenuListDom ?
              <MenuListDom />
              :
              menuNode(props.dataSource) }
        </Menu>
        {
          props.retractMode === 'half' ?
            (HalfRetractFooterDom ? <HalfRetractFooterDom /> : '')
            :
            (FooterDom ? <FooterDom /> : '')
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
  collapsedDom: PropTypes.func,
  isCollapsed: PropTypes.bool,
  retractMode: PropTypes.string,
  openChildMode: PropTypes.string,
  header: PropTypes.func,
  footer: PropTypes.func,
  halfRetractHeader: PropTypes.func,
  halfRetractFooter: PropTypes.func,
  siderStyle: PropTypes.object,
  inlineOpenStyle: PropTypes.string,
  showChildMenu: PropTypes.bool,
  selectKeysArr: PropTypes.array,
  openKeysArr: PropTypes.array,
  onLink: PropTypes.func,
  menuListDom: PropTypes.func,
}

SideMenu.defaultProps = {
  dataSource: [],
  isCollapsed: false,
  retractMode: 'half',
  openChildMode: 'inline',
  inlineOpenStyle: 'normal',
  showChildMenu: true,
  selectKeysArr: [],
  openKeysArr: [],
  onLink: null,
  menuListDom: null,
  collapsedDom: null,
  header: null,
  footer: null,
  halfRetractHeader: null,
  halfRetractFooter: null,
}

export default SideMenu;

