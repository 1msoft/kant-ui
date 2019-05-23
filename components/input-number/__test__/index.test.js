import React from 'react';
import Enzyme from 'enzyme';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import Adapter from 'enzyme-adapter-react-16';
import InputNumber from '../index.jsx';

const { mount } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });

describe('InputNumber', () => {
  it('能否正确接受参数', () => {
    const wrapper = mount(<InputNumber
      theme="box"
      prefix="$"
      suffix="%"
      autoFocus={true}
      controls={false}
      className="custom-kant-input-number"
    />);

    assert(wrapper.exists('.ant-input-number-handler-wrap'), false, '步骤控制器关闭');
    expect(wrapper.find('input').getDOMNode().value).to.equal('$%');

    wrapper.find('input').simulate('change', { target: { value: '1' } });
    expect(wrapper.find('input').getDOMNode().value.replace(/\$|%/g, "")).to.equal('1');
  });

  it ('能否支持自定义格式化方法和值解析处理', () => {
    const formatter = sinon.spy();
    const parser = sinon.spy();
    const wrapper = mount(<InputNumber
      formatter={formatter}
      parser={parser}
    />);
    wrapper.find('input').simulate('change', { target: { value: '1' } });
    expect(formatter.called).to.be.true;
    expect(parser.called).to.be.true;
  });

  it('能否正确触发按下回车按钮事件', () => {
    const onPressEnter = sinon.spy({ method: value => value}, 'method');
    const onKeyDown = sinon.spy(onPressEnter);
    const wrapper = mount(
      <InputNumber
        theme="underline"
        onPressEnter={onPressEnter}
        onKeyDown={onKeyDown}
      />
    );

    wrapper.find('input').simulate('keyDown', { keyCode: 13, target: { value: '1' } });
    expect(onKeyDown.called).to.be.true;
    expect(onPressEnter.called).to.be.true;
  })

  it('能否正确触发自定义回车事件', () => {
    const onKeyDown = sinon.spy();
    const wrapper = mount(
      <InputNumber
        onPressEnter={false}
        onKeyDown={onKeyDown}
      />
    );
    wrapper.find('input').simulate('keyDown', { keyCode: 48, target: { value: 'a' } });
    wrapper.find('input').simulate('keyDown', { keyCode: 13, target: { value: '1' } });
    expect(onKeyDown.called).to.be.true;
  })

  it ('能否支持按下非回车按钮不触发onPressEnter方法', () => {
    const onPressEnter = sinon.spy({ method: () => {} }, 'method');
    const wrapper = mount(
      <InputNumber
        theme="underline"
        onPressEnter={onPressEnter}
      />
    );

    wrapper.find('input').simulate('keyDown', { keyCode: 48, target: { value: '1' } });
  });
})
