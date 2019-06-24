/**
 * 表单布局组件
 * @author jfj
 * @module FormLayout
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';

import omit from 'omit.js';
import classNames from 'classnames';
import {
  isEqual,
  isObject,
  isNumber,
  isString,
} from 'lodash';

const AntFormItem = Form.Item;
const FIELD_META_PROP = 'data-__meta';

/**
 * 配置栅格
 * @param {Number} span=0       栅格跨度配置
 * @param {Number} [offset=0]   向右位偏移
 * @returns {Object} 栅格与右位偏移
 */
const getGrid = (span = 0, offset = 0) => ({ span, offset });

/**
 * FormItem排列方式枚举列表
 */
const FORM_ITEM_DIRECTION_ENUM = ['row', 'column'];

/**
 * label对齐方式枚举列表
 */
const ALIGN_TYPE_ENUM = ['left', 'right', 'center'];

/**
 * 必填标示枚举列表
 */
const LOCATION_REQUIRED_ENUM = ['beforeLabel', 'afterWrapper'];

/**
 * 通用省略字段
 */
const COMMON_OMIT_FIELDS = [
  'label',
  'labelAlign',
  'inlineLabel',
  'labelWidth',
  'wrapperCol',
  'wrapperAlign',
  'colon',
  'direction',
  'className',
  'labelClassName',
  'wrapperClassName',
  'locationRequired',
];

/**
 * 通用参数类型定义
 */
const COMMON_PARAMS_TYPES = {
  inlineLabel: PropTypes.bool,
  labelAlign: PropTypes.oneOf(ALIGN_TYPE_ENUM),
  wrapperAlign: PropTypes.oneOf(ALIGN_TYPE_ENUM),
  locationRequired: PropTypes.oneOf(LOCATION_REQUIRED_ENUM),
};

/**
 * 上下文
 */
const LayoutContext = React.createContext({
  labelAlign: 'right',
  wrapperAlign: 'left',
  locationRequired: 'beforeLabel',
});

LayoutContext.contextType = COMMON_PARAMS_TYPES;

/**
 * 获取必填标示位置&替换成kebab方式
 * @param {String} location 必填标示位置
 * @returns {String}
 */
const getLocation = (location) => location.replace(
  /[A-Z]/g,
  `-${location.match(/[A-Z]/g)[0].toLowerCase()}`);

/**
 * 获取label容器宽度&值处理
 * @param {String|Number} value label宽度
 * @returns {String}
 */
const getLabelWidth = (value) => {
  const defaultLabelWidth = '80px';
  if (!value) return defaultLabelWidth;
  const regex = /px|%|vh|vw|cm|in|mm|em|rem|ex|pt|pc/g;
  return isNumber(value)
    ? `${value}px`
    : isString(value)
      ? isNaN(Number(value.replace(regex, '')))
        ? defaultLabelWidth
        : regex.test(value)
          ? value
          : `${value}px`
      : defaultLabelWidth;
};

/**
 * 表单布局组件
 *
 * @param {Object} props   参数对象
 * @param {String} [props.direction='row']                排列方式  row | column
 * @param {String} [props.label]                          label标签的文本
 * @param {string|number} [props.labelWidth='80px']       label标签的宽度
 * @param {Boolean} [props.inlineLabel=false]             label标签宽度自适应
 * @param {String} [props.labelAlign]                     label文本对齐方式   left | center | right
 * @param {String} [props.wrapperAlign]                   wrapper块对齐方式  left | center | right
 * @param {Number} props.row                              当前项所在行
 * @param {Number} props.span                             栅格配置参数
 * span={8} | span={{ xs: 8 }} | span={getGrid(8, 2)}
 * @param {Boolean} [props.colon=false]                   显示冒号
 * @param {String} [props.locationRequired='beforeLabel'] 必填标示位置
 * beforeLabel afterLabel afterWrapper
 * @param {String} [props.className]                      容器的className
 * @param {String} [props.labelClassName]                 label的className
 * @param {String} [props.wrapperClassName]               wrapper的calssName
 * @returns {ReactComponent} 表单布局组件
 * @see {@link https://ant.design/components/form-cn/#Form.Item
 * 更多参数详见 antd 表单布局组件 Form.Item 文档}
 * @see {@link https://ant.design/components/grid-cn/#Col 更多参数详见 antd 栅格 Col 文档}
 */
