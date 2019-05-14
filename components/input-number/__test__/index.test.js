import React from 'react';
import Enzyme from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import InputNumber from '../index.jsx';

const { mount } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });

describe('InputNumber', () => {
  it('能否正确接受参数', () => {
    const wrapper = mount(<InputNumber
      controls={false}
      prefix="$"
      enterFunc={(value) => console.log(value)}
    />);

    expect(wrapper.prop('controls')).to.equal(false);
    expect(wrapper.prop('prefix')).to.equal('$');
  });
});

describe('InputNumber', () => {
  it('能否正确触发回车事件', () => {
    const wrapper = mount(<InputNumber
      enterFunc={(value) => value}
    />);

    wrapper.find('input').simulate('keyup', { keyCode: 13, target: { value: 50 }});
    wrapper.update();
    expect(wrapper.find('input').prop('enterFunc')).to.equal(50);
  })
})
