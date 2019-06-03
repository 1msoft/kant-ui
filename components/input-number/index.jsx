/**
 * 数字输入框
 * @author jfj
 * @module InputNumber
 */
import React, { useContext, forwardRef } from "react";
import PropTypes from "prop-types";

import omit from 'omit.js';
import {
  isEqual,
  isNil,
  isFunction,
} from 'lodash';
import classNames from 'classnames';
import Context from '../context';
import { InputNumber as AntInputNumber } from "antd";

/**
 * 数字输入框
 * @param {object}  props
 * @param {string}  [props.theme='box']            不同风格   'box' 'underline'
 * @param {string}  [props.label]                  label的标签文本(预留)
 * @param {string}  [props.className='']           附加类名
 * @param {boolean} [props.autoFocus=false]        自动获焦
 * @param {boolean} [props.controls=false]         是否显示控制器按钮
 * @param {number}  [props.precision]              数值精度
 * @param {function}[props.onPressEnter=()=>{}]    回车事件
 * @param {string}  [props.prefix='']              格式化前缀
 * @param {string}  [props.suffix='']              格式化后缀
 * @see {@link https://ant.design/components/input-number-cn/#API 更多参数详见 antd 数字输入框 InputNumber 文档}
 */
const InputNumber = forwardRef((props, ref) => {
  const handleKeyDown = (event) => {
    const { onPressEnter, onKeyDown } = props;
    if (
      !isNil(onPressEnter) &&
      isFunction(onPressEnter) &&
      isEqual(event.keyCode, 13)
    ) {
      onPressEnter(event);
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const otherProps = omit(props, [
    'theme',
    'prefix',
    'suffix',
    'onPressEnter',
    'onKeyDown',
    'controls',
    'className',
  ]);
  const kantContext = useContext(Context);
  const theme = props.theme || kantContext.theme || 'box';
  const className = classNames(
    'kant-input-number',
    `kant-input-number-theme-${theme}`,
    props.className,
    { 'kant-input-number-handler-hide': props.controls },
  );
  return (
    <div className="kant-input-number-wrapper" ref={ref}>
      {props.prefix ? (
        <span className="kant-input-number-prefix">{props.prefix}</span>
      ) : null}
      <AntInputNumber
        className={className}
        onKeyDown={handleKeyDown}
        {...otherProps}
      />
      {props.suffix ? (
        <span className="kant-input-number-suffix">{props.suffix}</span>
      ) : null}
    </div>
  );
});

InputNumber.propTypes = {
  theme: PropTypes.oneOf(["box", "underline"]),
  label: PropTypes.string,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  controls: PropTypes.bool,
  precision: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  onPressEnter: PropTypes.func,
};

InputNumber.defaultProps = {
  autoFocus: false,
  controls: false,
  prefix: "",
  suffix: "",
  className: "",
  onPressEnter: _ => _,
};

export default InputNumber;
