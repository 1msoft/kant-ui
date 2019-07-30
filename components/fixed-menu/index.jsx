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
 * @param {ReactDOM}  [props.target]            监听的目标区域
*/
  constructor(props){
    super(props);
    this.state = {
      isShow: this.props.display === 'always' ? true : false,
    };
  }
  componentDidMount(){
    let target = null;
    if (this.props.target === window) {
      target = window;
    } else {
      target = this.props.target();
    }
    target.addEventListener('scroll', this.debounce(this.onScroll, 5000));
  }

  componentWillUnmount(){
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
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
    let target = 0;
    if (this.props.target === window) {
      target = document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop;
    } else {
      target = this.props.target().scrollTop;
    }
    return target;
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
    console.log('点击了像散', this.scrollTop);
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
    if (this.props.target === window) {
      document.documentElement.scrollTop = value;
      window.pageYOffset = value;
      document.body.scrollTop = value;
    } else {
      this.props.target().scrollTop = value;
    }
  }

  /**
   * e
   * @param {Event} e
   */
  onScroll = (e) => {
    let targetEle;
    if (this.props.target === window ) {
      targetEle = window;
    } else {
      targetEle = this.props.target();
    }
    const visibilityHeight = this.props.visibilityHeight;
    if (this.props.display === 'always') {
      this.setState({ isShow: true });
    } else if (this.props.display === 'default'
      && targetEle.scrollTop > visibilityHeight && !this.state.isShow ){
      this.setState({ isShow: true });
    } else if ( this.props.display === 'default'
      && targetEle.scrollTop < visibilityHeight && this.state.isShow ){
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
  display: PropTypes.string,
  visibilityHeight: PropTypes.number,
  speed: PropTypes.number,
};

FixedMenu.defaultProps = {
  display: 'default',
  visibilityHeight: 0,
  speed: 100,
  target: window,
};

export default FixedMenu;

