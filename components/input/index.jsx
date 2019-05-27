import React from 'react';
import { Input as AntInput } from 'antd';
import PropTypes from 'prop-types';
import omit from 'omit.js';

/**
 * 文本输入框
 * @param {object} props
 * @param {object} [props.inputProps] antd 文本框api
 * @param {string} [props.className]  传入className
 */
const Input = (props) => {
  const filterArr = [];
  const inputProps = omit(props.inputProps, filterArr);
  return (
    <AntInput
      className={props.className}
      {...inputProps}
    />
  );
};

Input.propTypes = {
  inputProps: PropTypes.object,
  className: PropTypes.string,
};

export default Input;
