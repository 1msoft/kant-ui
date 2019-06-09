/**
 * 进度条组件
 * @author kjx
 * @module ProgressBar
 */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const LOADING = "loading";
const SCROLL = "scroll";

// 解析颜色
const analyticColor = (color) => {
  const type = typeof color;
  if (type === "object") {
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
const setInnerStyle = (props) => {
  const style = { width: `${props.percent || 0}%` };
  return style;
};

// 设置进度样式
const setStrokeStyle = (props) => {
  const style = {};
  if (props.strokeColor) {
    style.background = analyticColor(props.baseColor);
  }
  if (props.percent !== 100) {
    style.animation = "kant-paogress-initial 3s forwards";
  }
  return style;
};

// 设置动画样式
const setAnimationStyle = (props) => {
  const style = {};
  if (props.animationColor) {
    style.background = analyticColor(props.animationColor);
  }
  return style;
};


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
  const outerStyle = setOuterStyle(props);
  let innerStyle = setInnerStyle(props);
  let strokeStyle = setStrokeStyle(props);
  const animationStyle = setAnimationStyle(props);

  return (
    <div style={outerStyle} className={outerCLassName}>
      <div style={innerStyle} className="kant-progress-bar-inner">
        <div style={strokeStyle} className="kant-progress-bar">
          {
            props.animation &&
            <div style={animationStyle} className="kant-progress-bar-animation">
            </div>
          }
        </div>
      </div>
    </div>
  );
};

// 自定义校验颜色参数值
const customVerifyColorProp = (props, propName, componentName) => {
  if(props.hasOwnProperty(propName)) {
    switch (typeof props[propName]) {
      case "string":
        break;
      case "object":
        if (!props[propName].hasOwnProperty("from") ||
          !props[propName].hasOwnProperty("to")) {
          return new Error(`${propName}为object时，请用{from: "", to: ""}`);
        }
        break;
      default:
        return new Error(`${propName} 必须为 string和object 类型`);
    }
  }
};

// 自定义校验进度参数值
const customVerifyPercentProp = (props, propName, componentName) => {
  if (typeof props[propName] !== "number")
    return new Error(`${propName}必须为 number 类型`);
  if (props[propName] > 100 || props[propName] < 0)
    return new Error(`${propName}必须为 0-100之间的数字`);
};

ProgressBar.propTypes = {
  mode: PropTypes.oneOf([LOADING, SCROLL]),
  className: PropTypes.string,
  style: PropTypes.object,
  percent: customVerifyPercentProp,
  baseColor: customVerifyColorProp,
  strokeColor: customVerifyColorProp,
  animation: PropTypes.bool,
  animationColor: customVerifyColorProp,
};

ProgressBar.defaultProps = {
  mode: LOADING,
  className: "",
};

export default ProgressBar;
