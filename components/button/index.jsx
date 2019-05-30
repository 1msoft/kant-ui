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
 * @param {function} [props.onClick] 按钮点击事件
 * @see {@link https://ant.design/components/button-cn/#API 更多按钮参数参照antd官网}
 */
const Button = (props) => {
  const filterArr = [
    'onClick',
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
      }, 610);
    }
  }, [isShow]);

  return (
    <AntButton
      className={isShow ? 'kant-wave-button kant-chance' : 'kant-chance'}
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
};

Button.defaultProps = {
  onClick: null,
};

export default Button;
