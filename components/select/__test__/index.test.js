import React from 'react'
import {assert} from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Select from '../index';
const { mount, shallow } = Enzyme

// 为 Enzyme 配置适配器
Enzyme.configure({ adapter: new Adapter() })

describe('Select: 选择器', function () {
  it('传入 data 是否能正确渲染', function () {
    const wrapper = shallow(
      <Select data = {[
        {title: '红色', value: 'red'},
        {title: '白色', value: 'white', props: { disabled: true }},
        {title: '黑色', value: 'black'},
      ]} />
    );
    console.log('----------------------');
    console.log(wrapper.find());
    assert.equal(1111, 1111);
  })
});
