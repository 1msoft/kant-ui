import React from 'react';
import { Icon } from 'antd';
import { Breadcrumb } from '@components/index';
import '@components/breadcrumb/style';
import './Breadcrumb.less';
import '../../assets/iconfont/iconfont.css';

const freeDom = (props) => {
  return <a  href={props.path}><Icon style={{ marginRight: '10px', fontSize: '30px' }}
    type={'delete'}/>{props.text}</a>;
};

export default () => (
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
        // itemRender={freeDom}
        breadcrumbs={[{ path: '/abc', text: '菜单一', icon: 'iconyingyongqiehuananniu' },
          { path: '/abc1', text: '菜单二', icon: 'iconyingyongqiehuananniu' },
          { path: '/abc1', text: '菜单三', icon: 'iconyingyongqiehuananniu' }
        ]}
      />
    </div>
  </div>
);
