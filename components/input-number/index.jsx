/**
 * 数字输入框
 * @author jfj
 * @module InputNumber
 */
import React from "react";
import PropTypes from "prop-types";
import { InputNumber as AntInputNumber } from "antd";

/**
 * 自定义数字输入框组件 antd数字输入框{@link https://ant.design/components/input-number-cn/}
 * @param {object}  props
 * @param {string}  [props.theme='box']     不同风格   'box' 'underline'
 * @param {string}  [props.label]           信息
 * @param {string}  [props.className]       附加类名
 * @param {boolean} [props.autoFocus=false] 自动获焦
 * @param {boolean} [props.controls=true]   是否显示控制器按钮
 * @param {number}  [props.precision]       数值精度
 * @param {function}[props.onPressEnter]    回车事件
 * @param {string}  [props.prefix]          格式化前缀
 * @param {string}  [props.suffix]          格式化后缀
 *
 */
const InputNumber = (props) => {
  const {
    theme,
    suffix,
    prefix,
    controls,
    className,
    onPressEnter,
    ...remain
  } = props;
  const regex = new RegExp(`\\${prefix}\s+?|${suffix}|(,*)`, "g");

  const handleKeyDown = (event) => {
    const { onPressEnter, onKeyDown } = props;
    const value = Number(String(event.target.value).replace(regex, ""));
    if (onPressEnter && event.keyCode === 13) {
      onPressEnter(value);
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  }
  return (
    <AntInputNumber
      formatter={value => `${prefix}${value}${suffix}`}
      parser={value => value.replace(regex, "")}
      className={`
        em-input-number
        em-input-number-theme-${theme}
        ${controls ? "" : "em-input-number-handler-hide"}
        ${className}
        `.replace(/\s+/, " ")
      }
      onKeyDown={handleKeyDown}
      {...remain}
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
  onPressEnter: () => {},
};

export default InputNumber;
