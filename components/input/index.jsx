import React, { useState, useEffect } from 'react';
import { Input as AntInput } from 'antd';
import omit from 'omit.js';
import PropTypes from 'prop-types';

/**
 * 文本输入框
 * @param {object}   props
 * @param {boolean}  [props.autosize=false]     文本域自适应内容高度
 * @param {function} [props.onFocus]            聚焦事件
 * @param {function} [props.onBlur]             失焦事件
 * @see {@link https://ant.design/components/input-cn/#Input 更多参数 详见antd文本输入框 Input文档}
 */
const Input = React.forwardRef((props, ref) => {
  const filterArr = [];
  const otherProps = omit(props, filterArr);

  return (
    <span ref={ref}>
      <AntInput
        {...otherProps}
      />
    </span>
  );
});

const InputTextArea = React.forwardRef((props, ref) => {
  const filterArr = [
    'onFocus',
    'onBlur',
  ];
  const otherProps = omit(props, filterArr);

  const [isFocus, setIsFocus] = useState(false);

  const setFocusClassName = () => {
    return isFocus ? 'kant-textarea-focus' : 'kant-textarea-blur';
  };

  return (
    <div className={setFocusClassName()} ref={ref}>
      <AntInput.TextArea
        autosize={false}
        onFocus={() => { setIsFocus(true); props.onFocus ? props.onFocus() : null; } }
        onBlur={() => { setIsFocus(false); props.onBlur ? props.onBlur() : null; } }
        {...otherProps}
      />
    </div>
  );
});

Input.TextArea = InputTextArea;
Input.Search = AntInput.Search;
Input.Group = AntInput.Group;
Input.Password = AntInput.Password;

Input.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  onFocus: null,
  onBlur: null,
};

export default Input;
