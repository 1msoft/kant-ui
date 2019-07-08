import React, { useState, useEffect } from 'react';
import { Icon, Button } from 'antd';
import { Breadcrumb } from '@components/index';
import '@components/breadcrumb/style';
import './Breadcrumb.less';
import '../../assets/iconfont/iconfont.css';

const BreadcrumbBlock = () => {

  const [breadList, setBreadList] = useState([{ path: '/abc'
    , text: '菜单一', icon: 'iconyingyongqiehuananniu' }]);

  return (
    <div>
      面包屑导航组件介绍页面 <br />
      <div className={'kant-breadcrumb'}>
        <Breadcrumb
          breadcrumbProps={{
            separator: ">"
          }}
          breadcrumbItemProps={{
            onClick: () => {
              console.log('这个是item的默认事件');
            }
          }}
          onJumpway={(url) => {
            console.log(url, '当前跳转方法');
          }}
          targetItemClass ="kant-link"
          breadcrumbs={breadList}
          // itemRender={freeDom}
          // breadcrumbs={[{ path: '/abc', text: '菜单一', icon: 'iconyingyongqiehuananniu' },
          //   { path: '/abc1', text: '菜单二', icon: 'iconyingyongqiehuananniu' },
          //   { path: '/abc1', text: '菜单三', icon: 'iconyingyongqiehuananniu' }
          // ]}
        />
        <Button
          onClick={() => {
            setBreadList([...breadList, ...[{ text: '菜单二', icon: 'iconyingyongqiehuananniu' }]]);
          }}
        >点击增加面包屑</Button>
      </div>
    </div>
  );
};

export default () => (
  <div>
    <BreadcrumbBlock />
  </div>
);
