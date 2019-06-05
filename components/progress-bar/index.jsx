/**
 * 进度条组件
 * @author kjx
 * @module ProgressBar
 */
import React from 'react';
import PropTypes from 'prop-types';

// 解析颜色
const analyticColor = (color) => {
  const type = typeof color;
  if (type === 'object') {
    return `linear-gradient(to right, ${color.from} 0%, ${color.to} 100%)`;
  }
  return color;
};

// 设置外层行内样式
const setOuterStyle = (props) => {
  const backgroundStyle = {};
  if (props.baseColor) {
    backgroundStyle.background = analyticColor(props.baseColor);
  }
  const style = Object.assign({}, props.style, backgroundStyle);
  return style;
};

// 设置内层行内样式

/**
 * 进度条组件
 * @param {Object}         props                   参数对象
 * @param {String}        [props.mode='loading']   模式('loading' | 'scroll')
 * @param {String}        [props.className]        类
 * @param {Object}        [props.style]            行内样式
 * @param {Number}        [props.percent]          进度百分比
 * @param {String|Object} [props.baseColor]        基础颜色(Object时为渐变, 写法为{from: '', to: ''})
 * @param {String|Object} [props.strokeColor]      进度条颜色(Object时为渐变)
 * @param {Boolean}       [props.animation]        动画效果
 * @returns {ReactComponent} 表单组件
 */
const ProgressBar = (props) => {
  const outerCLassName = `kant-progress-bar-outer ${props.className}`;
  const innerClassName = props.animation ?
    'kant-progress-bar-inner kant-progress-bar-inner-animation' :
    'kant-progress-bar-inner';

  return (
    <div className={outerCLassName} style={setOuterStyle(props)}>
      <div className={innerClassName}></div>
    </div>
  );
};

// 自定义校验颜色参数值
const customVerifyColorProp = (props, propName, componentName) => {
  switch (typeof props[propName]) {
    case 'string':
      break;
    case 'object':
      if (!props[propName].hasOwnProperty('from') ||
        !props[propName].hasOwnProperty('to')) {
        return new Error(`${propName}为object时，请用{from: '', to: ''}`);
      }
      break;
    default:
      return new Error(`${propName} 仅支持string和object类型`);
  }
};

ProgressBar.propTypes = {
  mode: PropTypes.oneOf(['loading', 'scroll']),
  className: PropTypes.string,
  style: PropTypes.object,
  percent: PropTypes.number,
  baseColor: customVerifyColorProp,
  strokeColor: customVerifyColorProp,
  animation: PropTypes.bool,
};

ProgressBar.defaultProps = {
  mode: 'loading',
  className: '',
};

export default ProgressBar;
