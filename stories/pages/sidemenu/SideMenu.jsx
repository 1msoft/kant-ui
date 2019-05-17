import React, { useState, useEffect } from 'react';
import { SideMenu } from '@components/index';
import { Switch, Button, Icon } from 'antd';
import '@components/sidemenu/style';
import './style.less';


const SideBlock = () => {
  const [retractMode, setRetractMode] = useState('half');
  const [openChildMode, setOpenChildMode] = useState('inline');
  const [isCollapsed, setisCollapsed] = useState(true);
  const [inlineStyle, setinlineStyle] = useState('normal');
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

  const testButtonDom = (props) => (
    <Button type="primary"
      className="testButton"
      onClick={props.onClick}
      style={{ marginBottom: 16, width: '50px'}}>
      <Icon type={props.collapsed ? 'menu-unfold' : 'menu-fold'} />
    </Button>
  );

  const testDom = (props) => (
    <div style={{height: '100px', border: '1px solid red'}}></div>
  );

  const siderStyle = {
    height: 600
  }

  return (
    <div style={{marginLeft: '30px'}} className="em-side-menu">
      这是侧边栏
      <div style={{ width: '1000px', height: '30px' }}
      ></div>
      <SideMenu
        inlineOpenStyle={inlineStyle}
        siderStyle={siderStyle}
        header={testDom}
        footer={testDom}
        halfRetractHeader={testDom}
        halfRetractFooter={testDom}
        collapsedDom={testButtonDom}
        theme="light"
        retractMode={retractMode}
        openChildMode={openChildMode}
        isCollapsed={isCollapsed}
        dataSource={[{ key: '123', title: '菜单1', url: '/abc', icon: 'delete',
          child: [{ key: '345', title: '菜单2', url: '/abcd', icon: 'delete',
            child: [
              { key: '778', title: '菜单88', url: '/abcdea', icon: 'delete',
                child: [{
                  key: '999', title: '菜单99', url: '/abcdea', icon: 'delete'
                }]
              },
              { key: '878', title: '菜单99', url: '/abcdea', icon: 'delete'},
              { key: '078', title: '菜单00', url: '/abcdea', icon: 'delete'},
            ]}
          ]},
        { key: '678', title: '菜单3', url: '/abcde', icon: 'delete',
          child: [{ key: '3456', title: '菜单62', url: '/abcdh', icon: 'delete'}]
        },
        { key: '798', title: '菜单4', url: '/abcde', icon: 'delete'},
        { key: '789', title: '菜单5', url: '/abcde', icon: 'delete'},
        { key: '978', title: '菜单6', url: '/abcde', icon: 'delete'}]}
      />
      <div>
        <p><Switch onChange={changeMCollapsed} />是否可以展开子级</p>
        <p><Switch onChange={changeMode} />收缩方式</p>
        <p><Switch onChange={openMode} />展开模式</p>
        <p><Switch onChange={getinlineStyle} />inline展开方式</p>
      </div>
    </div>
  );
}

export default () => (
  <SideBlock />
)

// (
//   <div style={{marginLeft: '30px'}}>
//     这是侧边栏
//     <div style={{ width: '1000px', height: '30px' }}
//     ></div>
//     <SideMenu
//       retractMode={retractMode}
//       isCollapsed={false}
//       dataSource={[{ key: '123', title: '菜单1', path: '/abc', icon: 'delete',
//         child: [{ key: '345', name: '菜单2', path: '/abcd', icon: 'add',
//           child: [
//             { key: '778', name: '菜单88', path: '/abcdea', icon: 'delete'},
//             { key: '878', name: '菜单99', path: '/abcdea', icon: 'delete'},
//             { key: '078', name: '菜单00', path: '/abcdea', icon: 'delete'},
//           ]}
//         ]},
//       { key: '678', name: '菜单3', path: '/abcde', icon: 'delete',
//         child: [{ key: '3456', name: '菜单62', path: '/abcdh', icon: 'add'}]
//       },
//       { key: '798', name: '菜单4', path: '/abcde', icon: 'delete'},
//       { key: '789', name: '菜单5', path: '/abcde', icon: 'delete'},
//       { key: '978', name: '菜单6', path: '/abcde', icon: 'delete'}]}
//     />
//     <div>
//       <Switch onChange={this.changeMode}>展开子级方式</Switch>
//     </div>
//   </div>
// );
