import React from 'react';
import { Icon, Breadcrumb as AntBreadcrumb } from 'antd';
import PropTypes from 'prop-types';
import omit from 'omit.js';

/**
 * 面包屑导航通用组件
 * @param {object}   props
 * @param {array}    props.breadcrumbs = []         面包屑路由
 * @param {string}   [props.breadcrumbs.icon]       图标
 * @param {string}   [props.breadcrumbs.text]       内容
 * @param {string}   [props.breadcrumbs.path]       路由链接
 * @param {function} [props.itemRender]              链接路由函数
 * @param {string}   [props.targetItemClass ]       当前路由高亮等自定义样式
 */
const Breadcrumb = (props) => {
  const otherProps = omit(props, [
    'breadcrumbs',
    'itemRender',
    'targetItemClass',
    'params',
    'routes',
    'href',
  ]);
  return (
    <AntBreadcrumb {...otherProps}>
      {
        props.breadcrumbs.map( (item, idx, array) => {
          if (idx === array.length - 1 || !item.path) {
            return (
              <AntBreadcrumb.Item key={idx} className={props.targetItemClass }
                {...otherProps}
              >
                {item.icon ? <Icon type={item.icon} /> : ''} {item.text}
              </AntBreadcrumb.Item>
            );
          } else {
            return (
              <AntBreadcrumb.Item key={idx}
                {...otherProps}
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
};

Breadcrumb.defaultProps = {
  breadcrumbs: [],
  itemRender: null,
};

export default Breadcrumb;
