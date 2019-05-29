import React from 'react';
import PropTypes from 'prop-types';

/**
 * 悬停菜单栏
 * @param {object}   props
 * @param {number}   [props.showHeight]        悬停菜单出现的滚动高度
 * @param {function} [props.customDom]         自定义组件
 * @param {function} [props.onClickTop]        点击顶部触发事件
 * @param {boolean}  [props.isShow]            初始是否默认显示悬停菜单
 * @param {boolean}  [props.isAlways]          悬停菜单栏是否一直存在
 * @param {string}   [props.className]         悬停菜单盒子的类名
 * @param {string}   [props.topClassName]      悬停菜单上部盒子类名
 * @param {string}   [props.bottomClassName]   悬停菜单底部盒子类名
 * @param {function} [props.topDom]            悬停菜单顶部传入自定义dom
 * @param {function} [props.bottomDom]         悬停菜单底部传入自定义dom
 * @param {function} [props.onClickBottom]     底部自定义事件
 * @param {string}   [props.topIcon]           上半部分初始图标
 * @param {string}   [props.bottomIcon]        下半部分初始图标
 */
class FixedMenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isShow: this.props.isShow || false,
      isChange: false,
    };
  }
  componentDidMount(){
    document.addEventListener('scroll', this.debounce(this.onScroll, 50));
  }

  componentWillUnmount(){
    document.removeEventListener('scroll', this.onScroll);
  }

  toogelStyleChange = () => {
    const isChange = !this.state.isChange;
    this.setState({ isChange });
  };

  render(){
    const fixMenuDom = this.props.customDom ? this.props.customDom : null;
    const topDom = this.props.topDom ? this.props.topDom : null;
    const bottomDom = this.props.bottomDom ? this.props.bottomDom : null;
    const isChange = this.state.isChange;
    return (
      <div className={`${this.sideBlockClassName} kant-fixedmenu-content ${this.props.className}`}>
        {
          this.props.customDom ?
            fixMenuDom :
            <div className={`kant-side-block-list`}>
              <div
                onClick={ this.props.onClickTop
                  ? () => {this.props.onClickTop(); this.toogelStyleChange();}
                  : this.toogelStyleChange
                }
                className={ isChange ? `kant-changetop  ${this.props.topClassName} kant-cp`
                  : `${'kant-side-block-list-weixin'}
                  ${this.props.topClassName}
                  kant-cp `}>
                {topDom ? topDom : this.iconDom(this.state.isChange, 'top')}
              </div>
              <div
                onClick={(e) => {
                  this.props.onClickBottom && this.state.isChange ? this.props.onClickBottom()
                    : this.scrollToTop(); e.stopPropagation();
                }}
                className={ isChange ? `kant-changeBottom ${this.props.bottomClassName}
                kant-cp ` : `${'kant-side-block-list-arrow'}
                  ${this.props.bottomClassName}
                  kant-cp `}>
                {bottomDom ? bottomDom : this.iconDom(this.state.isChange, 'bottom')}
              </div>
            </div>
        }
      </div>
    );
  }

  iconDom = (isChange ,mark) => {
    if (mark === 'bottom') {
      let icon = !isChange ? this.props.bottomIcon : this.props.topIcon;
      return icon ? <span className={`kant-bottomIcon iconfont ${icon}`}>
        &nbsp;
      </span> : null;
    } else if (mark === 'top') {
      let icon = !isChange ? this.props.topIcon : this.props.bottomIcon;
      return icon ? <span className={`kant-topIcon iconfont ${icon}`}>
        &nbsp;
      </span> : null;
    }
  };

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
    if (this.props.isAlways === true) {
      this.setState({ isShow: true });
    } else if (!this.props.isAlways && this.scrollTop > showHeight && !this.state.show ){
      this.setState({ isShow: true });
    } else if ( !this.props.isAlways && this.scrollTop < showHeight && this.state.show ){
      this.setState({ isShow: false });
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
        func.apply(context, args);
      }, wait);
    };
  }
}

FixedMenu.propTypes = {
  customDom: PropTypes.object,
  onClickTop: PropTypes.func,
  isShow: PropTypes.bool,
  isAlways: PropTypes.bool,
  className: PropTypes.string,
  topClassName: PropTypes.string,
  bottomClassName: PropTypes.string,
  topDom: PropTypes.object,
  bottom: PropTypes.object,
  onClickBottom: PropTypes.func,
};

FixedMenu.defaultProps = {
  customDom: null,
  onClickTop: null,
  onClickBottom: null,
  isShow: false,
  bottomDom: null,
  topDom: null,
};

export default FixedMenu;

