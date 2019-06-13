import React, { useState, useEffect } from 'react';
import { FixedMenu } from '@components/index';
import '@components/fixed-menu/style';
import { Icon, BackTop  } from 'antd';
import './FixedMenu.less';

const FinalyFixedMenu = () => {
  const [isChange, setIsChange] = useState(false);

  const iconDom = (isChange ,mark) => {
    if (mark === 'bottom') {
      let icon = !isChange ? 'delete' : 'edit';
      return icon ? <Icon type={icon} /> : null;
    } else if (mark === 'top') {
      let icon = !isChange ? 'edit' : 'delete';
      return icon ? <Icon type={icon} /> : null;
    }
  };

  const FixedMenuDom = (props) => {
    return (
      <div className={`kant-side-block-list`}>
        <div
          onClick={() => {
            setIsChange(!isChange);
          }}
          className={
            `${'kant-side-block-list-weixin'}
            kant-cp `}>
          {iconDom(isChange, 'top')}
        </div>
        <div
          onClick={() => {
            !isChange ? props.scrollToTop() : console.log('点击了顶部');
            console.log('点击了底部');
          }}
          className={
            `${'kant-side-block-list-arrow'}
            kant-cp `}>
          {iconDom(isChange, 'bottom')}
        </div>
      </div>
    );
  };
  return (
    <div style={{ height: '2000px' }}>
      <div
        style={{ margin: '200px 0 0 300px', border: '1px solid red',
          height: '300px', width: '300px', position: 'relative' }}
      >
        <FixedMenu
          display={'default'}
          visibilityHeight={300}
          speed={20}
        >
          {FixedMenuDom}
        </FixedMenu>
      </div>
    </div>
  );
};

export default () => (
  <FinalyFixedMenu></FinalyFixedMenu>
);
