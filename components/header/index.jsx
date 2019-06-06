/**
 * 头部组件
 * @author kjx
 * @module Header
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

const AntHeader = Layout.Header;

// 下拉隐藏/上拉显示 距离顶部默认值
const DISPLAY_VALUE = 100;

// 获取底部距离
const getScrollTop = () => {
  return (
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop
  );
};

// 获取页面高度
const getWebHeight = () => {
  return (
    document.body.scrollHeight ||
    document.body.clientHeight
  );
};

// 下拉隐藏/上拉显示 边界值计算
const getBoundaryValue = (val) => {
  if (typeof val === 'boolean') return DISPLAY_VALUE;
  // 百分比计算
  const percentageReg = /(\d){1,2}%$/;
  if (percentageReg.test(val)) {
    const webHeight = getWebHeight();
    const percentage = parseInt(val, 10) / 100;
    return Math.floor(webHeight * percentage);
  }
  return parseInt(val, 10);
};

// 头部类名设置
const setHeaderClassName = (props, isHide) => {
  let className = `${props.className} kant-header`;
  if (props.fixed) {
    className = `${className} kant-header-fixed`;
    if (isHide) {
      className = `${className} kant-header-hide`;
    } else {
      className = `${className} kant-header-show`;
    }
  }
  return className;
};

// 渲染DOM节点
const renderDom = ({ children, subNav, subNavPlacement }) => {
  const dom = [
    <AntHeader key="header">
      {children}
    </AntHeader>
  ];
  if (subNav) {
    switch (subNavPlacement) {
      case 'up':
        dom.unshift(subNav);
        break;
      case 'down':
        dom.push(subNav);
        break;
      default:
        throw new Error(`无效 subNavPlacement(${subNavPlacement}) 值`);
    };
  }
  return dom;
};

/**
 * Layout 头部组件封装 参数
 * @param {object}                props
 * @param {boolean}               [props.fixed=true]      是否固定在页面
 * @param {object}                [props.style]           行内样式
 * @param {string}                [props.className]       类名
 * @param {boolean|string|number} [props.downHide=false]  滚动条下滑时，是否隐藏头部(基于fixed)
 * @param {boolean|string|number} [props.upShow=false]    滚动条上滑时，是否显示头部(基于downHide)
 * @param {element}               [props.subNav]          子菜单的ReactDom
 * @param {string}                [props.subNavPlacement] 子菜单位置，位于上方 'up' , 位于下方 'down'
 */

const Header = (props) => {
  const [historyScrollTop, setHistoryScrollTop] = useState(0);
  const [hide, setHide] = useState(false);

  const onScroll = (e) => {
    const scrollTop = getScrollTop();
    let hidden = hide;
    const downHideVal = getBoundaryValue(props.downHide);
    const upShowVal = getBoundaryValue(props.upShow);
    if (props.downHide && scrollTop > downHideVal) {
      hidden = true;
    } else {
      hidden = false;
    }
    if (props.upShow && scrollTop > upShowVal) {
      hidden = historyScrollTop > scrollTop ? false : true;
    }
    setHide(hidden);
    setHistoryScrollTop(scrollTop);
  };

  useEffect(() => {
    props.fixed && (props.downHide || props.upShow) && window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });
  return (
    <div style={props.style}
      className={setHeaderClassName(props, hide)}>
      {renderDom(props)}
    </div>
  );
};

/**
 * 自定义类型校验
 *
 * @param {Object} props
 * @param {String} propName
 * @param {String} componentName
 * @returns {Error} 类型校验错误信息
 */
function customTypeValidators(props, propName, componentName) {
  const val = props[propName];
  switch (typeof val) {
    case 'number':
      // 大于零
      if (val <= 0) {
        return new Error(`无效值：当${propName}为number时，必须大于0`);
      }
      break;
    case 'boolean':
      break;
    case 'string':
      // 仅支持'100' '100px' '10%'
      const numberReg = /^\d{1,}$/;
      const pxReg = /^\d{1,}px$/;
      const percentageReg = /^\d{1,2}%$/;
      if (!numberReg.test(val) &&
        !pxReg.test(val) &&
        !percentageReg.test(val)) {
        return new Error(`无效值：当${propName}为string时，仅支持"px"、"%"、"数值"`);
      }
      break;
    default:
      return new Error(`无效类型：${propName}支持string、number、boolean`);
  };
}

Header.propTypes = {
  fixed: PropTypes.bool,
  downHide: customTypeValidators,
  upShow: customTypeValidators,
  className: PropTypes.string,
  subNav: PropTypes.element,
  subNavPlacement: PropTypes.oneOf([
    'up',
    'down',
  ]),
};

Header.defaultProps = {
  fixed: false,
  downHide: false,
  upShow: false,
  className: '',
};

export default Header;
