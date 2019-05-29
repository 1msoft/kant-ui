import React from 'react';
import { Input as AntInput } from 'antd';
import omit from 'omit.js';

/**
 * 文本输入框
 * @param {object} props
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
  return (
    <div className="kant-textarea-focus">
      <AntInput.TextArea
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
