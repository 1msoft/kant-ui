import React from 'react';
import { Icon, Breadcrumb as AntBreadcrumb} from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * 面包屑导航通用组件
 * @param {string} props
 * @param {array} [props.breadcrumbs = [{icon: '', text: '', path: ''}]] 面包屑路由
 * @param {boolean} [props.isRoute= true] 有无路由
 * @param {string} [props.lightFocusClass] 当前路由高亮等自定义样式
 * @param {string} [props.breadClassName] 面包屑路由的总体样式
 * @param {string} [props.normalbreadClassName] 当前路由前的路由样式
 */

const Breadcrumb = (props) => {
  return (
    <AntBreadcrumb {...props} className={props.breadClassName}>
      {
        props.breadcrumbs.map( (item, idx, array) => {
          // 无链接面包屑项或者当前面包屑项，不使用 Link 标签
          if (idx === array.length - 1 || !item.path) {
            return (
              <AntBreadcrumb.Item key={idx} className={props.lightFocusClass}>
                {idx === 0 ? <Icon type={item.icon} /> : ''} {item.text}
              </AntBreadcrumb.Item>
            )
          } else {
            // 第一个面包屑项显示图标
            return (
              <AntBreadcrumb.Item key={idx}
                className={props.normalbreadClassName}>
                {
                  props.isRoute ?
                    <span>
                      <Link to={item.path}>
                        {idx === 0 ? <Icon type={item.icon} /> : ''} {item.text}
                      </Link>
                    </span> : <a href={item.path}>{item.text}</a>
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
  isRoute: PropTypes.bool,
  lightFocusClass: PropTypes.string,
  breadClassName: PropTypes.string,
  normalbreadClassName: PropTypes.string,
}

Breadcrumb.defaultProps = {
  breadcrumbs: [],
  isRoute: true,
}

export default Breadcrumb;
