import React, { useState, useEffect } from 'react';
import { SideMenu } from '@components/index';
import { Icon } from 'antd';
import '@components/side-menu/style';
import './SideMenu.less';
import { isArray, isRegExp } from 'util';

const MenuBlock = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [mark, setMark] = useState(0);
  const [openKeys, setOpenKeys] = useState([]);

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

  const getElementDom = () => {
    const element = document.getElementsByClassName('ant-menu-submenu-open');
    const elementList = [...element].reverse();
    const toggleClass = (element, j) => {
      const ul = element[j].getElementsByClassName('ant-menu-sub');
      ul[0].className += ' ant-menu-hidden';
      element[j].className = element[j].className.replace(/ant-menu-submenu-open/g, ' ');
      if (j === element.length - 1 || element.length === 0) {
        setTimeout( () => {
          setCollapsed(!collapsed);
        }, 400);
      }
    };
    const recur = (j, length, elemnt) => {
      setTimeout(() => {
        toggleClass(elementList, j);
        if( ++j <= element.length) {
          recur(j, length);
        }
      }, 400);
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
    element.className += ' kant-sider-free';
  };

  const removeClass = () => {
    const element = document.getElementsByClassName('ant-layout-sider')[0];
    element.className = element.className.replace(/kant-sider-free/g, ' ');
  };

  useEffect(() => {
    if (collapsed === false && mark === 0) {
      setMark(mark + 1);
    } else if (collapsed === false && mark !== 0 ) {
      setClass();
    } else if (collapsed === true && mark !== 0) {
      removeClass();
    }
  }, [collapsed]);

  const headDom = () => {
    return (
      <div className="kant-menu-head">
        <span className="kant-head-icon"
          onClick={ () => {
            // setCollapsed(!collapsed);
            getElementDom();
          } }
        >
          <Icon type="swap" style={{ width: '28px', height: '28px' }}></Icon>
        </span>
      </div>
    );
  };

  return (
    <div style={{ height: '700px', width: '800px', border: '1px solid black' }}>
      <SideMenu
        dataSource={dataSource}
        header={headDom()}
        siderProps={{
          theme: 'light',
        }}
        useCollapsed={true}
        isCollapsed={collapsed}
        inlineOpenStyle="normal"
        openKeys={openKeys}
      />
    </div>
  );
};

export default () => (
  <div>
    <MenuBlock />
  </div>
);
