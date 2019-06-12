import React, { useState } from 'react';
import { Button } from '@components/index';
import '@components/button/style';
import './Button.less';
const KantButton = () => {
  const [ishow, setIsshow] = useState(false);
  return (
    <div style={{ margin: '100px' }}>
      <div>
        <Button
          style={{ witdh: '123px' }}
          className='kant-button-test1'
          type='primary'
          onClick={(e) => { e.stopPropagation(); } }
        >按钮1{ ishow ? '123' : '' }</Button>
        <Button
          className='kant-button-test2'
          type='primary'
          onClick={() => { setIsshow(!ishow); } }
        >按钮2</Button>
        <Button
          className='kant-button-test2'
          type='primary'
          onClick={() => { } }
        >按钮3</Button>
      </div>
    </div>
  );
};

export default () => (
  <KantButton></KantButton>
);
