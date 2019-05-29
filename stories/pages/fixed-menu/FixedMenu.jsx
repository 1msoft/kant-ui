import React from 'react';
import { FixedMenu } from '@components/index';
import '@components/fixed-menu/style';
import './FixedMenu.less';


const FixedMenus = () => {

  const toogels = () => {
    console.log('我点了上部');
  };


  return (
    <div style={{ height: '3000px' }}>
      <div>
        这是悬停菜单
        <div
          style={{ margin: '200px 0 0 300px', border: '1px solid red',
            height: '300px', width: '300px' }}
        >
          <FixedMenu
            onClickTop={() => {toogels();}}
            isShow={true}
            isAlways={true}
            onClickBottom={ () => { console.log('全屏事件'); } }
            bottomIcon="arrow-up"
            topIcon="fullscreen-exit"
          />

        </div>
      </div>
    </div>
  );
};

export default () => (
  <FixedMenus></FixedMenus>
);
