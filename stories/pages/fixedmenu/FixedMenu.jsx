import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import { FixedMenu } from '@components/index';
import '@components/fixedmenu/style';
import './style.less';

const xxxxx = () => (
  <div style={{width: '100px', height: '100px', background: 'red', overflow: 'auto'}}>
    <div style={{width: '200px', height: '200px', background: 'green'}}></div>
  </div>
);

export default () => (
  <Router>
    <Route>
      <div style={{height: '3000px'}}>
        <div>
          这是悬停菜单
          <FixedMenu showHeight={0} show={true} always={true}/>
          <FixedMenu className='fixedss'
            show={true}
            always={true}
            showHeight={1000}
            freeDom={xxxxx}
            suggestEvent={() => {console.log('我传入了自定义事件')}}
            listClassName='x1' suggestClassName='x2' arrowClassName='x3'
          />
        </div>
      </div>
    </Route>
  </Router>
);
