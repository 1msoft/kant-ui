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

  const otherPropsDisabled = (otherProps) => {
    if (otherProps.disabled === true) {
      delete otherProps.type;
    } else if(otherProps.disabled === false && !otherProps.type) {
      otherProps.type = 'default';
    } else if(otherProps.disabled === false && otherProps.type){
      otherProps.type = otherProps.type;
    }
    return otherProps;
  };

  const [isShow, setIsShow] = useState(false);

  const setElementNoramlStyle = () => {
    let button = document.getElementsByClassName('kant-button-settings');
    for ( let i = 0; i < button.length; i++ ) {
      if (button[i].style.width) {
        button[i].style.width = button[i].style.width;
      } else {
        button[i].style.width = '100%';
      }
      button[i].style.lineHeight = '100%';
    };
  };

  const setElementChangeStyle = () => {
    let button = document.getElementsByClassName('kant-button-settings');
    for ( let i = 0; i < button.length; i++ ) {
      button[i].style.height = button[i].offsetHeight + 'px';
      button[i].style.width = button[i].offsetWidth + 'px';
    };
  };

  const waveAnimation = (e) => {
    if (!isShow) {
      setIsShow(true);
    }
    props.onClick ? props.onClick(e) : null;
  };

  useEffect(() => {
    if(isShow) {
      setTimeout( () => {
        setIsShow(false);
      }, 1010);
    }
  }, [isShow]);

  useEffect(() => {
    setElementNoramlStyle();
    setTimeout(() => {
      setElementChangeStyle();
    }, 500);
  }, [props.children]);

  const className = props.className ? props.className : '';
  return (
    <div className="kant-button-content" ref={ref}>
      <AntButton
        className={isShow ? `kant-wave-button ${className} kant-button-settings`
          : `${className} kant-button-settings`}
        onClick={(e) => {
          e.stopPropagation();
          waveAnimation(e);
        }}
        {...otherPropsDisabled(otherProps)}
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
