import React, { useState, useEffect } from 'react';
import { Input as AntInput } from 'antd';
import omit from 'omit.js';
import PropTypes from 'prop-types';

/**
 * 文本输入框
 * @param {Object}  props
 * @param {Object}  ref                       自动接收表单校验的ref
 * @param {Boolean} [props.autosize=false]    文本域自适应内容高度
 * @param {Function} [props.onFocus]          聚焦事件
 * @param {Function} [props.onBlur]           失焦事件
 * @returns {ReactComponent} 文本输入框组件
 * @see {@link https://ant.design/components/input-cn/#Input 更多参数 详见antd文本输入框 Input文档}
 */
let Input = (props, ref) => {
  const filterArr = [
    'className',
  ];
  const otherProps = omit(props, filterArr);

  return (
    <span ref={ref} className={props.className ?
      `${props.className} kant-input` : 'kant-input'}>
      <AntInput
        {...otherProps}
      />
    </span>
  );
};

Input = React.forwardRef(Input);

let InputTextArea = (props, ref) => {
  const filterArr = [
    'onFocus',
    'onBlur',
    'className',
  ];
  const otherProps = omit(props, filterArr);

  const [isFocus, setIsFocus] = useState(false);

  const setFocusClassName = () => {
    return isFocus ? 'kant-textarea-focus' : 'kant-textarea-blur';
  };

  return (
    <div className={props.className ?
      `${props.className} ${setFocusClassName()} kant-input`
      : `${setFocusClassName()} kant-input`} ref={ref} >
      <AntInput.TextArea
        autosize={false}
        onFocus={() => { setIsFocus(true); props.onFocus ? props.onFocus() : null; } }
        onBlur={() => { setIsFocus(false); props.onBlur ? props.onBlur() : null; } }
        {...otherProps}
      />
    </div>
  );
};

InputTextArea = React.forwardRef(InputTextArea);

let AntInputSearch = (props, ref) => {
  const filterArr = [
    'className',
  ];
  const otherProps = omit(props, filterArr);

  return (
    <span ref={ref} className={props.className ?
      `${props.className} kant-input` : 'kant-input'}>
      <AntInput.Search
        {...otherProps}
      />
    </span>
  );
};

AntInputSearch = React.forwardRef(AntInputSearch);

let AntInputPassword = (props, ref) => {
  const filterArr = [
    'className',
  ];
  const otherProps = omit(props, filterArr);

  return (
    <span ref={ref} className={props.className ?
      `${props.className} kant-input` : 'kant-input'}>
      <AntInput.Search
        {...otherProps}
      />
    </span>
  );
};

AntInputPassword = React.forwardRef(AntInputPassword);

Input.TextArea = InputTextArea;
Input.Search = AntInputSearch;
Input.Group = AntInput.Group;
Input.Password = AntInputPassword;

Input.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  onFocus: null,
  onBlur: null,
};
export default Input;
