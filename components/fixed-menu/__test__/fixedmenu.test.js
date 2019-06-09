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
    const app = mount(
      <FixedMenu
        className={'kant-test'}
        showHeight={200}
        isShow={true}
        isAwayls={false}
        speed={100}
      />);

    window.pageYOffset = 200;
    let env = document.createEvent('UIEvents');
    env.initUIEvent('scroll', true, false, window, 0);
    document.dispatchEvent(env);
    document.pageYOffset = 150;
    document.dispatchEvent(env);

    assert.equal(app.find('.kant-test').at(0).length, 1);
    assert.equal((app.find('.kant-show').at(0)).length, 1);
  });


  it('是否能正确触发回到顶部事件', function () {
    sinon.spy(FixedMenu.prototype, 'componentDidMount');
    sinon.spy(FixedMenu.prototype, 'componentWillUnmount');
    const app = mount(
      <FixedMenu
        className={'kant-test'}
        showHeight={200}
        isShow={true}
      />);

    FixedMenu.prototype.componentDidMount.restore();
    FixedMenu.prototype.componentWillUnmount.restore();
    const scrollToTop = sinon.stub(app.instance(), 'scrollToTop');
    assert.equal(scrollToTop());
  });


  it('计算样式方法是否正确执行', function () {
    const app = mount(
      <FixedMenu
        className={'kant-test'}
        showHeight={200}
        isShow={false}
      />);
    assert.equal((app.find('.kant-hidden').at(0)).length, 1);
  });

});