const FormItem = (props) => {
  const otherProps = omit(props, COMMON_OMIT_FIELDS);

  // 遍历FormItem子集，获取存在【data-__meta】属性的子级
  const getControls = (children, recursively) => {
    let controls = [];
    const childrenArray = React.Children.toArray(children);
    for (let i = 0; i < childrenArray.length; i++) {
      if (!recursively && controls.length > 0) {
        break;
      }
      const child = childrenArray[i];
      if (
        child.type &&
        (
          child.type === FormItem ||
          child.type.elementType === 'FormItem'
        )
      ) {
        continue;
      }
      if (!child.props) {
        continue;
      }
      if (FIELD_META_PROP in child.props) {
        controls.push(child);
      } else if (child.props.children) {
        controls = controls.concat(getControls(child.props.children, recursively));
      }
    }
    return controls;
  };

  // 获取首个存在校验器validate（存在【data-__meta】属性）的子级
  const getOnlyControl = () => {
    const child = getControls(props.children, false)[0];
    return child !== undefined ? child : null;
  };

  const getChildProp = (prop) => {
    const child = getOnlyControl();
    return child && child.props && child.props[prop];
  };

  const getMeta = () => getChildProp(FIELD_META_PROP);

  const isRequired = () => {
    const { required } = props;
    if (required !== undefined) return required;
    if (getOnlyControl()) {
      const meta = getMeta() || {};
      const validate = meta.validate || [];

      return validate
        .filter((item) => !!item.rules)
        .some((item) => {
          return item.rules.some((rule) => rule.required);
        });
    }
    return false;
  };

  return (
    <LayoutContext.Consumer>
      {
        (context) => {
          const required = isRequired();
          const showRequired = context.hideRequiredMark === true ? false : required;

          const mergeDirection =
            'direction' in props ?
              props.direction || 'row' :
              context.direction;

          const containerClassName = classNames(
            'kant-form-item',
            props.className,
            `kant-form-item-${mergeDirection}`,
          );

          const isColumn = isEqual(mergeDirection, 'column');
          const mergeLabelAlign =
            'labelAlign' in props ?
              props.labelAlign || 'right' :
              context.labelAlign;
          const mergeLabelInline =
            'inlineLabel' in props ?
              props.inlineLabel :
              context.inlineLabel;

          const labelWrapperClassName = classNames(
            'kant-label-container',
            {
              'kant-label-container-inline': mergeLabelInline,
              [`kant-label-container-left`]: isColumn || isEqual(mergeLabelAlign, 'left'),
              [`kant-label-container-right`]: !isColumn && isEqual(mergeLabelAlign, 'right'),
              [`kant-label-container-center`]: !isColumn && isEqual(mergeLabelAlign, 'center'),
            }
          );

          const labelClassName = classNames(
            'kant-label',
            props.labelClassName,
            {
              'kant-label-colon-show': isColumn ?
                false :
                'colon' in props ? props.colon : context.colon,
              [`kant-label-required-${getLocation(props.locationRequired)}`]: showRequired,
            },
          );

          const mergewrapperAlign =
            'wrapperAlign' in props ?
              props.wrapperAlign || 'left' :
              context.wrapperAlign;

          const antFormItemClassName = classNames(
            'kant-wrapper-container',
            props.wrapperClassName,
            `kant-wrapper-align-${props.wrapperAlign}`,
            {
              [`kant-wrapper-required-${getLocation(props.locationRequired)}`]: showRequired,
              [`kant-wrapper-container-left`]: isEqual(mergewrapperAlign, 'left'),
              [`kant-wrapper-container-right`]: isEqual(mergewrapperAlign, 'right'),
              [`kant-wrapper-container-center`]: isEqual(mergewrapperAlign, 'center'),
            },
          );

          const labelWidth =
            'labelWidth' in props ?
              props.labelWidth :
              context.labelWidth;
          return (
            <div className={containerClassName}>
              {
                props.label ?
                  <div
                    className={labelWrapperClassName}
                    style={{ width: getLabelWidth(labelWidth) }}
                  >
                    <label
                      htmlFor=""
                      className={labelClassName}
                    >
                      {props.label}
                    </label>
                  </div> : null
              }
              <AntFormItem
                {...otherProps}
                label={undefined}
                required={required}
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
                className={antFormItemClassName}
              >
                {props.children}
              </AntFormItem>
            </div>
          );
        }
      }
    </LayoutContext.Consumer>
  );
};

