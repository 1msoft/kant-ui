import React, { useState } from 'react';
import { Button } from '@components/index';
import { Divider, Icon, Button as Bt } from "antd";
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
          disabled={ishow}
          type="primary"
          onClick={(e) => { e.stopPropagation(); } }
        >按钮</Button>
      </div>
      <div style={{ margin: '50px' }}>
        <Button
          shape="round"
          className='kant-button-test1'
          type='primary'
          onClick={(e) => {
            e.stopPropagation();
            setIsshow(!ishow);
          } }
        >按钮</Button>
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
      <div style={{ margin: '50px' }}>
        <Button
          shape="round"
          size={'large'}
          type='default'
          onClick={(e) => { e.stopPropagation(); } }
        >按钮</Button>
      </div>
    </div>
  );
};

export default () => (
  <KantButton></KantButton>
);
