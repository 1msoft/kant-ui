/**
 * 年份范围输入框
 * @author kjx
 * @module YearPicker
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Select as AntSelect, Icon } from 'antd';

const Option = AntSelect.Option;


// 渲染下拉选项
const renderOptions = (props) => {
  const options = [];
  const minYear = props.minYear;
  const maxYear = props.maxYear;
  for (let year = minYear; year <= maxYear; year++) {
    // 年份范围
    const disabled = props.disabledDate ?
      props.disabledDate(moment(year, 'YYYY')) : false;

    options.push(
      <Option key={year} value={`${year}`} disabled={disabled}>
        {year}年
      </Option>
    );
  }
  return options;
};

// 默认设置下拉框的后缀图标
const selectSuffixIcon = () => {
  return (
    <Icon className="kant-select-calendar-icon" type="calendar" />
  );
}

// 获取下拉框props
const getSelectProps = (props) => {
  const selectProps = {
    suffixIcon: selectSuffixIcon(),
    ...props,
    onChange: (value, option) => {
      const date = moment([value], 'YYYY');
      const dateString = moment([value], 'YYYY')
        .format('YYYY-MM-DD hh:mm:ss');
      props.onChange(date, dateString);
    },
  };
  props.value && (selectProps.value = moment(props.value).format('YYYY'));
  props.defaultValue && (selectProps.defaultValue = moment(props.defaultValue).format('YYYY'));
  return selectProps;
}

/**
 * 年份范围输入框
 * @param {object}   props
 * @param {date}     [props.value]              值
 * @param {date}     [props.defaultValue]       默认值
 * @param {function} [props.onChange]           年份发生变化的回调
 * @param {string}   [props.className]          类名
 * @param {number}   [props.minYear=1990]       最小年份
 * @param {number}   [props.maxYear=当前年份+10]  最大年份
 * @see {@link https://ant.design/components/select-cn/#API 更多参数详见 antd 选择框 Select 文档}
 */
const YearPicker = (props) => {
  const selectProps = getSelectProps(props);
  return (
    <AntSelect
      showSearch
      {...selectProps}
    >
      {renderOptions(props)}
    </AntSelect>
  );
};

// 自定义日期校验
function customDateValidators(props, propName, componentName) {
  const val = props[propName];
  if (val && !moment.isMoment(val)) {
    return new Error(`无效值：组件${componentName}: ${propName}仅支持moment类型`);
  }
}

// TUDO: 校验
YearPicker.propTypes = {
  value: customDateValidators,
  defaultValue: customDateValidators,
  onChange: PropTypes.func,
  className: PropTypes.string,
  minYear: PropTypes.number,
  maxYear: PropTypes.number,
};

YearPicker.defaultProps = {
  minYear: 1990,
  maxYear: (new Date()).getFullYear() + 10,
};

export default YearPicker;