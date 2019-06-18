import React, { useState } from 'react';
import { Button } from '@components/index';
import { Divider } from "antd";
import '@components/button/style';
import './Button.less';
const KantButton = () => {
  const [ishow, setIsshow] = useState(false);
  return (
    <div style={{ margin: '100px' }}>
      <Divider orientation="left">按钮特效展示</Divider>
      <div>
        <Button
          style={{ witdh: '123px' }}
          className='kant-button-test1'
          type='primary'
          onClick={(e) => { e.stopPropagation(); } }
        >按钮1{ ishow ? '123' : '' }</Button>
      </div>
    </div>
  );
};

export default () => (
  <KantButton></KantButton>
);
