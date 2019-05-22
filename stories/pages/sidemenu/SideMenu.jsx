import React, { useState, useEffect } from 'react';
import { SideMenu } from '@components/index';
import { Switch, Button, Icon } from 'antd';
import '@components/side-menu/style';
import './SideMenu.less';


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

  const testDom = (props) => (
    <div style={{ height: '100px', border: '1px solid black' }}></div>
  );

  const test1Dom = (props) => (
    <div style={{ height: '100px', border: '1px solid red' }}></div>
  );

  const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
  };

  const onLink = (props) => (
    <a href={props.url}  className="kant-a">{props.title}</a>
  );

  return (
    <div style={{ marginLeft: '30px', position: 'absolute', left: '200px',
      height: '300px', top: '50px' }} className="kant-side-menu">
      这是侧边栏
      <div style={{ width: '1000px', height: '30px' }}
      ></div>
      <SideMenu
        onLink={onLink}
        menuListDom={testDom}
        inlineOpenStyle={inlineStyle}
        siderStyle={siderStyle}
        showChildMenu={showChildMenu}
        header={testDom}
        footer={testDom}
        halfRetractHeader={test1Dom}
        halfRetractFooter={test1Dom}
        sideProps={{
          theme: "light"
        }}
        menuProps={{
          theme: "dark"
        }}
        retractMode={retractMode}
        openChildMode={openChildMode}
        isCollapsed={isCollapsed}
        // collapsed={true}
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

export default () => (
  <SideBlock />
);
