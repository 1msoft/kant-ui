/**
 * 数字输入框
 * @author jfj
 * @module InputNumber
 */
import React from "react";
import PropTypes from "prop-types";

import omit from 'omit.js';
import { InputNumber as AntInputNumber } from "antd";

/**
 * 数字输入框
 * @param {object}  props
 * @param {string}  [props.theme='box']            不同风格   'box' 'underline'
 * @param {string}  [props.label]                  信息
 * @param {string}  [props.className='']           附加类名
 * @param {boolean} [props.autoFocus=false]        自动获焦
 * @param {boolean} [props.controls=true]          是否显示控制器按钮
 * @param {number}  [props.precision]              数值精度
 * @param {function}[props.onPressEnter=()=>{}]    回车事件
 * @param {string}  [props.prefix='']              格式化前缀
 * @param {string}  [props.suffix='']              格式化后缀
 * @see {@link https://ant.design/components/input-number-cn/#API 更多参数详见 antd 数字输入框 InputNumber 文档}
 */
const InputNumber = (props) => {
  const regex = new RegExp(`\\${props.prefix}\s+?|${props.suffix}|(,*)`, "g");

  const handleKeyDown = (event) => {
    const { onPressEnter, onKeyDown } = props;
    const str = String(event.target.value).replace(regex, "");
    if (onPressEnter && event.keyCode === 13) {
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
  return (
    <AntInputNumber
      formatter={value => `${props.prefix}${value}${props.suffix}`}
      parser={value => value.replace(regex, "")}
      className={`
        kant-input-number
        kant-input-number-theme-${props.theme}
        ${props.controls ? "" : "kant-input-number-handler-hide"}
        ${props.className}
        `.replace(/\s+/, " ")
      }
      onKeyDown={handleKeyDown}
      {...otherProps}
    />
  );
};

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
  theme: "box",
  autoFocus: false,
  controls: true,
  prefix: "",
  suffix: "",
  className: "",
  onPressEnter: () => {},
};

export default InputNumber;
