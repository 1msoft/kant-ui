/**
 * 选择器组件
 * 1. 在 antd Select 的基础上新增功能,支持内部渲染 Option 列表
 * 2. 在 antd Select 的基础上新增下拉触底事件
 * 3. 在 antd Select 的基础上新增加载状态
 *
 */
import React, {
  useMemo,
  Fragment,
  useCallback,
} from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Select as AntSelect, Spin } from 'antd';

const Option = AntSelect.Option;

// 唯一值
const UNIQUE = Math.random().toString(36).substring(7).split('').join('.');
// 加载类型loadingType
const LOADING_TYPE = {
  ALL: 'all',
  MENU: 'menu',
  FIELD: 'field',
};

const useStateHook = (props) => {
  /**
   * 处理数据方法： value、title
   * @param {Object | String | number} data 待处理数据
   * @param {String} type 处理数据类型（Value | Title）
   */
  const handlerData = useCallback(({ data, type }) => {
    const cData = _.isObject(data) ? data : { title: data, value: data };
    const format = props[`format${_.upperFirst(type)}`];
    if (_.isString(format)){ return cData[format];}
    if (_.isFunction(format)){return format(data);}
    return cData[type];
  }, [props.data, props.formatValue, props.formatTitle]);

  // 计算 options
  const options = useMemo(() => {
    if (props.children){return props.children;}
    if (!props.data || props.data.length < 1){return [];}
    const hOptions = props.data.map((v, index) => {
      let value = handlerData({ data: v, type: 'value' });
      let title = handlerData({ data: v, type: 'title' });
      const key = v.key || value || index;
      return (
        <Option {...v.props} value={value} key = {key}>
          {title}
        </Option>
      );
    });
    hOptions.push(
      <Option value={UNIQUE} key={UNIQUE} disabled={true} className="kant-append-option" >
        <div className="kant-append-option-wrapper">
          {props.apendOption || null}
        </div>
      </Option>
    );
    return hOptions;
  }, [props.data, props.formatValue, props.formatTitle, props.children, props.apendOption]);

  // 选择器下拉滚动事件
  const onPopupScroll = useCallback(e => {
    const {scrollHeight, scrollTop, clientHeight} = e.target;
    // 1. 触底处理
    if (scrollHeight - clientHeight - scrollTop < props.faultTolerant){
      props.onTouchBottom && props.onTouchBottom(e);
    }
    // 2. 调用 props.onPopupScroll
    props.onPopupScroll && props.onPopupScroll(e);
  }, []);

  // 自定义下拉框内容
  const dropdownRender = useCallback((menuNode) => {
    const loading = [
      props.loading,
      [ LOADING_TYPE.MENU, LOADING_TYPE.ALL].includes(props.loadingType),
    ].every(v => v);
    return <Spin spinning={loading}> {menuNode}</Spin>;
  }, [props.loading, props.loadingType]);

  return {options, onPopupScroll, dropdownRender};
}

/**
 * @param {Object} Props
 * @param {Array} [props.data]                      数据源 [object|String|number]
 * @param {String|Number|ReactDOM} props.data.title 下拉项默认显示字段
 * @param {String} props.data.value                 下拉项默认 value 字段
 * @param {Object} props.data.props                 下拉项 Option 组件附加 props
 * @param {String|Function} [props.formatTitle]     String: 指定下拉项显示字段，
 *                                                  function: (item) => {}, 自定义下拉框显示字段
 * @param {String|Function} [props.formatValue]     String: 指定下拉项 value 字段，
 *                                                  function: (item) => {}, 自定义下拉框显示字段
 * @param {Function} [props.onTouchBottom]          触底事件
 * @param {Number} [props.faultTolerant]            指定下拉项滚动条距离底部的距离小于多少值时触发 onTouchBottom 事件
 * @param {ReactDom} [props.apendOption]            在下拉项中追加 option
 * @param {String} [props.loadingType]              加载中类型（menu | field | all）
 * @link 更多参数参考 [antd 官网](https://ant.design/components/select-cn/#API)
 * 加载更多按钮
 * 加载中
 */
const Select = (props) => {
  const state = useStateHook(props);
  return (
    <AntSelect
      {...props}
      loading
      dropdownRender={state.dropdownRender}
      onPopupScroll={state.onPopupScroll}>
      {state.options}
    </AntSelect>
  );
}

Select.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object),
  ]),
  formatTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  formatValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  onPopupScroll: PropTypes.func,
  faultTolerant: PropTypes.number,
};

Select.defaultProps = {
  faultTolerant: 10
};

export default Select;
