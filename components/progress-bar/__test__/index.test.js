import React from 'react';
import { assert } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProgressBar from '../index';

// 为 Enzyme 配置适配器
Enzyme.configure({ adapter: new Adapter() });

const { mount } = Enzyme;

describe('ProgressBar 组件', function () {
  it('ProgressBar 空参数预览', () => {
    const wrapper = mount(
      <ProgressBar />
    );
    assert.equal(wrapper.find('.kant-progress-bar-outer').length, 1);
  });

  it('ProgressBar 加载进度条', () => {
    const wrapper1 = mount(
      <ProgressBar
        class="progress"
        percent={80}
        baseColor={{from: 'rgb(16, 142, 233)', to: 'rgb(135, 208, 104)'}}
        animation={true} />
    );
    assert.equal(wrapper1.find('.kant-progress-bar-sprint').length, 1);
    const progressBarInnerDom1 = wrapper1.find('.kant-progress-bar-inner').at(0).html();
    const verifyWidth1 = /width: 80%/.test(progressBarInnerDom1);
    assert.equal(verifyWidth1, true);

    const wrapper2 = mount(
      <ProgressBar
        percent={100} />
    );
    const progressBarInnerDom2 = wrapper2.find('.kant-progress-bar-inner').at(0).html();
    const verifyWidth2 = /width: 100%/.test(progressBarInnerDom2);
    assert.equal(verifyWidth2, true);
  });

  it('ProgressBar 预览进度条', () => {
    const wrapper = mount(
      <ProgressBar mode="scroll" />
    );
  });

  it('ProgressBar 自定义props校验', () => {
    const verifyPercent = mount(
      <ProgressBar
        percent="100" />
    );
    const verifyColor1 = mount(
      <ProgressBar
        baseColor="1112323" />
    );
    const verifyColor2 = mount(
      <ProgressBar
        baseColor={{ name: '111' }} />
    );
  });
});