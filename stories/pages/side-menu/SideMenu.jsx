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
    { key: '123', title: '菜单1', url: '/abc',
      icon: <Icon type="delete" style={{ display: 'inline-block',
        paddingLeft: '4px',
        width: '40px',
        height: '40px',
        color: 'rgba(0, 0, 0, 0.8)' }}></Icon>, className: 'abccccc',
      child: [{ key: '7895', title: '菜单63', url: '/abcdhds',
        icon: <Icon type="delete"></Icon> }]
    },
    { key: '798', title: '菜单4', url: '/abcde',
      icon: <Icon type="delete"></Icon> },
    { key: '678', title: '菜单3', url: '/abcde', icon: 'delete',
      child: [{ key: '3456', title: '菜单62', url: '/abcdh' }]
    },
    { key: '789', title: '菜单5', url: '/abcde', icon: 'delete' },
    { key: '978', title: '菜单6', url: '/abcde', icon: 'delete' }
  ];

  const headDom = (retractMenu) => {
    return (
      <div className="kant-menu-head">
        <span className="kant-head-icon"
          onClick={ () => {
            retractMenu();
          } }
        >
          <Icon type="swap"
            style={{ width: '28px', height: '28px', margin: 'auto'
            }}>
          </Icon>
        </span>
      </div>
    );
  };

  return (
    <div style={{ height: '700px', width: '800px', border: '1px solid black' }}>
      <SideMenu
        dataSource={dataSource}
        header={headDom}
        siderProps={{
          theme: 'light',
        }}
        useCollapsed={true}
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