/**
 * label标签宽度值类型校验器
 * @param {Object} props            参数对象
 * @param {String} propsName        字段名称
 * @return {Error} 类型校验错误信息
 */
const getLabelWidthValidator = (props, propsName) => {
  const value = props[propsName];
  if (
    value &&
    !isNumber(value) &&
    !isString(value)
  ) return new Error(`无效类型： ${propsName}类型只支持【string | number】`);
};
FormItem.elementType = 'FormItem';

FormItem.propTypes = {
  ...COMMON_PARAMS_TYPES,
  label: PropTypes.any,
  labelWidth: getLabelWidthValidator,
  row: PropTypes.number.isRequired,
  span: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  direction: PropTypes.oneOf(FORM_ITEM_DIRECTION_ENUM),
  colon: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
};

FormItem.defaultProps = {
  locationRequired: 'beforeLabel',
};

/**
 * 表单布局
 *
 * @author jfj
 * @param {Object} props
 * @param {String} [props.direction='row']                 FormItem排列方式 row | column
 * @param {Number|Object} [props.gutter]                   栅格间隔  gutter=15 | gutter={{ xs: 8 }}
 * @param {String} [props.labelAlign='right']              label标签对齐方式
 * @param {String} [props.labelWidth='80px']               label标签默认宽度
 * @param {Boolean} [props.inlineLabel=false]              label标签宽度自适应
 * @param {String} [props.wrapperAlign='left']             wrapper标签对齐方式
 * @param {String} [props.locationRequired='beforeLabel']  必填标识位置
 * @param {Boolean} [props.hideRequiredMark=false]         隐藏所有表单项的必选标记
 * @param {Boolean} [props.colon=false]       	           配合label属性使用，表示是否显示label后面的冒号
 * @returns {ReactComponent} 表单组件
 */
const FormLayout = (props) => {
  const initItemConfig = {
    colon: props.colon,
    direction: props.direction,
    inlineLabel: props.inlineLabel,
    labelWidth: props.labelWidth,
    labelAlign: props.labelAlign,
    wrapperAlign: props.wrapperAlign,
    locationRequired: props.locationRequired,
    hideRequiredMark: props.hideRequiredMark,
  };

  let renderChildren = [];
  React.Children.map(props.children, (child) => {
    if (
      !isObject(child) ||
      !('type' in child) ||
      !(
        child.type === FormItem ||
        child.type.elementType === 'FormItem'
      )
    ) return;

    const childProps = child.props || {};
    const otherProps = omit(childProps, [
      'row',
      'children',
      ...COMMON_OMIT_FIELDS,
    ]);
    (renderChildren[childProps.row - 1] || (renderChildren[childProps.row - 1] = []))
      .push({ ...otherProps, dom: child });
  });
  return (
    <LayoutContext.Provider value={initItemConfig}>
      {renderChildren.map((children, index) => {
        return (
          <Row key={index} gutter={props.gutter}>
            {children.map((child, idx) => {
              const otherProps = omit(child, ["dom", "span"]);
              const span = isNumber(child.span) ? { span: child.span } : child.span;
              return (
                <Col
                  key={idx}
                  {...span}
                  {...otherProps}
                >
                  {child.dom}
                </Col>
              );
            })}
          </Row>
        );
      })}
    </LayoutContext.Provider>
  );
};

FormItem.getGrid = getGrid;

FormLayout.propTypes = {
  ...COMMON_PARAMS_TYPES,
  gutter: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  direction: PropTypes.oneOf(FORM_ITEM_DIRECTION_ENUM),
  colon: PropTypes.bool,
  hideRequiredMark: PropTypes.bool,
  locationRequired: PropTypes.oneOf(LOCATION_REQUIRED_ENUM),
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
};

FormLayout.defaultProps = {
  direction: 'row',
  inlineLabel: false,
  labelAlign: 'right',
  labelWidth: '80px',
  wrapperAlign: 'left',
  hideRequiredMark: false,
  locationRequired: 'beforeLabel',
  gutter: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 24,
    xl: 48,
    xxl: 48,
  },
};

Form.FormItem = FormItem;
Form.FormLayout = FormLayout;

export default Form;
