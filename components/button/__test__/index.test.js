import React from 'react';
import Enzyme from 'enzyme';
import { assert } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../index.jsx';

const { mount } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });

describe('Button' , () => {
  it ('能否正确接受参数', () => {
    const onClick = sinon.spy();
    const wrapper = mount(<Button
      type="primary"
      onClick={onClick}
    />);
    assert.equal(wrapper.find('.ant-btn-primary').length, 1);
    wrapper.find('.ant-btn').simulate('click');
    assert.isTrue(onClick.called);
    assert.equal(wrapper.find('.kant-wave-button').length, 2);
  });

  it ('初始无操作值是否正确', () => {
    const onClick = () => {
      console.log('传入了个点击事件');
    };
    const wrapper = mount(<Button
      onClick={onClick}
    />);
    assert.equal(wrapper.find('.ant-btn-primary').length, 0);
    assert.equal(wrapper.find('.kant-wave-button').length, 0);
    assert.equal(wrapper.find('.kant-chance').length, 2);
  });
});
