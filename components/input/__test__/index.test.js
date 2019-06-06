import React from 'react';
import Enzyme from 'enzyme';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import Adapter from 'enzyme-adapter-react-16';
import Input from '../index.jsx';

const { mount } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });

describe('Input', () => {

  it('input能不能正确接收值', () => {
    const wrapper = mount(<Input
      size='small'
    />);
    assert.equal(wrapper.find('.ant-input-sm').length, 1);
  });

  it('文本域focus能否给外嵌盒子相应的样式', () => {
    const setFocusClassName = sinon.spy({ method: value => value }, 'method');
    const onClick = sinon.spy(setFocusClassName);
    const wrapper = mount(
      <div>
        <Input.TextArea
          onClick={onClick}
        />
      </div>
    );
    wrapper.find('.ant-input').simulate('click');
    assert.isTrue(onClick.called);
    assert.equal(wrapper.find('.kant-textarea-blur').length, 1);
  });
});
