import React from 'react';
import PropTypes from 'prop-types';

/**
 * 悬停菜单栏
 * @param {string}  props
 * @param {number} [props.showHeight] 悬停菜单出现的滚动高度
 * @param {string} [props.className] 最外层盒子雷子
 * @param {function} [props.freeDom] 自定义组件
 * @param {string} [props.listClassName] 外层盒子类名
 * @param {string} [props.suggestClassName] 反馈留言块类名
 * @param {function} [props.suggestEvent] 反馈留言触发事件
 * @param {string} [props.arrowClassName] 回到顶部块类型
 * @param {boolean} [props.show] 一开始是否默认显示悬停菜单
 * @param {boolean} [props.always] 悬停菜单栏是否一直存在
 */


class FixedMenu extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      show: this.props.show || false,
    };
  }

  componentDidMount(){
    window.addEventListener('scroll', this.debounce(this.onScroll, 50));
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.onScroll);
  }

  render(){
    const Com = this.props.freeDom;
    return (
      <div className={`${this.sideBlockClassName} ${this.props.className}`}>
        {
          Com ?
            <Com /> :
            <div className={`side-block-list ${this.props.listClassName}`}>
              <div
                onClick={this.props.suggestEvent ? this.props.suggestEvent : null}
                className={`${'side-block-list-weixin'} cp ${this.props.suggestClassName}`}>12345
              </div>
              <div
                onClick={this.scrollToTop}
                className={`${'side-block-list-arrow'} cp ${this.props.arrowClassName}`}>
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
    let className = 'side-block';
    this.state.show
      ? (className = `${className} show-o`)
      : (className = `${className} hidden-o`);
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
    } else if (this.scrollTop > showHeight && !this.state.show ){
      this.setState({ show: true })
    } else if ( this.scrollTop < showHeight && this.state.show ){
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
  className: PropTypes.string,
  freeDom: PropTypes.func,
  listClassName: PropTypes.string,
  suggestClassName: PropTypes.string,
  suggestEvent: PropTypes.func,
  arrowClassName: PropTypes.string,
  show: PropTypes.bool,
  always: PropTypes.bool,
}

export default FixedMenu;
