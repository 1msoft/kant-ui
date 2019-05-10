import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import { Breadcrumb } from '@components/index';
import '@components/breadcrumb/style';

export default () => (
  <div>
    面包屑导航组件介绍页面 <br />
    <Router>
      <Route>
        <Breadcrumb
          color={'red'}
          breadcrumbs={[{path: '/abc', text: '菜单', icon: 'edit'},
            {path: '/abc1', text: '菜单1', icon: 'delete'}
          ]}
        />
      </Route>
    </Router>
  </div>
);
