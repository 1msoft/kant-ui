/**
 * 按钮
 * @author dxl
 * @module Button
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import { Button as AntButton } from 'antd';

/**
 * 按钮
 * @param {object}   Props
 * @param {function} [props.onClick]   按钮点击事件
 * @param {string}   [props.className] 按钮类名
 * @see {@link https://ant.design/components/button-cn/#API 更多按钮参数参照antd官网}
 */
const Button = (props) => {
  const filterArr = [
    'onClick',
    'className',
  ];
  const otherProps = omit(props, filterArr);

  const [isShow, setIsShow] = useState(false);

  const waveAnimation = () => {
    if (!isShow) {
      setIsShow(true);
    }
    props.onClick ? props.onClick() : null;
  };

  useEffect(() => {
    if(isShow) {
      setTimeout( () => {
        setIsShow(false);
      }, 310);
    }
  }, [isShow]);

  const className = props.className ? props.className : '';

  return (
    <AntButton
      className={isShow ? `kant-wave-button ${className}` : `${className}`}
      onClick={(e) => {
        e.stopPropagation();
        waveAnimation();
      }}
      {...otherProps}
    />
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  onClick: null,
};

export default Button;
