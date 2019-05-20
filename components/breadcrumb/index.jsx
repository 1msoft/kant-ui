import React from 'react';
import { Icon, Breadcrumb as AntBreadcrumb} from 'antd';
import PropTypes from 'prop-types';
import omit from 'omit.js';

/**
 * 面包屑导航通用组件
 * @param {object}   props
 * @param {array}    [props.breadcrumbs = [{icon: '', text: '', path: ''}]] 面包屑路由
 * @param {function} [props.linkRoute]             链接路由函数
 * @param {string}   [props.lightFocusClass]       当前路由高亮等自定义样式
 */

const Breadcrumb = (props) => {
  const otherProps = omit(props, [
    'breadcrumbs',
    'linkRoute',
    'lightFocusClass',
  ]);
  return (
    <AntBreadcrumb {...otherProps}>
      {
        props.breadcrumbs.map( (item, idx, array) => {
          if (idx === array.length - 1 || !item.path) {
            return (
              <AntBreadcrumb.Item key={idx} className={props.lightFocusClass}
                {...otherProps}
              >
                {item.icon ? <Icon type={item.icon} /> : ''} {item.text}
              </AntBreadcrumb.Item>
            )
          } else {
            return (
              <AntBreadcrumb.Item key={idx}
                {...otherProps}
              >
                {
                  !!props.linkRoute ?
                    props.linkRoute(item)
                    :
                    <a href={item.path}>{item.icon ? <Icon type={item.icon}/> : ''}{item.text}</a>
                }
              </AntBreadcrumb.Item>
            )
          }
        })
      }
    </AntBreadcrumb>
  )
}

Breadcrumb.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      text: PropTypes.string,
      path: PropTypes.string,
    })
  ),
  linkRoute: PropTypes.func,
  lightFocusClass: PropTypes.string,
}

Breadcrumb.defaultProps = {
  breadcrumbs: [],
  linkRoute: null,
}

export default Breadcrumb;
