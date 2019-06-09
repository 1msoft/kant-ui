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
 * @param {Number}   [props.showHeight]        悬停菜单出现的滚动高度
 * @param {Boolean}  [props.isShow]            初始是否默认显示悬停菜单
 * @param {Boolean}  [props.isAlways]          悬停菜单栏是否一直存在
 * @param {Number}   [props.speed]             回到顶部的速度
 * @param {Function} [props.FixedMenuDom]      悬停菜单自定义Dom
*/
  constructor(props){
    super(props);
    this.state = {
      isShow: this.props.isShow,
    };
  }
  componentDidMount(){
    document.addEventListener('scroll', this.debounce(this.onScroll, 50));
  }

  componentWillUnmount(){
    document.removeEventListener('scroll', this.onScroll);
  }
  render(){
    const FixedMenuDom = this.props.FixedMenuDom;
    return (
      <div className={`${this.sideBlockClassName} kant-fixedmenu-content ${this.props.className}`}>
        { FixedMenuDom ? FixedMenuDom({ 'scrollToTop': this.scrollToTop }) : '' }
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
    const showHeight = this.props.showHeight;
    if (this.props.isAlways === true) {
      this.setState({ isShow: true });
    } else if (!this.props.isAlways && this.scrollTop > showHeight && !this.state.isShow ){
      this.setState({ isShow: true });
    } else if ( !this.props.isAlways && this.scrollTop < showHeight && this.state.isShow ){
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
  isShow: PropTypes.bool,
  isAlways: PropTypes.bool,
  showHeight: PropTypes.number,
  speed: PropTypes.number,
  FixedMenuDom: PropTypes.func,
};

FixedMenu.defaultProps = {
  isShow: false,
  isAlways: false,
  showHeight: 0,
  fixedmenuDom: null,
  speed: 100,
};

export default FixedMenu;

