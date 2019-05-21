import React from 'react';
import PropTypes from 'prop-types';

/**
 * 悬停菜单栏
 * @param {object}   props
 * @param {number}   [props.showHeight]        悬停菜单出现的滚动高度
 * @param {function} [props.freeDom]           自定义组件
 * @param {function} [props.suggestEvent]      反馈留言触发事件
 * @param {boolean}  [props.show]              初始是否默认显示悬停菜单
 * @param {boolean}  [props.always]            悬停菜单栏是否一直存在
 * @param {string}   [className]               悬停菜单盒子的类名
 *
 */
class FixedMenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      show: this.props.show || false,
    };
  }

  componentDidMount(){
    document.addEventListener('scroll', this.debounce(this.onScroll, 50));
  }

  componentWillUnmount(){
    document.removeEventListener('scroll', this.onScroll);
  }

  render(){
    const FixMenuDom = !!this.props.freeDom ? this.props.freeDom : '';
    return (
      <div className={`${this.sideBlockClassName} ${this.props.className}`}>
        {
          !!this.props.freeDom ?
            <FixMenuDom /> :
            <div className={`kant-side-block-list`}>
              <div
                onClick={!!this.props.suggestEvent ? this.props.suggestEvent : null}
                className={`${'kant-side-block-list-weixin'} kant-cp `}>
              </div>
              <div
                onClick={this.scrollToTop}
                className={`${'kant-side-block-list-arrow'} kant-cp `}>
              </div>
            </div>
        }
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
    this.state.show
      ? (className = `${className} kant-show`)
      : (className = `${className} kant-hidden`);
    return className;
  }

  // 滚动到顶部
  scrollToTop = () => {
    // speed: 速度（时间）, span 跨度(每次递减数值)
    const animate = (speed= 10, span = 100) => {
      setTimeout(() => {
        let pretreatment = this.scrollTop - span;
        pretreatment < 0 ? (pretreatment === 0) : animate(speed, span);
        this.setScrollTop(pretreatment);
      }, speed);
    }
    // （时间， 跨度）
    animate(10, 100);
  }

  /**
   * 设置 scrollTop
   * @param {Number} value scrollTop值
   */
  setScrollTop(value){
    document.documentElement.scrollTop = value;
    window.pageYOffset = value;
    document.body.scrollTop = value;
  }

  /**
   * 监听滚动
   * @param {Object} e 事件
   */
  onScroll = (e) => {
    const showHeight = this.props.showHeight || 0;
    if (this.props.always === true) {
      this.setState({show: true})
    } else if (!this.props.always && this.scrollTop > showHeight && !this.state.show ){
      this.setState({ show: true })
    } else if ( !this.props.always && this.scrollTop < showHeight && this.state.show ){
      this.setState({ show: false })
    }
  }

  /**
    * 防抖
    * @param {Function} func 事件函数
    * @param {Number} wait 时长
    */
  debounce = (func, wait) => {
    let timeout;
    return function () {
      let context = this;
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait);
    }
  }
}

FixedMenu.propTypes = {
  freeDom: PropTypes.func,
  suggestEvent: PropTypes.func,
  show: PropTypes.bool,
  always: PropTypes.bool,
  className: PropTypes.string,
}

FixedMenu.defaultProps = {
  freeDom: null,
  suggestEvent: null,
  show: false,
}

export default FixedMenu;
