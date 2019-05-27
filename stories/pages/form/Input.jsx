import React from 'react';
import { Input } from '@components/index';
import '@components/example/style';

export default () => (
  <div style={{ width: '300px' }}>
    输入框组件介绍页面 <br/>
    <Input
      inputProps={{ size: 'large' }}
    />

  </div>
);
