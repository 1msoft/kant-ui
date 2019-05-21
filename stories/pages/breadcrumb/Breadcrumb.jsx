import React from 'react';
import { Breadcrumb } from '@components/index';
import '@components/breadcrumb/style';
import './Breadcrumbs.less';

const freeDom = (props) => {
  return <a  href={props.path} className="kant-a">{props.text}</a>;
};

export default () => (
  <div>
    面包屑导航组件介绍页面 <br />
    <div>
      <Breadcrumb
        lightFocusClass="kant-link"
        linkRoute={freeDom}
        breadcrumbs={[{ path: '/abc', text: '菜单一', icon: 'edit' },
          { path: '/abc1', text: '菜单二', icon: 'delete' }
        ]}
      />
    </div>
  </div>
);
