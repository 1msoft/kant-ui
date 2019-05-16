import React from 'react';
import { assert } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DatePicker from '../index';
import moment from 'moment';
const { mount } = Enzyme;

// 为 Enzyme 配置适配器
Enzyme.configure({ adapter: new Adapter() })

describe('DatePicker 组件', function () {
  it('DatePicker 是否渲染正确的选择器', function () {
    // 日期选择器
    const dateWrapper = mount(
      <DatePicker
        className="kant"
        theme="underline"
        value={[moment('2018-01-01'), moment('2018-01-03')]} />
    );
    assert.equal(dateWrapper.find('.ant-calendar-picker-input').length, 2);
    dateWrapper.find('.ant-calendar-picker-input').at(0).simulate('click');
    dateWrapper.find('.ant-calendar-date').at(8).simulate('click');

    // 周数选择器
    const weekWrapper = mount(
      <DatePicker type="Week" />
    );
    assert.equal(weekWrapper.find('.ant-calendar-picker-input').length, 2);

    // 月份选择器
    const monthWrapper = mount(
      <DatePicker type="Month" />
    );
    assert.equal(monthWrapper.find('.ant-calendar-picker-input').length, 2);
    const yearWrapper = mount(
      <DatePicker
        type="Year"
        minYear={2000}
        maxYear={2010}
        value={[moment('2018', 'YYYY'), moment('2019', 'YYYY')]} />
    );
    assert.equal(yearWrapper.find('.ant-select').length, 2);
    // onChange
    yearWrapper.find('.ant-select').at(0).simulate('click');
    yearWrapper.find('.ant-select-dropdown-menu-item').at(0).simulate('click');

    // 年份选择器
    const yearWrapper2 = mount(
      <DatePicker
        type="Year"
        minYear={2000}
        maxYear={2010}
        defaultValue={[moment('2018', 'YYYY'), moment('2019', 'YYYY')]} />
    );
    assert.equal(yearWrapper2.find('.ant-select').length, 2);
  });

  it('DatePicker 格式化日期', () => {
    // 日期选择器
    const dateWrapper = mount(
      <DatePicker
        format="YYYY年MM月DD"
        value={[moment('2018-01-01'), moment('2018-01-03')]} />
    );
    assert.equal(dateWrapper.find('.ant-calendar-picker-input').at(0).getDOMNode().value, '2018年01月01');
    assert.equal(dateWrapper.find('.ant-calendar-picker-input').at(1).getDOMNode().value, '2018年01月03');

    // 周数选择器
    const weekWrapper = mount(
      <DatePicker
        type="Week"
        format="YYYY年 第wo"
        value={[moment('2018-01-01'), moment('2018-01-08')]} />
    );
    assert.equal(weekWrapper.find('.ant-calendar-picker-input').at(0).getDOMNode().value, '2018年 第1周');
    assert.equal(weekWrapper.find('.ant-calendar-picker-input').at(1).getDOMNode().value, '2018年 第2周');

    // 月份选择器
    const monthWrapper = mount(
      <DatePicker
        type="Month"
        format="YYYY年MM月"
        value={[moment('2018-01-01'), moment('2018-02-08')]} />
    );
    assert.equal(monthWrapper.find('.ant-calendar-picker-input').at(0).getDOMNode().value, '2018年01月');
    assert.equal(monthWrapper.find('.ant-calendar-picker-input').at(1).getDOMNode().value, '2018年02月');
  });
  
});
