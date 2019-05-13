import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import { Sideblock } from '@components/index';
import '@components/sideblock/style';
import './style.less';

const xxxxx = () => (
  <div style={{width: '100px', height: '100px', background: 'red', overflow: 'auto'}}>
    <div style={{width: '200px', height: '200px', background: 'green'}}></div>
  </div>
);

export default () => (
  <Router>
    <Route>
      <div>
        <div>
          这是停菜单
          <Sideblock className='fixedss'
            freeDom={xxxxx}
            suggestEvent={() => {console.log('我传入了自定义事件')}}
            listClassName='x1' suggestClassName='x2' arrowClassName='x3'
          />
        </div>
      </div>
    </Route>
  </Router>
);
