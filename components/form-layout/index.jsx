/**
 * 表单布局组件
 * @author jfj
 * @module FormLayout
 */
import React, { useState, useEffect, useContext, forwardRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js'
import { Form, Row, Col } from 'antd';

import { FormContext } from 'antd/lib/form/context';

const AntFormItem = Form.Item;

/**
 * 通用参数类型定义
 */
const COMMON_PARAMS_TYPES = {
  labelSpan: PropTypes.number,
  labelAlign: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
  wrapperAlign: PropTypes.oneOf(['left', 'right', 'center']),
  locationRequired: PropTypes.oneOf(['beforeLabel', 'afterWrapper']),
};

/**
 * 上下文
 * @param {*} props
 */
const LayoutContext = React.createContext({
  labelAlign: 'right',
  wrapperAlign: 'left',
  locationRequired: 'beforeLabel',
});

LayoutContext.contextType = COMMON_PARAMS_TYPES;

/**
 * 表单容器组件
 *
 * @author jfj
 * @param {object} props
 * @param {number} props.row                               记录行
 * @param {number} [props.labelSpan]                       栅格跨度
 * @param {string} [props.labelAlign='right']              label标签对齐方式
 * @param {string} [props.wrapperAlign='left']             wrapper标签对齐方式
 * @param {string} [props.locationRequired='beforeLabel']  必填标识位置
 */
const FormLayout = (props) => {
  const initItemConfig = {
    labelSpan: props.labelSpan,
    labelAlign: props.labelAlign,
    wrapperAlign: props.wrapperAlign,
    locationRequired: props.locationRequired,
  };

  let renderChildren = [];
  React.Children.map(props.children, (child) => {
    const childProps = child.props || {};
    const otherProps = omit(childProps, [
      'row',
      'label',
      'labelAlign',
      'labelCol',
      'wrapperCol',
      'labelLength',
      'locationRequired',
      'wrapperAlign',
      'children',
    ]);
    (renderChildren[childProps.row - 1] || (renderChildren[childProps.row - 1] = []))
      .push({ ...otherProps, dom: child });
  });
  return (
    <LayoutContext.Provider value={initItemConfig}>
      {
        <FormContext.Consumer>
          { formContext => { console.log(formContext) }}
        </FormContext.Consumer>
      }
      {
        renderChildren.map((children, index) => {
          return (
            <Row
              key={index}
              gutter={props.gutter}
            >
              {
                children.map((child, idx) => {
                  const otherProps = omit(child, [ 'dom', 'span' ]);
                  return (
                    <Col
                      key={idx}
                      {...child.span}
                      {...otherProps}
                    >
                      {child.dom}
                    </Col>
                  );
                })
              }
            </Row>
          );
        })
      }
    </LayoutContext.Provider>
  );
};

FormLayout.propTypes = {
  ...COMMON_PARAMS_TYPES,
  row: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
};
//
FormLayout.defaultProps = {
  labelAlign: 'right',
  wrapperAlign: 'left',
  locationRequired: 'beforeLabel',
};

/**
 * 表单组件-FromItem
 *
 * @author jfj
 * @param {object} props
 * @param {number} props.row                               记录行
 * @param {string} props.label                             label标签的文本
 * @param {number} [props.span]                            栅格跨度
 * @param {number} [props.push]                            栅格向左移动格数
 * @param {number} [props.pull]                            栅格向右移动格数
 * @param {number} [props.labelLength]                     label标签布局,栅格跨度
 * @param {string} [props.labelAlign='right']              label标签对齐方式
 * @param {string} [props.wrapperAlign='left']             wrapper标签对齐方式
 * @param {string} [props.locationRequired='beforeLabel']  必填标识位置
 */
const FormItem = (props) => {
  const otherProps = omit(props, [
    // 'labelCol',
    // 'wrapperCol',
    'label',
    'labelLength',
    'locationRequired',
  ]);
  return (
    <LayoutContext.Consumer>
      {
        (context) => {
          return (
            <AntFormItem
              label={props.label}
              // className="kant-form-item"
              {...otherProps}
            >
              {props.children}
            </AntFormItem>
          );
        }
      }
    </LayoutContext.Consumer>
  );
};

FormItem.propTypes = {
  row: PropTypes.number.isRequired,
  label: PropTypes.any,
  span: PropTypes.number.isRequired,
  labelLength: PropTypes.number.isRequired, // TODO: labelLength最小值为0
  labelAlign: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
  wrapperAlign: PropTypes.oneOf(['left', 'right', 'center']),
  locationRequired: PropTypes.oneOf(['beforeLabel', 'afterWrapper']),
  style: PropTypes.object,
  className: PropTypes.string,
};

FormItem.defaultProps = {
  labelAlign: 'right',
  wrapperAlign: 'left',
  locationRequired: 'beforeLabel',
};

const FormItemNext = (props) => {
  const otherProps = omit(props, [
    'labelCol',
    'wrapperCol',
    'label',
    'labelWidth',
    'locationRequired',
  ]);

  const renderLocationRequired = (location) => {
    if (!props.locationRequired) return null;
    return props.locationRequired === location ?
      <span
        className={`
          kant-required
          kant-required-${location.replace(
            /[A-Z]/g,
            `-${location.match(/[A-Z]/g)[0].toLowerCase()}`
          )}
        `}>*</span> : null;
  };

  const location = props.locationRequired.replace(
    /[A-Z]/g,
    `-${props.locationRequired.match(/[A-Z]/g)[0].toLowerCase()}`
  );
  return (
    <LayoutContext.Consumer>
      {
        (context) => {
          return (
            <div
              className={`
                kant-form-item
                kant-form-item-${props.direction}
              `}
            >
              <div
                className={`
                  kant-label-container
                  kant-label-container-${props.direction === 'column' ? 'left' : props.labelAlign}
                `.replace(/\s+/, " ")}
                style={{ width: props.labelWidth }}
              >
                <label
                  htmlFor=""
                  className={`
                    kant-label
                    kant-label-required-${location}
                    kant-label-align-${props.labelAlign}
                    kant-label-colon-${props.colon ? 'show' : 'hide'}
                  `.replace(/\s+/, " ")}
                >
                  {/* {renderLocationRequired("beforeLabel")} */}
                  {props.label}
                </label>
              </div>
              <AntFormItem
                label={props.label}
                {...otherProps}
                label=""
                className={`
                  kant-wrapper-container
                  kant-wrapper-required-${location}
                  kant-wrapper-align-${props.wrapperAlign}
                `.replace(/\s+/, " ")}
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
              >
                {props.children}
              </AntFormItem>
              {/* {renderLocationRequired("afterWrapper")} */}
            </div>
          );
        }
      }
    </LayoutContext.Consumer>
  );
};

FormItemNext.propTypes = {
  row: PropTypes.number.isRequired,
  label: PropTypes.any,
  span: PropTypes.number.isRequired,
  // labelLength: PropTypes.number.isRequired, // TODO: labelLength最小值为0
  labelAlign: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
  wrapperAlign: PropTypes.oneOf(['left', 'right', 'center']),
  locationRequired: PropTypes.oneOf(['beforeLabel', 'afterLabel', 'afterWrapper']),
  style: PropTypes.object,
  className: PropTypes.string,
};

FormItemNext.defaultProps = {
  labelAlign: 'right',
  wrapperAlign: 'left',
  direction: 'row',
  locationRequired: 'beforeLabel',
};

const create = Form.create;

export {
  FormLayout,
  FormItem,
  FormItemNext,
  create,
};
