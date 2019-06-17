/**
 * 悬停菜单栏
 * @author dxl
 * @module FixedMenu
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * 悬停菜单栏
 *
 * @class
 * @extends React.Component
*/
class FixedMenu extends React.Component {
/**
 * Creates an instance of FixedMenu
 * @memberof FixedMenu
 * @param {Object}   props
 * @param {Function|String|Object|ReactDOM} [props.children] 子元素 ({scrollToTop}) => window
 * @param {Number}   [props.visibilityHeight]  悬停菜单出现的滚动高度
 * @param {Boolean}  [props.display]           悬停菜单栏是否一直存在 { "always" || "default" }
 * @param {Number}   [props.speed]             回到顶部的速度
*/
  constructor(props){
    super(props);
    this.state = {
      isShow: this.props.display === 'always' ? true : false,
    };
  }
  componentDidMount(){
    document.addEventListener('scroll', this.debounce(this.onScroll, 50));
  }

  componentWillUnmount(){
    document.removeEventListener('scroll', this.onScroll);
  }
  render(){
    return (
      <div className={`${this.sideBlockClassName} kant-fixedmenu-content ${this.props.className}`}>
        { typeof(this.props.children) === 'function'
          ? <this.props.children scrollToTop={this.scrollToTop}/> : this.props.children }
      </div>
    );
  }

  // 获取 document.scrollTop
  get scrollTop(){
    return (
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop
    );
  }

  // 计算样式
  get sideBlockClassName(){
    let className = 'kant-side-block';
    this.state.isShow
      ? (className = `${className} kant-show`)
      : (className = `${className} kant-hidden`);
    return className;
  }

  // 滚动到顶部
  scrollToTop = () => {
    // speed: 速度（时间）, span 跨度(每次递减数值)
    const animate = (speed = 10, span = 100) => {
      setTimeout(() => {
        let pretreatment = this.scrollTop - span;
        pretreatment < 0 ? (pretreatment === 0) : animate(speed, span);
        this.setScrollTop(pretreatment);
      }, speed);
    };
    // （时间， 跨度）
    const speed = this.props.speed;
    animate(10, speed);
  }

  setScrollTop(value){
    document.documentElement.scrollTop = value;
    window.pageYOffset = value;
    document.body.scrollTop = value;
  }

  /**
   * e
   * @param {Event} e
   */
  onScroll = (e) => {
    const visibilityHeight = this.props.visibilityHeight;
    if (this.props.display === 'always') {
      this.setState({ isShow: true });
    } else if (this.props.display === 'default'
      && this.scrollTop > visibilityHeight && !this.state.isShow ){
      this.setState({ isShow: true });
    } else if ( this.props.display === 'default'
      && this.scrollTop < visibilityHeight && this.state.isShow ){
      this.setState({ isShow: false });
    }
  }

  /**
   * 防抖
   *
   * @memberof FixedMenu
   * @param {Function} func 方法
   * @param {Number} wait 时间
   * @returns {Function}
   */
  debounce = (func, wait) => {
    let timeout;
    return function () {
      let context = this;
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }
}

FixedMenu.propTypes = {
  display: PropTypes.bool,
  visibilityHeight: PropTypes.number,
  speed: PropTypes.number,
};

FixedMenu.defaultProps = {
  display: 'default',
  visibilityHeight: 0,
  speed: 100,
};

export default FixedMenu;

