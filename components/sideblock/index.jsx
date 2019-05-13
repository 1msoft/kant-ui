import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * 悬停菜单栏
 * props.className 最外层盒子类名
 * props.freeDom 传入自定义组件
 * props.listClassName 外层盒子类名
 * props.suggestClassName 反馈留言类名
 * props.suggestEvent 反馈留言触发事件
 * props.arrowClassName 回到顶部类名
 */

@withRouter
class SideBlock extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      show: false,
      showWithOpacity: false,
    };
  }

  componentDidMount(){
    window.addEventListener('scroll', this.debounce(this.onScroll, 50));
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.onScroll);
  }

  componentDidUpdate(preProps) {
    this.monitorRoute(preProps);
  }

  /**
   * 监听路由变换: 当路由切换时回到顶部
   * @param {Object} preProps 上一个 props
   */
  monitorRoute = (preProps) => {
    const { match: oldMatch } =  preProps;
    const { match } =  this.props;
    if (oldMatch === match){return false;}
    this.setScrollTop(0);
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
                className={`${'side-block-list-weixin'} cp ${this.props.suggestClassName}`}>
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
      ? (className = `${className} hidden-o`)
      : (className = `${className} show-o`);
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
    const showHeight = this.props.showHeight;
    if (this.scrollTop > showHeight && !this.state.show ){
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

SideBlock.propTypes = {
  className: PropTypes.string,
  freeDom: PropTypes.func,
  listClassName: PropTypes.string,
  suggestClassName: PropTypes.string,
  suggestEvent: PropTypes.func,
  arrowClassName: PropTypes.string,
}

export default SideBlock;
