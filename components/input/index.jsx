import React, { useState, useEffect } from 'react';
import { Input as AntInput } from 'antd';
import omit from 'omit.js';
import PropTypes from 'prop-types';

/**
 * 文本输入框
 * @param {Object}  props
 * @param {Object}  ref                       自动接收表单校验的ref
 * @param {Boolean} [props.autosize=false]    文本域自适应内容高度
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
      `${props.className}` : ''}>
      <AntInput
        {...otherProps}
      />
    </span>
  );
};

Input = React.forwardRef(Input);

let InputTextArea = (props, ref) => {
  const filterArr = [
    'className',
  ];
  const otherProps = omit(props, filterArr);
  return (
    <span ref={ref} id="kan-textArea" className={props.className
      ? `${props.className} kant-textarea-input` : 'kant-textarea-input'}>
      <AntInput.TextArea
        {...otherProps}
      />
    </span>
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
      `${props.className}` : ''}>
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
      `${props.className}` : ''}>
      <AntInput.Password
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
