import React from 'react';
import { Icon, Breadcrumb as AntBreadcrumb } from 'antd';
import PropTypes from 'prop-types';
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
 * @returns {ReactComponent} 面包屑组件
 */
const Breadcrumb = (props) => {
  let filterArr = [
    'breadcrumbs',
    'itemRender',
    'targetItemClass',
    'params',
    'routes',
    'href'];
  const breadcrumbProps = omit(props.breadcrumbProps, filterArr);
  const breadcrumbItemProps = omit(props.breadcrumbItemProps, filterArr);
  return (
    <AntBreadcrumb {...breadcrumbProps}>
      {
        props.breadcrumbs.map( (item, idx, array) => {
          if (idx === array.length - 1 || !item.path) {
            return (
              <AntBreadcrumb.Item key={idx} className={props.targetItemClass }
                {...breadcrumbItemProps}
                {...item.props}
              >
                {item.icon ? <Icon type={item.icon} /> : ''} {item.text}
              </AntBreadcrumb.Item>
            );
          } else {
            return (
              <AntBreadcrumb.Item key={idx}
                {...breadcrumbItemProps}
                {...item.props}
              >
                {
                  props.itemRender ?
                    props.itemRender(item)
                    :
                    <a href={item.path}>{item.icon ? <Icon type={item.icon}/> : ''}{item.text}</a>
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
};

Breadcrumb.defaultProps = {
  breadcrumbs: [],
  itemRender: null,
};

export default Breadcrumb;
