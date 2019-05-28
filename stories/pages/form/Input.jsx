import React from 'react';
import { Input } from '@components/index';
import '@components/example/style';

export default () => (
  <div style={{ width: '300px' }}>
    输入框组件介绍页面 <br/>
    <Input
      size='small'
    />
    <p>密码框</p>
    <Input.Password
      size='small'
      visibilityToggle={false}
    />
    <p>文本域</p>
    <Input.TextArea
      autosize={false}
      size="default"
    >
    </Input.TextArea>
    <p>搜索框</p>
    <Input.Search
      enterButton={true}
    >
    </Input.Search>
    <p>文本框集合</p>
    <Input.Group>
      <Input size="small"></Input>
      <Input></Input>
    </Input.Group>
  </div>
);
