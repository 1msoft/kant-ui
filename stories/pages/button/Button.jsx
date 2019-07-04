import React, { useState } from 'react';
import { Button } from '@components/index';
import { Divider, Icon } from "antd";
import '@components/button/style';
import './Button.less';
const KantButton = () => {
  const [ishow, setIsshow] = useState(false);
  return (
    <div style={{ margin: '100px' }}>
      <Divider orientation="left">按钮特效展示</Divider>
      <div style={{ margin: '50px' }}>
        <Button
          className='kant-button-test1'
          type='primary'
          onClick={(e) => { e.stopPropagation(); } }
        >按钮1</Button>
      </div>
      <div style={{ margin: '50px' }}>
        <Button
          shape="round"
          className='kant-button-test1'
          type='primary'
          onClick={(e) => { e.stopPropagation(); } }
        >按钮2</Button>
      </div>
      <div style={{ margin: '50px' }}>
        <Button
          shape="circle"
          size={'large'}
          type='primary'
          className="kant-text1"
          onClick={(e) => { e.stopPropagation(); } }
        ><Icon type={'delete'}></Icon></Button>
      </div>
    </div>
  );
};

export default () => (
  <KantButton></KantButton>
);
