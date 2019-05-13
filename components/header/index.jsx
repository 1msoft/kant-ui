import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

const AntHeader = Layout.Header;

const DISPLAY_VALUE = 100;

const getScrollTop = () => {
  return (
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop
  );
};

const getBoundaryValue = (val) => {
  if (typeof val === 'boolean') return DISPLAY_VALUE;
  const percentageReg = /(\d){1,}%$/;
  if (percentageReg.test(val)) {
    // 暂时返回，之后加工
    return DISPLAY_VALUE;
  }
  return parseInt(val);
};

const setHeaderClassName = (isFixed, isHide) => {
  let className = 'em-header';
  if (isFixed) {
    className = `${className} em-header-fixed`;
    if (isHide) {
      className = `${className} em-header-hide`;
    } else {
      className = `${className} em-header-show`;
    }
  }
  return className
};

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
 * Layout 头部组件封装
 * @param {*} props 
 */

const Header = (props) => {
  const { downHide, upShow, fixed } = props;
  const [historyScrollTop, setHistoryScrollTop] = useState(0);
  const [isFixed, setFixed] = useState(false);
  const [hide, setHide] = useState(false);

  const onScroll = (e) => {
    const scrollTop = getScrollTop();
    let hidden = hide;
    const downHideVal = getBoundaryValue(downHide);
    const upShowVal = getBoundaryValue(upShow);
    if (downHide && scrollTop > downHideVal) {
      hidden = true;
    } else {
      hidden = false;
    }
    if (upShow && scrollTop > upShowVal) {
      hidden = historyScrollTop > scrollTop ? false : true;
    }
    setHide(hidden);
    setHistoryScrollTop(scrollTop);
  };

  useEffect(() => {
    setFixed(fixed);
  }, [fixed]);

  useEffect(() => {
    fixed && (downHide || upShow) && window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });
  return (
    <div
      className={setHeaderClassName(isFixed, hide)}>
      {renderDom(props)}
    </div>
  );
};

Header.propTypes = {
  fixed: PropTypes.bool,
  downHide: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
  upShow: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
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
  subNavPlacement: 'up',
};

export default Header;
