import _ from 'lodash';
import React from 'react'
import sinon from 'sinon';
import Enzyme from 'enzyme';
import {assert} from 'chai';
import Select from '../index';
import { Select as AntSelect } from 'antd';
import Adapter from 'enzyme-adapter-react-16';

const { mount, shallow } = Enzyme;
const Option = AntSelect.Option;

Enzyme.configure({ adapter: new Adapter() })

describe('Select: 选择器', function () {
  it('直接通过 data 是否正确渲染数据', function (){
    const onChange = sinon.fake();
    const data = [
      {title: '红色', value: 'red'},
      {title: '白色', value: 'white', props: { disabled: true }},
      {title: '黑色', value: 'black'},
    ];
    const wrapper = mount(
      <Select onChange={onChange} data={data}/>
    );
    // 1. 是否正确执行
    wrapper.find('.ant-select').simulate('click');
    assert.equal(wrapper.find('.ant-select-dropdown-menu-item').length, 3);
    assert.equal(wrapper.find('.ant-select-dropdown-menu-item-disabled').length, 1);

    // 2. onChange 是否正确执行
    wrapper.find('.ant-select-dropdown-menu-item').last().simulate('click');
    assert.isTrue(onChange.called && onChange.calledWith(data[data.length - 1].value));
  });

  it('通过 valueKey 和 titleKey 指定数据 key', function (){
    const data = [{desc: '红色', color: 'red'}];
    const onChange = sinon.fake();
    const wrapper = mount(
      <Select valueKey="color" titleKey="desc" onChange={onChange} data = {data} />
    );

    // 1. 判断渲染是否正确
    wrapper.find('.ant-select').simulate('click');
    assert.equal(wrapper.find('.ant-select-dropdown-menu-item').text(), data[0].desc);

    // 2. onChange 是否正确执行
    wrapper.find('.ant-select-dropdown-menu-item').simulate('click');
    assert.isTrue(onChange.called && onChange.calledWith(data[0].color));
  });

  it('使用 antd 默认 Option 进行渲染', function (){
    const data = [{title: '红色', value: 'red'}];
    const onChange = sinon.fake();
    const wrapper = mount(
      <Select onChange={onChange}>
        {data.map(v => (
          <Option value={v.value} key={v.value}>{v.title}</Option>
        ))}
      </Select>
    );

    // 1. 判断渲染是否正确
    wrapper.find('.ant-select').simulate('click');
    assert.equal(wrapper.find('.ant-select-dropdown-menu-item').text(), data[0].title);

    // 2. onChange 是否正确执行
    wrapper.find('.ant-select-dropdown-menu-item').simulate('click');
    assert.isTrue(onChange.called && onChange.calledWith(data[0].value));
  });

  it('触底事件是否正确触发', function (){
    const data = [];
    for(let i = 0; i < 10; i++){
      data.push({title: `红色${i}`, value: `red${i}`});
    }
    const onTouchBottom = sinon.fake();
    const onPopupScroll = sinon.fake();
    const wrapper = mount(
      <Select
        data = {data}
        faultTolerant={20}
        onTouchBottom={onTouchBottom}
        onPopupScroll={onPopupScroll}
      />
    );
    wrapper.find('.ant-select').simulate('click');

    const ulDom = wrapper.find('.ant-select-dropdown-menu').at(0).getDOMNode();
    const { scrollHeight, clientHeight, scrollTop } = ulDom;
    ulDom.scrollTop = scrollHeight - clientHeight - 19;

    wrapper.find('.ant-select-dropdown-menu').at(0).simulate('scroll');
    // 1. 判断触底事件是否执行
    assert.isTrue(onTouchBottom.called);
    // 2. 判断滚动事件是否执行
    assert.isTrue(onPopupScroll.called);
  });
});
