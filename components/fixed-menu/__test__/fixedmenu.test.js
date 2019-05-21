import React from 'react';
import { assert, expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const { mount, shallow } = Enzyme;
import sinon from 'sinon';
import FixedMenu from '../index.jsx';

// 为 Enzyme 配置适配器
Enzyme.configure({ adapter: new Adapter() });

describe('<FixedMenu>', function () {
  it('判断悬停菜单是否能正确传props值', function () {
    const suggestEvents = sinon.fake();
    const app = mount(
      <FixedMenu
        className={'kant-test'}
        showHeight={200}
        show={true}
        suggestEvent={suggestEvents}
      />);

    window.pageYOffset = 200;
    let env = document.createEvent('UIEvents');
    env.initUIEvent('scroll', true, false, window, 0);
    document.dispatchEvent(env);
    document.pageYOffset = 150;
    document.dispatchEvent(env);

    assert.equal(app.find('.kant-test').at(0).length, 1);
    assert.equal((app.find('.kant-show').at(0)).length, 1);
    (app.find('.kant-side-block-list-weixin').at(0)).simulate('click');
    assert.isTrue(suggestEvents.called);
    assert.equal(app.instance().scrollToTop())
    assert.equal(app.instance().debounce()())
  });


  it('是否能正确触发回到顶部事件', function () {
    sinon.spy(FixedMenu.prototype, 'componentDidMount')
    sinon.spy(FixedMenu.prototype, 'componentWillUnmount')
    const app = mount(
      <FixedMenu
        className={'kant-test'}
        showHeight={200}
        show={true}
      />);

    FixedMenu.prototype.componentDidMount.restore();
    FixedMenu.prototype.componentWillUnmount.restore();
    const scrollToTop = sinon.stub(app.instance(), 'scrollToTop');
    app.find('.kant-side-block-list-arrow').at(0).simulate('click');
    assert.equal(scrollToTop());
  });


  it('计算样式方法是否正确执行', function () {
    const app = mount(
      <FixedMenu
        className={'kant-test'}
        showHeight={200}
        show={false}
      />);
    assert.equal((app.find('.kant-hidden').at(0)).length, 1);
  });

  it('传入自定义dom是否生效', function () {
    const kantTestDom = () => (
      <div className='kant-test2'>
        <div style={{ width: '100px', height: '100px', background: 'green' }}></div>
      </div>
    );
    const app = mount(
      <FixedMenu
        className={'kant-test'}
        freeDom={kantTestDom}
        always={true}
      />);
    assert.equal((app.find('.kant-test2').at(0)).length, 1);
  });

  it('滚动是否生效', function () {
    const onScroll = sinon.fake();
    const app = mount(
      <div className='content' onScroll={onScroll}>
        <FixedMenu
          className={'kant-test'}
          showHeight={200}
          show={false}
          always={false}
        />
      </div>);
    (app.find('.content').at(0)).simulate('scroll');
    assert.isTrue(onScroll.called);
  });

  it('当不传参数的情况下有无问题', function () {
    const app = mount(
      <FixedMenu show={{}} showHeight={{}} always={{}}/>);
    assert.equal(app.find('.kant-side-block-list-arrow').at(0).length, 1);
  });
});
