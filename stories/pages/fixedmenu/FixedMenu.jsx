import React from 'react';
import { FixedMenu } from '@components/index';
import '@components/fixed-menu/style';
import './FixedMenu.less';

const kantTestDom = () => (
  <div style={{ width: '100px', height: '100px', background: 'red', overflow: 'auto' }}>
    <div style={{ width: '100px', height: '100px', background: 'green' }}></div>
  </div>
);

export default () => (
  <div style={{ height: '3000px' }}>
    <div>
      这是悬停菜单
      <FixedMenu showHeight={200}
        // onClick={onClick}
        suggestEvent={() => {console.log(111);}}
        show={true}
        always={false}
      />
      <FixedMenu
        className={'kant-test'}
        always={true}
        showHeight={1000}
        freeDom={kantTestDom}
      />
    </div>
  </div>
);
