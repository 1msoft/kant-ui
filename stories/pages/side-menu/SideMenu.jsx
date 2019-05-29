import React, { useState, useEffect } from 'react';
import { SideMenu } from '@components/index';
import { Icon } from 'antd';
import '@components/side-menu/style';
import './SideMenu.less';

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
      />
    </div>
  );
};

export default () => (
  <div>
    <MenuBlock />
  </div>
);
