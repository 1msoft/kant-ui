/**
 * 进度条组件
 * @author kjx
 * @module ProgressBar
 */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const LOADING = "loading";
const SCROLL = "scroll";

// 获取顶部距离
const getScrollTop = () => {
  return (
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop
  );
};

// 可视区域高度
const getViewPortHeight = () => {
  return (
    document.documentElement.clientHeight ||
    document.body.clientHeight
  );
};

// 获取页面高度
const getWebHeight = () => {
  return (
    document.body.scrollHeight ||
    document.body.clientHeight
  );
};

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

// 设置进度样式
const setStrokeStyle = (props) => {
  const style = {};
  if (props.strokeColor) {
    style.background = analyticColor(props.baseColor);
  }
  if (props.percent !== 100) {
    style.animation = "kant-paogress-initial 3.5s";
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
  const [width, setWidth] = useState(props.percent);

  // 样式及类名
  const outerCLassName = `kant-progress-bar-outer ${props.className}`;
  const outerStyle = setOuterStyle(props);
  const strokeStyle = setStrokeStyle(props);
  const animationStyle = setAnimationStyle(props);

  // 在scroll模式，进度条计算
  const onScroll = () => {
    const scrollTop = getScrollTop();
    const viewPortHeight = getViewPortHeight();
    const webHeight = getWebHeight();
    const val = Math.ceil((scrollTop + viewPortHeight) / webHeight * 100);
    setWidth(val);
  };

  useEffect(() => {
    if (props.mode === SCROLL) {
      onScroll();
    }
  }, []);

  // 启动scroll模式
  useEffect(() => {
    if (props.mode === SCROLL && !props.percent) {
      window.addEventListener('scroll', onScroll);
    } else {
      window.removeEventListener('scroll', onScroll);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [props.mode, props.percent]);

  useEffect(() => {
    setWidth(props.percent);
  }, [props.percent]);

  return (
    <div style={outerStyle} className={outerCLassName}>
      <div style={{ width: `${width}%` }} className="kant-progress-bar-inner">
        <div style={strokeStyle} className="kant-progress-bar">
          {
            props.animation &&
            <div style={animationStyle} className="kant-progress-bar-sprint">
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
  if (props[propName] === undefined) {
    return;
  }
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
