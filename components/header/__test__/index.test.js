import React from 'react';
import Enzyme from 'enzyme';
import { assert } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../index.jsx';

const { mount, shallow } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
  it('能否正确接收参数', () => {
    const wrapper = mount(
      <Header
        fixed={true}
        downHide={true}
        upShow={true}
        className="header"
        subNav={<div key="11">子级</div>}
        subNavPlacement="up" />
    );
    assert.equal(wrapper.find('.kant-header-fixed').length, 1);
    assert.equal(wrapper.find('.kant-header-show').length, 1);
    assert.equal(wrapper.find('.kant-header').childAt(0).html(), "<div>子级</div>");
  });
  it('upShow/downHide 为 "10%"', () => {
    mount(
      <Header
        fixed={true}
        downHide={'10%'}
        upShow={'10%'}
        subNav={<div key="11">子级</div>}
        subNavPlacement="down" />
    );
  });
  it('upShow/downHide 为 "10%", 监测getWebHeight', () => {
    mount(
      <Header
        fixed={true}
        downHide={'10%'}
        upShow={'10%'}
        subNav={<div key="11">子级</div>}
        subNavPlacement="down" />
    );
  });
  it('upShow/downHide 为 100', () => {
    mount(
      <Header
        fixed={true}
        downHide={100}
        upShow={100}
        subNav={<div key="11">子级</div>}
        subNavPlacement="down" />
    );
    window.pageYOffset = 200;
    let env = window.document.createEvent('UIEvents');
    env.initUIEvent('scroll', true, false, window, 0);
    window.dispatchEvent(env);
    window.pageYOffset = 150;
    window.dispatchEvent(env);
  });
  it('upShow/downHide 为 "100px"', () => {
    mount(
      <Header
        fixed={true}
        downHide={'100px'}
        upHide={'100px'}
        subNav={<div key="11">子级</div>}
        subNavPlacement="down" />
    );
  });
  it('upShow/downHide 为 "100"', () => {
    mount(
      <Header
        fixed={true}
        downHide={'100'}
        upShow={'100'}
        subNav={<div key="11">子级</div>}
        subNavPlacement="down" />
    );
  });

  it('错误参数-debug', () => {
    mount(
      <Header
        sfixed={true}
        downHide={-10} />
    );
    mount(
      <Header
        sfixed={true}
        downHide={'xccd'} />
    );
    mount(
      <Header
        sfixed={true}
        downHide={{}} />
    );
  });
});