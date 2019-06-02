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
 *
 * @param {Object}  props
 * @param {Object}  ref                            自动接收表单校验的ref
 * @param {String}  [props.theme='box']            不同风格   'box' 'underline'
 * @param {String}  [props.label]                  label的标签文本(预留)
 * @param {String}  [props.className='']           附加类名
 * @param {Boolean} [props.autoFocus=false]        自动获焦
 * @param {Boolean} [props.controls=true]          是否显示控制器按钮
 * @param {Number}  [props.precision]              数值精度
 * @param {Function}[props.onPressEnter=()=>{}]    回车事件
 * @param {String}  [props.prefix='']              格式化前缀
 * @param {String}  [props.suffix='']              格式化后缀
 * @see {@link https://ant.design/components/input-number-cn/#API
 * 更多参数详见 antd 数字输入框 InputNumber 文档 }
 * @returns {ReactComponent} 数组输入框
 */
const InputNumber = (props, ref) => {
  const escapeCharacter = ['$', '?', '^', '*', '+'];
  const some = (array, compare) => array.some(item => item === compare);

  const transPrefix = props.prefix
    ? some(escapeCharacter, props.prefix)
      ? `\\${props.prefix}|`
      : `${props.prefix}|`
    : "";

  const transSuffix = props.suffix
    ? some(escapeCharacter, props.suffix)
      ? `\\${props.suffix}`
      : `${props.suffix}|`
    : "";

  const regex = new RegExp(`${transPrefix}${transSuffix}`, "g");
  const handleKeyDown = (event) => {
    const { onPressEnter, onKeyDown } = props;
    const str = String(event.target.value).replace(regex, "");
    if (
      !isNil(onPressEnter) &&
      isFunction(onPressEnter) &&
      isEqual(event.keyCode, 13)
    ) {
      onPressEnter(Number(str) || null);
    }
    if (onKeyDown) {
      event.target.value = str;
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
    <AntInputNumber
      ref={ref}
      formatter={value => `${props.prefix}${value}${props.suffix}`}
      parser={value => value.replace(regex, "")}
      className={className}
      onKeyDown={handleKeyDown}
      {...otherProps}
    />
  );
};
InputNumber = forwardRef(InputNumber);

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
  controls: true,
  prefix: "",
  suffix: "",
  className: "",
  onPressEnter: () => {},
};

export default InputNumber;
