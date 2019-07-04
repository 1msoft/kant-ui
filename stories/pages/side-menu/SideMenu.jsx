import React, { useState, useEffect } from 'react';
import { SideMenu } from '@components/index';
import { Button } from 'antd';
import { Icon, Layout } from 'antd';
import '@components/side-menu/style';
import './SideMenu.less';
import '../../assets/styles/index';
import { isArray, isRegExp } from 'util';

const MenuBlock = () => {

  const [collapsed, setCollapsed] = useState({ isOpen: false });
  const [mark, setMark] = useState(0);
  const [openKeys, setOpenKeys] = useState([]);

  const dataSource = [{
    "key": "HomePage",
    "title": "首页", "url": "/home", "icon": "iconMail-xiaoxi"
  },
  {
    "key": "Example",
    "title": "演示", "url": "/example", "icon": 'iconMail-xiaoxi'
  },
  {
    "key": "ArchiveManage",
    "title": "配置管理", "icon": "iconMail-xiaoxi",
    "child": [{
      "key": "DataDictList",
      "title": "通用字典配置", "url": "/config-manage/data-dict/list"
    },
    {
      "key": "AccountClassify",
      "title": "账户分级字典配置", "url": "/config-manage/data-dict/account-classify"
    },
    {
      "key": "AccountType", "title":
        "账户分类字典配置", "url": "/config-manage/data-dict/account-type"
    },
    {
      "key": "subAccountType",
      "title": "子账户分类字典配置", "url": "/config-manage/data-dict/sub-account-type"
    }]
  },
  {
    "key": "ServiceProvider",
    "title": "服务商管理", "icon": "iconMail-xiaoxi", "child": [{
      "key": "ServiceAcct", "title": "服务商账户管理",
      "url": "/service-provider/acct-manage"
    }, {
      "key": "ServiceDepositAcct",
      "title": "服务商存管账户管理", "url": "/service-provider/deposit-acct-manage"
    },
    {
      "key": "ServicePayChannel",
      "title": "服务商支付渠道管理", "url": "/service-provider/pay-channel-manage"
    }]
  },
  {
    "key": "InOutMoney", "title": "出入金管理", "icon": "iconMail-xiaoxi",
    "child": [{
      "key": "InfoRecording",
      "title": "支出账户信息备案", "url": "/in-out-money/info-recording"
    }]
  },
  {
    "key": "CustomerManage", "title": "客户管理", "icon": "iconMail-xiaoxi",
    "child": [{
      "key": "CustomerAccount",
      "title": "客户账户管理", "url": "/customer-manage/account"
    }]
  },
  {
    "key": "SwaggerManage", "title": "商户管理", "icon": "iconMail-xiaoxi",
    "child": [{
      "key": "SwaggerAcct",
      "title": "商户账户管理", "url": "/swagger-manage/account-manage"
    },
    {
      "key": "SwaggerSubAcct",
      "title": "商户子账户管理", "url": "/swagger-manage/sub-account-manage"
    }]
  },
  {
    "key": "FinanceManage", "title": "财务管理", "icon": "iconMail-xiaoxi",
    "child": [{
      "key": "AccountSubject", "title": "会计科目维护",
      "url": "/finance-manage/account-subject"
    }]
  },
  {
    "key": "MyWallet", "title": "客户钱包管理", "icon": "iconMail-xiaoxi",
    "child": [{
      "key": "CouponManagement",
      "title": "卡券管理", "url": "/my-wallet/coupon-management"
    },
    {
      "key": "BankCardManagement",
      "title": "银行卡管理", "url": "/my-wallet/bank-card-management"
    },
    {
      "key": "PasswordManagement",
      "title": "钱包密码管理", "url": "/my-wallet/password-management"
    }]
  },
  {
    key: '9782225552', title: '菜单6', url: '/abcde',
    icon: <Icon type="delete" style={{ fontSize: '55px' }}></Icon>
  },
  {
    key: '9782221524', title: '菜单6', url: '/abcde',
    icon: <Icon type="delete" style={{ fontSize: '55px' }}></Icon>
  },
  {
    key: '9782122214', title: '菜单6', url: '/abcde',
    icon: <Icon type="delete" style={{ fontSize: '55px' }}></Icon>
  },
  {
    key: '978231145', title: '菜单6', url: '/abcde',
    icon: <Icon type="delete" style={{ fontSize: '55px' }}></Icon>
  },
  {
    key: '978254235', title: '菜单6', url: '/abcde',
    icon: <Icon type="delete" style={{ fontSize: '55px' }}></Icon>
  },
  {
    key: '978266236', title: '菜单6', url: '/abcde',
    icon: <Icon type="delete" style={{ fontSize: '55px' }}></Icon>
  },
  {
    key: '97826588', title: '菜单5', url: '/abcde',
    icon: <Icon type="delete" style={{ fontSize: '55px' }}></Icon>
  }];

  const headDom = (retractMenu) => {
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
      }, 600);
    };
    //swap-left
    return (
      <div className="kant-menu-head">
        <span className="kant-head-icon roteClass"
          onClick={ () => {
            setTimeout(()=>{
              retractMenu();
            }, 601);
            roteIcon();
          } }
        >
          {/* <Icon type="swap"
            // className="roteClass"
          >
          </Icon> */}

          <Icon type="swap-right" className="bottom-icon"></Icon>
          <Icon type="swap-right" className="top-icon"></Icon>
        </span>
      </div>
    );
  };

  // const menuItemDom = (item) => {
  //   return (
  //     <div className="kant-menuitem-title">
  //       <a href={item.url} onClick={() => {console.log('aaaaaaa');}}>
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
    <Layout style={{ width: '100vh', height: '100vh' }}>
      <SideMenu
        dataSource={dataSource}
        // header={() => {}}
        siderProps={{
          // theme: 'dark',
        }}
        isCollapsed={{ isOpen: false }}
        // retractMode='all'
        // menuItemDom={menuItemDom}
        // useCollapsed={true}
        // inlineOpenStyle="normal"
        // openKeys={['678']}
        // footer={headDom}
        // selectedKeys={['978266']}
        onJumpway={(url,e) => {console.log(url); console.log('----->',e);}}
        // menuItemOnClick={(e) => { console.log(1111,'00---222', e);}}
      />
      <Button onClick={() => {setCollapsed({ isOpen: true });}}></Button>
    </Layout>

  );
};

export default () => (
  <div>
    <MenuBlock />
  </div>
);
