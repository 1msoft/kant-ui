import React, { useState, useEffect } from 'react';
import { SideMenu } from '@components/index';
import { Switch, Icon, Menu } from 'antd';
import '@components/side-menu/style';
import './SideMenu.less';

const { SubMenu: AntSubMenu } = Menu;

const SideBlock = () => {
  const [retractMode, setRetractMode] = useState('half');
  const [openChildMode, setOpenChildMode] = useState('inline');
  const [isCollapsed, setisCollapsed] = useState(true);
  const [inlineStyle, setinlineStyle] = useState('normal');
  const [showChildMenu, setShowChildMenu] = useState(true);
  const changeMode = value => {
    setRetractMode(value ? 'all' : 'half');
  };
  const openMode = value => {
    setOpenChildMode(value ? 'vertical' : 'inline');
  };
  const getinlineStyle = value => {
    setinlineStyle(value ? 'hideOther' : 'normal');
  };
  const changeMCollapsed = value => {
    setisCollapsed(value ? false : true);
  };
  const getshowChildMenu = value => {
    setShowChildMenu(value ? false : true);
  };

  const testDom = (props) => {
    return (
      <div style={{ height: '100px', border: '1px solid green' }}></div>
    );
  };

  const test1Dom = (props) => {
    return (
      <div style={{ height: '100px', border: '1px solid red' }}></div>
    );
  };


  const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
  };

  const menuItemDom = (props) => (
    <a href={props.url}  className="kant-a">{props.title}</a>
  );

  return (
    <div style={{ marginLeft: '30px', position: 'absolute', left: '200px',
      height: '300px', top: '50px' }} className="kant-side-menu">
      这是侧边栏
      <div style={{ width: '1000px', height: '30px' }}
      ></div>
      <SideMenu
        menuItemDom={menuItemDom}
        menuListDom={testDom()}
        inlineOpenStyle={inlineStyle}
        siderStyle={siderStyle}
        isShowChildMenu={showChildMenu}
        header={testDom()}
        footer={testDom()}
        halfRetractHeader={test1Dom()}
        halfRetractFooter={test1Dom()}
        sideProps={{
          theme: "light"
        }}
        menuProps={{
          theme: "dark"
        }}
        retractMode={retractMode}
        openChildMode={openChildMode}
        useCollapsed={true}
        isCollapsed={openChildMode}
        dataSource={[{ key: '123', title: '菜单1', url: '/abc', icon: 'delete',
          child: [{ key: '345', title: '菜单2', url: '/abcd', icon: 'delete',
            child: [
              { key: '778', title: '菜单88', url: '/abcdea', icon: 'delete',
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
        { key: '978', title: '菜单6', url: '/abcde', icon: 'delete' }]}
      />
      <div>
        <p><Switch onChange={changeMCollapsed} />是否可以收缩</p>
        <p><Switch onChange={changeMode} />收缩方式（全收缩/半收缩）</p>
        <p><Switch onChange={openMode} />展开模式(inline/vertical)</p>
        <p><Switch onChange={getinlineStyle} />inline的展开方式</p>
        <p><Switch onChange={getshowChildMenu}/>收缩菜单是否收缩子菜单</p>
      </div>
    </div>
  );
};

const MenuBlock = () => {

  const [collapsed, setCollapsed] = useState(false);

  const dataSource = [
    { key: '123', title: '菜单1', url: '/abc', icon: 'delete', className: 'abccccc',
      child: [{ key: '7895', title: '菜单63', url: '/abcdhds' }]
    },
    { key: '798', title: '菜单4', url: '/abcde', icon: 'delete' },
    { key: '678', title: '菜单3', url: '/abcde', icon: 'delete',
      child: [{ key: '3456', title: '菜单62', url: '/abcdh' }]
    },
    { key: '789', title: '菜单5', url: '/abcde', icon: 'delete' },
    { key: '978', title: '菜单6', url: '/abcde', icon: 'delete' }
  ];

  const headDom = () => {
    return (
      <div className="kant-menu-head">
        <span className="kant-head-icon"
          onClick={ () => { setCollapsed(!collapsed); } }
        >
          <Icon type="swap"></Icon>
        </span>
      </div>
    );
  };

  const titleDom = (props) => (
    <div className="kant-submenu-title">
      <span className="kant-sub-icon"><Icon type={props.icon}></Icon>
      </span>
      <span className="kant-sub-text">{props.title}</span>
    </div>
  );

  const menuItemGroupTitleDom = (props) => (
    <div className="kant-itemgroup-title">
      <span className="kant-itemgroup-icon"><Icon type={props.icon}></Icon>
      </span>
      <span className="kant-itemgroup-text">{props.title}</span>
    </div>
  );

  const onLink = (props) => (
    <div className="kant-menuitem-title">
      <a href={'javascript:;'}>
        {
          props.icon ?
            <span className="kant-menuitem-icon"><Icon type={props.icon}></Icon></span>
            : ''
        }
        <span className="kant-menuitem-text">{props.title}</span>
      </a>
    </div>
  );

  //以下是列表栏目的处理
  const test1Dom = (props) => {
    if ( collapsed ) {
      return (
        <div style={{ width: '100%', height: '200px' }}></div>
      );
    } else {
      return null;
    }
  };
  return (
    <div style={{ height: '700px', width: '800px', border: '1px solid black' }}>
      <SideMenu
        dataSource={dataSource}
        header={headDom()}
        sideProps={{
          theme: 'light',
        }}
        menuProps={{
        }}
        useCollapsed={true}
        isCollapsed={collapsed}
        inlineOpenStyle="normal"
      />
    </div>
  );
};

export default () => (
  <div>
    {/* <SideBlock /> */}
    <MenuBlock />
  </div>
);
