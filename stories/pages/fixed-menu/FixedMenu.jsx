import React from 'react';
import { FixedMenu } from '@components/index';
import '@components/fixed-menu/style';
import { Icon } from 'antd';
import './FixedMenu.less';


/**
 * 组件说明： 1.传入特效则启动默认给的切换功能，且能够自定义切换后的BOTTOM块的事件
 *           2.无论是否启动动效，都能进行自定义TOP/BOTTOM的dom
 *           3.如果想要全部自定义， 那就把底部的样式隐藏掉， 只用顶部模块的的相关功能。
 *           4.useChange 是和 isChange 捆绑住的
 */
const FixedMenus = () => {

  const toogels = () => {
    console.log('点击了上部');
  };

  const iconDom = (isChange ,mark) => {
    if (mark === 'bottom') {
      let icon = !isChange ? 'delete' : 'edit';
      return icon ? <Icon type={icon} /> : null;
    } else if (mark === 'top') {
      let icon = !isChange ? 'edit' : 'delete';
      return icon ? <Icon type={icon} /> : null;
    }
  };

  const topDom = (props, props1) => {
    return (
      <div onClick={ () => {
        // props1();
      }}>
        {iconDom(props, 'top')}
      </div>
    );
  };

  const bottomDom = (props) => {
    return (
      <div>
        {iconDom(props, 'bottom')}
      </div>
    );
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
            useChange={false}
            topDom={topDom}
            bottomDom={bottomDom}
          />

        </div>
      </div>
    </div>
  );
};

export default () => (
  <FixedMenus></FixedMenus>
);
