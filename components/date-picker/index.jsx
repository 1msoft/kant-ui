/**
 * 日期范围输入框
 * @author kjx
 * @module DatePicker
 */
import React, { useState, useEffect, useContext, forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import omit from 'omit.js';
import { DatePicker as AntDatePicker } from 'antd';
import YearPicker from './YearPicker';
import Context from '../context';
import locale from 'antd/lib/date-picker/locale/zh_CN';

AntDatePicker.YearPicker = YearPicker;

moment.locale('zh-cn');
const ruleKey = 'autoVerify';
const filterPropKeys = [
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
];

// 渲染日期选择框
const renderPicker = (type, pickerProps) => {
  if (type === 'Date') {
    return <AntDatePicker {...pickerProps} />;
  } else {
    const Picker = AntDatePicker[`${type}Picker`];
    return <Picker {...pickerProps} />;
  }
};

// form表单重置字段时，修改选择器的props
const changePropsByResetField = (props, pickerProps, isStartPicker) => {
  pickerProps.value = null;
  pickerProps.disabledDate = () => {
    return false;
  };
  pickerProps.onChange = (date, dateString) => {
    if (isStartPicker) {
      props.setStartDate(date);
      props.setEndDate(null);
    } else {
      props.setStartDate(null);
      props.setEndDate(date);
    }
  };
};

// 解析选择器的props
const getPickerProps = (props, index, ref) => {
  const otherProps = omit(props, filterPropKeys);
  const isStartPicker = index === 0;
  const config = isStartPicker ? props.starPickerConfig : props.endPickerConfig;
  const kantContext = useContext(Context);
  const theme = props.theme || kantContext.theme || 'box';
  const className = `${props.className} kant-date-picker kant-date-picker-theme-${theme}`;
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
  props.value && (pickerProps.value = props.value[index]);
  props.defaultValue && (pickerProps.defaultValue = props.defaultValue[index]);
  if (ref && !props.value) {
    changePropsByResetField(props, pickerProps, isStartPicker);
  }
  return pickerProps;
};

// 改变 getFieldDecorator下的options.rules
const changeRules = (props) => {
  const rules = props['data-__meta'].rules;
  const validate = props['data-__meta'].validate;
  const requiredRule = rules.find(rule => rule.hasOwnProperty('required'));
  const autoVerifyRule = !rules.find(rule => rule.key === ruleKey);
  if (requiredRule.required && autoVerifyRule) {
    const addRule = {
      type: 'number', min: 2, max: 2, message: requiredRule.message || 'required', key: ruleKey,
      transform: (date) => { return date && date.filter(v => v).length; }
    };
    props['data-__meta'].rules = [...rules, addRule];
    validate[0] &&
    (props['data-__meta'].validate[0] = {
      trigger: validate[0].trigger,
      rules: props['data-__meta'].rules,
    });
  }
};

/**
 * 日期范围输入框
 * @param {Object}   props
 * @param {String}   [props.type='Date']             类型('Date' | 'Month' | 'Week' | 'Year')
 * @param {String}   [props.theme='box']             主题('box' | 'underline')
 * @param {Array}    [props.value]                   指定时间[moment, moment]
 * @param {Array}    [props.defaultValue]            默认时间[moment, moment]
 * @param {Number}   [props.minYear]                 最小年份 年份选择器专用
 * @param {Number}   [props.maxYear]                 最大年份 年份选择器专用
 * @param {Function} [props.onChange=() => {}]       时间发生变化的回调
 * @param {Object}   [props.starPickerConfig]        起始时间配置
 * @param {Object}   [props.endPickerConfig]         结束时间配置
 * @param {Boolean}  [startAutoVerify]               启动默认过滤假值的功能，基于form表单的getFieldDecorator
 * @see {@link https://ant.design/components/date-picker-cn/#API 更多参数详见 antd 日期选择器 DatePicker 文档}
 * @returns {ReactComponent} 日期组件
 */
let DatePicker = (props, ref) => {
  let staticVariable = useMemo(() => ({
    triggerChange: false
  }), []);

  const [startDate, setStartDate] = useState(
    (props.value && props.value[0]) ||
    (props.defaultValue && props.defaultValue[0]) ||
    null
  );
  const [endDate, setEndDate] = useState(
    (props.value && props.value[1]) ||
    (props.defaultValue && props.defaultValue[1]) ||
    null
  );

  ref && props.startAutoVerify && useEffect(() => {
    changeRules(props);
  });

  useEffect(() => {
    staticVariable.triggerChange && props.onChange([startDate, endDate]);
    staticVariable.triggerChange = true;
  }, [startDate, endDate]);
  props = Object.assign({}, props, {
    startDate,
    setStartDate,
    endDate,
    setEndDate
  });

  const startPickerProps = getPickerProps(props, 0, ref);
  const endPickerProps = getPickerProps(props, 1, ref);

  return (
    <div className="kant-date-picker-layout" ref={ref}>
      {renderPicker(props.type, startPickerProps)}
      {` ~ `}
      {renderPicker(props.type, endPickerProps)}
    </div>
  );
};

DatePicker = forwardRef(DatePicker);

/**
 * 自定义日期校验
 * @param {Object} propValue
 * @param {String} key
 * @param {String} componentName
 * @param {*} location
 * @param {String} propFullName
 * @returns {Error} 类型校验错误信息
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
  startAutoVerify: PropTypes.bool,
};

DatePicker.defaultProps = {
  type: "Date",
  locale,
  onChange: () => {},
  startAutoVerify: true,
};

export default DatePicker;
