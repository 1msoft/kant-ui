import React from 'react';
import { Input as AntInput } from 'antd';
import PropTypes from 'prop-types';
import omit from 'omit.js';

/**
 * 文本输入框
 * @param {object} props
 * @param {object} [props.inputProps] antd 文本框api
 */
const Input = (props) => {
  const filterArr = [];
  const inputProps = omit(props.inputProps, filterArr);
  return (
    <AntInput
      {...inputProps}
    />
  );
};

Input.propTypes = {
  inputProps: PropTypes.object,
};

export default Input;
