import React from 'react';
import { Button } from '@components/index';
import '@components/button/style';
import './Button.less';
export default () => (
  <div style={{ margin: '100px' }}>
    <div>
      <Button
        className='kant-button-test1'
        type='primary'
        onClick={() => { console.log('这个把里面的覆盖了？');} }
      >查询</Button>
    </div>
    <div>
      <Button
        className='kant-button-test2'
        type='primary'
        onClick={() => { console.log('这个把里面的覆盖了？');} }
      >这个是按钮2</Button>
    </div>
  </div>
);
