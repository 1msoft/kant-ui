import React from 'react';
import { Breadcrumb } from '@components/index';
import '@components/breadcrumb/style';
import './style.less';

export default () => (
  <div>
    面包屑导航组件介绍页面 <br />
    <div>
      <Breadcrumb
        lightFocusClass="test1"
        breadcrumbs={[{path: '/abc', text: '菜单一', icon: 'edit'},
          {path: '/abc1', text: '菜单二', icon: 'delete'}
        ]}
      />
    </div>
  </div>
);
