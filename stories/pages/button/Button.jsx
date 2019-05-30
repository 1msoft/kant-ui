import React from 'react';
import { Button } from '@components/index';
import '@components/button/style';
import './Button.less';
export default () => (
  <div>
    按钮组件介绍页面 <br/>
    <Button
      type='primary'
      onClick={() => { console.log('这个把里面的覆盖了？');} }
    >这个是按钮</Button>
    <Button
      type='primary'
      onClick={() => { console.log('这个没有把里面覆盖？');} }
    >这个是按钮2</Button>
  </div>
);
