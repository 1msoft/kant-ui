import React from 'react';
import { Icon, Breadcrumb as AntBreadcrumb } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import omit from 'omit.js';

/**
 * 面包屑导航通用组件
 * @param {Object}   props
 * @param {Array}    props.breadcrumbs = []         面包屑路由
 * @param {String}   [props.breadcrumbs.icon]       图标
 * @param {String}   [props.breadcrumbs.text]       内容
 * @param {String}   [props.breadcrumbs.path]       路由链接
 * @param {Object}   [props.breadcrumbs.props]      特定的属性
 * @param {Function} [props.itemRender]             链接路由函数
 * @param {String}   [props.targetItemClass ]       当前路由高亮等自定义样式
 * @param {Object}   [props.breadcrumbProps]        breadcrumb组件的api
 * @param {Object}   [props.breadcrumbItemProps]    BreadcrumbItem的api
 * @param {Function} [props.onJumpway]              自定义跳转方法
 * @returns {ReactComponent} 面包屑组件
 */
const Breadcrumb = (props) => {
  let filterArr = [
    'breadcrumbs',
    'itemRender',
    'targetItemClass',
    'params',
    'routes',
    'href',
    'onClick',
  ];
  const breadcrumbProps = omit(props.breadcrumbProps, filterArr);
  const breadcrumbItemProps = omit(props.breadcrumbItemProps, filterArr);

  const jumpWay = (url) => {
    return {
      'onClick': !props.itemRender ? (e) => {
        !props.onJumpway ?  location.href = url :  props.onJumpway(url, e);
        _.isFunction(props.breadcrumbItemProps.onClick)
          ? props.breadcrumbItemProps.onClick(e) : null;
      } : ''
    };
  };

  return (
    <AntBreadcrumb {...breadcrumbProps}>
      {
        props.breadcrumbs.map( (item, idx, array) => {
          if (idx === array.length - 1) {
            return (
              <AntBreadcrumb.Item key={idx} className={props.targetItemClass ? `${props
                .targetItemClass} kant-breadcrumb-current` : 'kant-breadcrumb-current' }
              {...breadcrumbItemProps}
              {...item.props}
              >
                {item.icon ?
                  <span className={`iconfont ${item.icon}`}>
                  </span>
                  : ''}
                {item.text}
              </AntBreadcrumb.Item>
            );
          } else {
            return (
              <AntBreadcrumb.Item key={idx}
                {...breadcrumbItemProps}
                {...item.props}
                {...jumpWay(item.path)}
              >
                {
                  props.itemRender ?
                    props.itemRender(item)
                    :
                    <a>{
                      item.icon ?
                        <span
                          className={`iconfont ${item.icon}`}>
                        </span>
                        : ''}
                    <span>{item.text}</span>
                    </a>
                }
              </AntBreadcrumb.Item>
            );
          }
        })
      }
    </AntBreadcrumb>
  );
};

Breadcrumb.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      text: PropTypes.string,
      path: PropTypes.string,
    })
  ),
  itemRender: PropTypes.func,
  targetItemClass: PropTypes.string,
  breadcrumbProps: PropTypes.object,
  breadcrumbItemProps: PropTypes.object,
  onJumpway: PropTypes.func,
};

Breadcrumb.defaultProps = {
  breadcrumbs: [],
  itemRender: null,
};

export default Breadcrumb;
