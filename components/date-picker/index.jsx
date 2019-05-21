/**
 * 日期范围输入框
 * @author kjx
 * @module DatePicker
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import omit from 'omit.js';
import { DatePicker as AntDatePicker } from 'antd';
import YearPicker from './YearPicker';
import locale from 'antd/lib/date-picker/locale/zh_CN';

AntDatePicker.YearPicker = YearPicker;

moment.locale('zh-cn');

// 渲染日期选择框
const renderPicker = (type, pickerProps) => {
  if (type === 'Date') {
    return <AntDatePicker {...pickerProps} />;
  } else {
    const Picker = AntDatePicker[`${type}Picker`];
    return <Picker {...pickerProps} />;
  }
};

// 解析选择器的props
const getPickerProps = (props, index) => {
  const otherProps = omit(props, [
    "type",
    "theme",
    "value",
    "defaultValue",
    "onChange",
    "className",
    "starPickerConfig",
    "endPickerConfig",
    "startDate",
    "setStartDate",
    "endDate",
    "setEndDate",
  ]);
  const isStartPicker = index === 0;
  const config = isStartPicker ? props.starPickerConfig : props.endPickerConfig;
  const className = `${props.className} kant-date-picker kant-date-picker-theme-${props.theme}`;
  let pickerProps = {
    className,
    placeholder: isStartPicker ? '开始日期' : '结束日期',
    onChange: (date, dateString) => {
      isStartPicker ? props.setStartDate(date) : props.setEndDate(date);
    },
    disabledDate: (date) => {
      const dateValue = date.valueOf();
      // 相对时间
      const relativeDate = isStartPicker ? props.endDate : props.startDate;
      if (!date || !relativeDate) {
        return false;
      }
      const relativeDateValue = relativeDate.valueOf();
      return isStartPicker ? (dateValue > relativeDateValue) : (dateValue < relativeDateValue);
    },
    ...otherProps,
    ...config,
  };
  props.value[index] && (pickerProps.value = props.value[index]);
  props.defaultValue[index] && (pickerProps.defaultValue = props.defaultValue[index]);
  return pickerProps;
};

/**
 * 日期范围输入框
 * @param {object}   props
 * @param {string}   [props.type='Date']             类型('Date' | 'Month' | 'Week' | 'Year')
 * @param {string}   [props.theme='box']             主题('box' | 'underline')
 * @param {array}    [props.value=[]]                指定时间[moment, moment]
 * @param {array}    [props.defaultValue=[]]         默认时间[moment, moment]
 * @param {number}   [props.minYear]                 最小年份 年份选择器专用
 * @param {number}   [props.maxYear]                 最大年份 年份选择器专用
 * @param {function} [props.onChange=() => {}]       时间发生变化的回调
 * @param {object}   [props.starPickerConfig]        起始时间配置
 * @param {object}   [props.endPickerConfig]         结束时间配置
 * @see {@link https://ant.design/components/date-picker-cn/#API 更多参数详见 antd 日期选择器 DatePicker 文档}
 */
const DatePicker = (props) => {
  const [startDate, setStartDate] = useState(
    props.value[0] ||
    props.defaultValue[0] ||
    null
  );
  const [endDate, setEndDate] = useState(
    props.value[1] ||
    props.defaultValue[1] ||
    null
  );
  useEffect(() => {
    props.onChange(startDate, endDate);
  }, [startDate, endDate]);
  props = Object.assign({}, props, {
    startDate,
    setStartDate,
    endDate,
    setEndDate
  });

  const startPickerProps = getPickerProps(props, 0);
  const endPickerProps = getPickerProps(props, 1);
  return (
    <div className="kant-date-picker-layout">
      {renderPicker(props.type, startPickerProps)}
      {` ~ `}
      {renderPicker(props.type, endPickerProps)}
    </div>
  );
};

/**
 * 自定义日期校验
 */
function customDateValidators(propValue, key, componentName, location, propFullName) {
  const val = propValue[key];
  if (val !== null && !moment.isMoment(val)) {
    return new Error(`无效值：组件${componentName}: ${propFullName}仅支持moment类型`);
  }
}

DatePicker.propTypes = {
  type: PropTypes.oneOf(["Date", "Week", "Month", "Year"]),
  theme: PropTypes.oneOf(["box", "underline"]),
  value: PropTypes.arrayOf(customDateValidators),
  defaultValue: PropTypes.arrayOf(customDateValidators),
  minYear: PropTypes.number,
  maxYear: PropTypes.number,
  onChange: PropTypes.func,
  starPickerConfig: PropTypes.object,
  endPickerConfig: PropTypes.object,
};

DatePicker.defaultProps = {
  type: "Date",
  theme: "box",
  value: [],
  locale,
  defaultValue: [],
  onChange: () => {},
};

export default DatePicker;
