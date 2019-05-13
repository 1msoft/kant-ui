import React from "react";
import PropTypes from "prop-types";
import { InputNumber as AntInputNumber } from "antd";

/**
 * 自定义数字输入框组件
 * @param {ojbect}  props
 * @param {string}  [props.mode='box']      不同风格   'box' 'underline'
 * @param {string}  [props.label]           信息
 * @param {string}  [props.className]       附加类名
 * @param {boolean} [props.autoFocus=false] 自动获焦
 * @param {boolean} [props.controls=true]   是否显示控制器按钮
 * @param {number}  [props.precision]       数值精度
 * @param {string}  [props.prefix]          格式化前缀
 * @param {string}  [props.suffix]          格式化后缀
 */
const InputNumber = ({
  mode,
  label,
  controls,
  className,
  prefix,
  suffix,
  enterFunc,
  ...remain
}) => {
  const regex = new RegExp(`\\${prefix}\s?|${suffix}|(,*)`, "g");
  return (
    <AntInputNumber
      formatter={value => `${prefix}${value}${suffix}`}
      parser={value => value.replace(regex, "")}
      className={`
        em-input-number
        em-input-number-mode-${mode}
        ${controls ? "" : "em-input-number-handler-hide"}
        ${className}
      `.replace(/\s+/, " ")}
      onKeyDown={e =>
        e.keyCode === 13 && enterFunc(String(e.target.value).replace(regex, ""))
      }
      {...remain}
    />
  );
};

InputNumber.propTypes = {
  mode: PropTypes.oneOf(["box", "underline"]),
  label: PropTypes.string,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  controls: PropTypes.bool,
  precision: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  enterFunc: PropTypes.func,
};

InputNumber.defaultProps = {
  mode: "box",
  autoFocus: false,
  controls: true,
  precision: 2,
  prefix: "",
  suffix: ""
};

export default InputNumber;
