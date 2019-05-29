import React, { useState, useEffect } from 'react';
import { Input as AntInput } from 'antd';
import omit from 'omit.js';

/**
 * 文本输入框
 * @param {object}  props
 * @param {boolean} [props.autosize=false]    文本域自适应内容高度
 * @see {@link https://ant.design/components/input-cn/#Input 更多参数 详见antd文本输入框 Input文档}
 */
const Input = (props) => {
  const filterArr = [];
  const otherProps = omit(props, filterArr);
  return (
    <AntInput
      {...otherProps}
    />
  );
};

const InputTextArea = (props) => {
  const filterArr = [];
  const otherProps = omit(props, filterArr);

  const [isFocus, setIsFocus] = useState(false);

  const setFocusClassName = () => {
    return isFocus ? 'kant-textarea-focus' : 'kant-textarea-blur';
  };

  return (
    <div className={setFocusClassName()}>
      <AntInput.TextArea
        autosize={false}
        onFocus={() => { setIsFocus(true);} }
        onBlur={() => { setIsFocus(false);} }
        {...otherProps}
      />
    </div>
  );
};

Input.TextArea = InputTextArea;
Input.Search = AntInput.Search;
Input.Group = AntInput.Group;
Input.Password = AntInput.Password;

export default Input;
