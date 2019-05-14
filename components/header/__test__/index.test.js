import React from 'react';
import Enzyme from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../index.jsx';

const { mount } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
  it('能否正确接收参数', () => {
    const wrapper = mount(
      <Header
        fixed={true}
        downHide={true}
        upHide={true} />
    );

    expect(wrapper.prop('fixed').to.equal(true));
    expect(wrapper.prop('downHide').to.equal(true));
    expect(wrapper.prop('upHide')).to.equal(true);
  });
});

describe('Header', () => {
  it('触发滚动事件', () => {
    const wrapper = mount(
      <Header
        fixed={true}
        downHide={200}
        upHide={200} />
    );
    document.documentElement.scrollTop = 200;
    expect(wrapper.find('.em-header-fixed').length).to.equal(1);
  });
});