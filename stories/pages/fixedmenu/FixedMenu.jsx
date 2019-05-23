import React, { useState, useEffect } from 'react';
import { FixedMenu } from '@components/index';
import { Icon } from 'antd';
import '@components/fixed-menu/style';
import './FixedMenu.less';


const FixedMenus = () => {

  const [isChange, setIsChange] = useState(false);

  const kantTestDom = () => {
    return (
      <div style={{ width: '100px', height: '100px', background: 'red', overflow: 'auto' }}>
        <div style={{ width: '100px', height: '100px', background: 'green' }}></div>
      </div>
    );
  };

  const toogelStyleChange = () => {
    console.log('我点了上部');
    setIsChange(!isChange);
    console.log(isChange, '0000');
  };

  const iconDom = (isChange ,mark) => {
    if (mark === 'bottom') {
      let icon = !isChange ? 'arrow-up' : 'fullscreen-exit';
      return <Icon type={icon}></Icon>;
    } else if (mark === 'top') {
      let icon = !isChange ? 'fullscreen' : 'arrow-up';
      return <Icon type={icon}></Icon>;
    }
  };

  return (
    <div style={{ height: '3000px' }}>
      <div>
        这是悬停菜单
        <FixedMenu showHeight={200}
          suggestEvent={() => {console.log(111);}}
          show={true}
          always={true}
        />
        <FixedMenu
          className={'kant-test'}
          always={true}
          show={true}
          showHeight={0}
          freeDom={kantTestDom()}
        />
        <div
          style={{ margin: '200px 0 0 300px', border: '1px solid red',
            height: '300px', width: '300px' }}
        >
          <FixedMenu
            suggestEvent={() => {toogelStyleChange();}}
            className={'kant-test1'}
            topClassName={ isChange ? 'kant-changetop' : 'kant-side-block-list-weixin' }
            bottomClassName={ isChange ? 'kant-changeBottom' : 'kant-side-block-list-arrow' }
            show={true}
            always={true}
            arrowEvent={ isChange ? () => { console.log('全屏事件'); } : null}
            topDom={iconDom(isChange, 'top')}
            bottomDom={iconDom(isChange, 'bottom')}
          />

        </div>
      </div>
    </div>
  );
};

export default () => (
  <FixedMenus></FixedMenus>
);
