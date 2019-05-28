import React from 'react';
import { expect, assert } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Form, FormLayout, FormItem } from '../index';

const { mount } = Enzyme;
const getGrid = FormItem.getGrid;

// 为 Enzyme 配置适配器
Enzyme.configure({ adapter: new Adapter() });

describe('LayoutForm 组件 & FormItem 组件', () => {
  it ('FormItem是否正常渲染', () => {
    const wrapper = mount(
      <FormLayout
        inlineLabel={true}
        wrapperAlign="right"
        hideRequiredMark={true}
      >
        <FormItem
          row={1}
          label="测试1"
          span={getGrid(8)}
          direction="row"
          colon={true}
        >
          测试1数据
        </FormItem>
        <FormItem
          row={2}
          label="测试2"
          span={getGrid(16)}
          labelAlign="right"
          direction="column"
          inlineLabel={true}
          wrapperAlign="right"
          className="custom-kant-form-item"
          labelClassName="custom-kant-label-form-item"
          wrapperClassName="custom-kant-wrapper-form-item"
        >
          测试2数据
        </FormItem>
      </FormLayout>
    );
    expect(wrapper.find('.kant-form-item')).to.have.lengthOf(2);
    assert.equal(wrapper.find('.kant-form-item').length, 2, '子组件渲染正确');

    expect(wrapper.exists('.ant-col-8')).to.equal(true);
    expect(wrapper.exists('.ant-col-16')).to.equal(true);

    expect(wrapper.find('.kant-label').at(0).text()).to.equal('测试1');
    expect(wrapper.find('.kant-form-item').at(0).children('.kant-label-container-inline').exists()).to.equal(true);
    expect(wrapper.find('.kant-form-item').at(1).children('.kant-wrapper-container').text()).to.equal('测试2数据');
    expect(wrapper.find('.kant-form-item').at(1).children('.kant-wrapper-container-right').exists()).to.equal(true);
    expect(wrapper.find('.kant-form-item-column').exists()).to.equal(true);

    expect(wrapper.exists('.kant-label-colon-show')).to.equal(true);
    assert.isTrue(wrapper.exists('.kant-label-colon-show'), '冒号渲染正确');
  });

  it ('FormLayout的上下文参数是否正常传递给FormItem组件', () => {
    const wrapper = mount(
      <FormLayout
        gutter={8}
        colon={true}
        labelAlign="left"
        wrapperAlign="right"
        hideRequiredMark={false}
        inlineLabel={false}
        locationRequired="beforeLabel"
      >
        <FormItem
          row={1}
          span={8}
          label="测试1"
          required={true}
        >
          测试1数据
        </FormItem>
        <FormItem
          row={2}
          label="测试2"
          span={getGrid(16)}
          labelAlign="center"
          direction="row"
          inlineLabel={true}
          wrapperAlign="center"
          colon={false}
        >
          测试2数据
        </FormItem>
      </FormLayout>
    );
    expect(wrapper.exists('.kant-label-container-left')).to.equal(true);
    assert.isTrue(wrapper.exists('.kant-label-container-left'), 'label对齐方式渲染正确');

    expect(wrapper.exists('.kant-label-colon-show')).to.equal(true);
    assert.isTrue(wrapper.exists('.kant-label-colon-show'), '冒号渲染正确');

    expect(wrapper.exists('.kant-label-required-before-label')).to.equal(true);
    assert.isTrue(wrapper.exists('.kant-label-required-before-label'), '必填标识渲染正确');
  });

  it ('FormItem.labelWidth 值类型是否被正确转换', () => {
    const wrapper = mount(
      <FormLayout
        direction="column"
      >
        <FormItem
          row={1}
          span={8}
          label="测试1"
          labelWidth="120cx"
        >
          测试1数据
        </FormItem>
        <FormItem
          row={1}
          span={8}
          label="测试1"
          labelWidth={100}
        >
          测试1数据
        </FormItem>
        <FormItem
          row={2}
          span={8}
          label="测试1"
          labelWidth={false}
        >
          测试1数据
        </FormItem>
        <FormItem
          row={2}
          span={8}
          label="测试1"
          labelWidth="120px"
        >
          测试1数据
        </FormItem>
      </FormLayout>
    );
    expect(wrapper.find('.kant-label-container').at(0).getDOMNode().style.width).to.equal('80px');
    assert.equal(wrapper.find('.kant-label-container').at(0).getDOMNode().style.width, '80px', 'label宽度渲染正确');

    expect(wrapper.find('.kant-label-container').at(1).getDOMNode().style.width).to.equal('100px');
    assert.equal(wrapper.find('.kant-label-container').at(1).getDOMNode().style.width, '100px', 'label宽度渲染正确');
  });

  it ('FormItem 表单校验', () => {
    let myForm;
    const FormLayout = Form.create()(({ form }) => {
      myForm = form;
      return (
        <Form>
          <FormItem
            row={1}
            span={8}
            label="测试"
          >
            {
              form.getFieldDecorator('test', {
                rules: [{ required: true, message: '必填' }]
              })(<input />)
            }
            <FormItem
              row={1}
              label="小区"
              span={8}
              labelWidth="150px"
            >
              大儒世家
              <FormItem
                row={1}
                span={8}
                label="房屋"
              >304</FormItem>
            </FormItem>
              <span>测试数据</span>
              测试数据
          </FormItem>
        </Form>
      );
    });
    const wrapper = mount(<FormLayout />);
    myForm.validateFields();
    wrapper.update();
    wrapper.render();
  })
});
