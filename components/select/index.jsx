/**
 * 选择器组件
 * 1. 在 antd Select 的基础上新增功能,支持内部渲染 Option 列表
 * 2. 在 antd Select 的基础上新增下拉触底事件
 * 3. 如果使用 data 参数进行渲染 Option,那么 Option 对应的 key 值为当条记录的 JSON 字符串， 这样在 onChange 中就可以拿到完整的数据
 *
 * @param {Array}  [props.data]        用于渲染 antd select Option 列表数据源
 * @param {String | Number | ReactDOM} props.data.title  用于渲染 antd select Option 列表数据的 title(显示值)
 * @param {String} props.data.value  用于渲染 antd select Option 列表数据的 value
 * @param {Object} props.data.props  为 antd select Option 配置 props
 * @param {String} [props.titleKey]  指定渲染 antd select Option 时,使用哪个属性作为 title
 * @param {String} [props.valueKey]  指定渲染 antd select Option 时,使用哪个属性作为 value
 * @param {Function} [props.onTouchBottom] 触底事件(当下拉列表下拉到最底部时触发)
 * @param {Number} [props.faultTolerant] 容错,设置触底事件触发时机,当下拉列表到底部的距离小于该值时将会触发 onTouchBottom 事件
 * 更多参数参考 [antd 官网](https://ant.design/components/select-cn/)
 */
import React, {
  useMemo,
  useCallback
} from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Select as AntSelect } from 'antd';

const Option = AntSelect.Option;

const useStateHook = (props) => {
  // 计算 options
  const options = useMemo(() => {
    if (props.children){return props.children;}
    if (!props.data || props.data.length < 1){return [];}
    return props.data.map((v, index) => (
      <Option
        {...v.props}
        value={v[props.valueKey || 'value']}
        key = {JSON.stringify(v)}
      >
        {v[props.titleKey || 'title']}
      </Option>
    ));
  }, [props.data, props.children]);

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
  return {options, onPopupScroll};
}

const Select = (props) => {
  const state = useStateHook(props);
  return (
    <AntSelect
      {...props}
      onPopupScroll={state.onPopupScroll}>
      {state.options}
    </AntSelect>
  );
}

Select.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      value: PropTypes.string,
      props: PropTypes.object,
    })
  ),
  titleKey: PropTypes.string,
  valueKey: PropTypes.string,
  onPopupScroll: PropTypes.func,
  faultTolerant: PropTypes.number,
};

Select.defaultProps = {
  faultTolerant: 10
};

export default Select;
