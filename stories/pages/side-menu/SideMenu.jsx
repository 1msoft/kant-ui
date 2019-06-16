import React, { useState, useEffect } from 'react';
import { SideMenu } from '@components/index';
import { Icon, Layout } from 'antd';
import '@components/side-menu/style';
import './SideMenu.less';
import { isArray, isRegExp } from 'util';

const MenuBlock = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [mark, setMark] = useState(0);
  const [openKeys, setOpenKeys] = useState([]);

  const dataSource = [
    { key: '123', title: '菜单1', url: '/abc',
      icon: <Icon type="delete"></Icon>, className: 'abccccc',
      child: [{ key: '7895', title: '菜单63', url: '/abcdhds',
        icon: <Icon type="delete" width='30px' height="30px"></Icon> }]
    },
    { key: '798', title: '菜单4', url: '/abcde',
      icon: <Icon type="delete"></Icon> },
    { key: '678', title: '菜单3', url: '/abcde', icon: <Icon type="delete"></Icon>,
      child: [{ key: '3456', title: '菜单62', url: '/abcdh' }]
    },
    { key: '789', title: '菜单5', url: '/abcde', icon: 'delete' },
    { key: '9782', title: '菜单6', url: '/abcde', icon: 'delete' },
    { key: '97822', title: '菜单6', url: '/abcde', icon: 'delete' },
    { key: '978222', title: '菜单6', url: '/abcde', icon: 'delete' },
    { key: '9782221', title: '菜单6', url: '/abcde', icon: 'delete' },
    { key: '978212', title: '菜单6', url: '/abcde', icon: 'delete' },
    { key: '978231', title: '菜单6', url: '/abcde', icon: 'delete' },
    { key: '978254', title: '菜单6', url: '/abcde', icon: 'delete' },
    { key: '978266', title: '菜单6', url: '/abcde', icon: 'delete' },
    { key: '978265', title: '菜单6', url: '/abcde', icon: 'delete' },
    { key: '97822555', title: '菜单6', url: '/abcde', icon: 'delete' },
    { key: '9782225552', title: '菜单6', url: '/abcde', icon: 'delete' },
    { key: '9782221524', title: '菜单6', url: '/abcde', icon: 'delete' },
    { key: '9782122214', title: '菜单6', url: '/abcde', icon: 'delete' },
    { key: '978231145', title: '菜单6', url: '/abcde', icon: 'delete' },
    { key: '978254235', title: '菜单6', url: '/abcde', icon: 'delete' },
    { key: '978266236', title: '菜单6', url: '/abcde', icon: 'delete' },
    { key: '97826588', title: '菜单6', url: '/abcde', icon: 'delete' }
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

  // const menuItemDom = (item) => {
  //   return (
  //     <div className="kant-menuitem-title">
  //       <a href={item.url}>
  //         {
  //           item.icon ? (typeof(item.icon) === 'string' ?
  //             <span className={`kant-menuitem-icon iconfont ${item.icon}`}>
  //               &nbsp;
  //             </span> : item.icon) : ''
  //         }
  //         <span className="kant-menuitem-text">{item.title}</span>
  //       </a>
  //     </div>
  //   );
  // };

  return (
    <div style={{ height: '500px', width: '800px', border: '1px solid black' }}>
      <Layout style={{ width: '100vh', height: '100vh' }}>
        <SideMenu
          dataSource={dataSource}
          header={headDom}
          siderProps={{
            theme: 'light',
          }}
          // menuItemDom={menuItemDom}
          useCollapsed={true}
          inlineOpenStyle="normal"
          openKeys={['678']}
          footer={headDom}
          // selectedKeys={['978266']}
          // onJumpway={(url,e) => {console.log(url); console.log('----->',e);}}
          // menuItemOnClick={(e) => { console.log(1111,'00---222', e);}}
        />
      </Layout>
    </div>
  );
};

export default () => (
  <div>
    <MenuBlock />
  </div>
);
