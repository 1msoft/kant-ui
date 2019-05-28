import React from 'react';
import { Input as AntInput } from 'antd';
import PropTypes from 'prop-types';
import omit from 'omit.js';

/**
 * 文本输入框
 * @param {object} props
 * @param {string} [props.className]  传入className
 */
const Input = (props) => {
  const filterArr = [];
  const inputProps = omit(props, filterArr);
  return (
    <AntInput
      className={props.className}
      {...inputProps}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
};

Input.TextArea = AntInput.TextArea;
Input.Search = AntInput.Search;
Input.Group = AntInput.Group;
Input.Password = AntInput.Password;

export default Input;
