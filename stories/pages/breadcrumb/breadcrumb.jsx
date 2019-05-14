import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import { Breadcrumb } from '@components/index';
import '@components/breadcrumb/style';
import './style.less';

export default () => (
  <div>
    面包屑导航组件介绍页面 <br />
    <Router>
      <Route>
        <div>
          <div>
            <div>
              <Breadcrumb
                lightFocusClass="test1"
                breadClassName="test2"
                normalbreadClassName="test3"
                breadcrumbs={[{path: '/abc', text: '菜单一', icon: 'edit'},
                  {path: '/abc1', text: '菜单二', icon: 'delete'}
                ]}
              />
            </div>
          </div>
        </div>
      </Route>
    </Router>
  </div>
);
