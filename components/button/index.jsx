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
 * @param {Object}   props
 * @param {Object}   ref               自动接收表单校验的ref
 * @param {Function} [props.onClick]   按钮点击事件
 * @param {String}   [props.className] 按钮类名
 * @returns {ReactComponent} 按钮
 * @see {@link https://ant.design/components/button-cn/#API 更多按钮参数参照antd官网}
 */
let Button = (props, ref) => {
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
      }, 1010);
    }
  }, [isShow]);

  const className = props.className ? props.className : '';

  return (
    <div className="kant-button-content" ref={ref}>
      <AntButton
        className={isShow ? `kant-wave-button ${className}` : `${className}`}
        onClick={(e) => {
          e.stopPropagation();
          waveAnimation();
        }}
        {...otherProps}
      />
    </div>
  );
};

Button = React.forwardRef(Button);

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  onClick: null,
};

export default Button;
