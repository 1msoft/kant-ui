/**
 * 选择器组件
 * 1. 在 antd Select 的基础上新增功能,支持内部渲染 Option 列表
 * 2. 在 antd Select 的基础上新增下拉触底事件
 * 3. 在 antd Select 的基础上新增加载状态
 * 4. 在 antd Select 的基础上允许对下拉菜单追加 dom
 */
import React, {
  useMemo,
  Fragment,
  useCallback,
} from 'react';
import _ from 'lodash';
import omit from 'omit.js';
import PropTypes from 'prop-types';
import { Select as AntSelect, Spin } from 'antd';

const Option = AntSelect.Option;

/**
 * @constant 唯一值
 */
const UNIQUE = Math.random().toString(36).substring(7).split('').join('.');

/**
 * @constant 加载类型
 */
const LOADING_TYPE = {
  ALL: 'all',
  MENU: 'menu',
  FIELD: 'field',
};

const useStateHook = (props) => {
  /**
   * 处理数据方法： value、title
   * @param {Object | String | number} data 待处理数据
   * @param {String} type 处理数据类型（value | title）
   */
  const handlerData = useCallback(({ data, type }) => {
    const cData = _.isObject(data) ? data : { title: data, value: data };
    const format = props[`format${_.upperFirst(type)}`];
    if (_.isString(format)){ return cData[format];}
    if (_.isFunction(format)){return format(data);}
    return cData[type];
  }, [props.formatValue, props.formatTitle]);

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
    props.apendDom && hOptions.push(
      <Option value={UNIQUE} key={UNIQUE} disabled={true} className="kant-append-option" >
        <div className="kant-append-option-wrapper">
          {props.apendDom}
        </div>
      </Option>
    );
    return hOptions;
  }, [props.data, props.children, props.apendDom]);

  // 选择器下拉滚动事件
  const onPopupScroll = useCallback(e => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    // 1. 触底处理
    if (scrollHeight - clientHeight - scrollTop < props.faultTolerant){
      props.onTouchBottom && props.onTouchBottom(e);
    }
    // 2. 调用 props.onPopupScroll
    props.onPopupScroll && props.onPopupScroll(e);
  }, [props.onTouchBottom, props.faultTolerant, props.onPopupScroll]);

  // 自定义下拉框内容
  const dropdownRender = useCallback((menuNode, currProps) => {
    const loading = [
      props.loading,
      [LOADING_TYPE.MENU, LOADING_TYPE.ALL].includes(props.loadingType),
    ].every(v => v);
    const render = (
      loading
        ? <Spin spinning={loading} {...props.spin}> {menuNode}</Spin>
        : menuNode
    );
    return (props.dropdownRender ? props.dropdownRender(render, currProps) : render);
  }, [props.loading, props.loadingType, props.dropdownRender, props.spin]);

  // 计算其余 props
  const otherProps = useMemo(() => {
    const filter = ['dropdownRender', 'onPopupScroll'];
    if (props.loadingType === LOADING_TYPE.MENU){filter.push('loading');}
    return omit(props, filter);
  });

  return { options, onPopupScroll, dropdownRender, otherProps };
};

/**
 * @param {Object} Props
 * @param {Array} [props.data]                      数据源 [object|String|number]
 * @param {String|Number|ReactDOM} props.data.title 下拉项默认显示字段
 * @param {String} props.data.value                 下拉项默认 value 字段
 * @param {String} props.data.key                   下拉项 key 值
 * @param {Object} props.data.props                 下拉项 Option 组件附加 props
 * @param {String|Function} [props.formatTitle]     String: 指定下拉项显示字段，
 *                                                  function: (item) => {}, 自定义下拉框显示字段
 * @param {String|Function} [props.formatValue]     String: 指定下拉项 value 字段，
 *                                                  function: (item) => {}, 自定义下拉框显示字段
 * @param {Function} [props.onTouchBottom]          触底事件
 * @param {Number} [props.faultTolerant]            指定下拉项滚动条距离底部的距离小于多少值时触发 onTouchBottom 事件
 * @param {ReactDom} [props.apendDom]               在下拉项中追加 dom(不可选)
 * @param {String} [props.loadingType]              加载中类型（menu | field | all）
 * @param {Boolean} [props.loading]                 是否显示加载中
 * @param {Object} [props.spin]                     设置下拉列表加载组件 Spin.props
 * @link props.spin参数参考  [antd 官网](https://ant.design/components/spin-cn/#API)
 * @link 更多参数参考 [antd 官网](https://ant.design/components/select-cn/#API)
 */
const Select = (props) => {
  const state = useStateHook(props);
  return (
    <AntSelect
      onPopupScroll={state.onPopupScroll}
      dropdownRender={state.dropdownRender}
      {...state.otherProps}
    >
      {state.options}
    </AntSelect>
  );
};

Select.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ])),

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
  faultTolerant: 10,
  loadingType: LOADING_TYPE.FIELD,
};

export default Select;
