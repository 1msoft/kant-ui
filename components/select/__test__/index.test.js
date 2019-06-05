import _ from 'lodash';
import React from 'react';
import sinon from 'sinon';
import Enzyme from 'enzyme';
import { assert } from 'chai';
import Select from '../index';
import { Select as AntSelect, Icon } from 'antd';
import Adapter from 'enzyme-adapter-react-16';

const { mount, shallow } = Enzyme;
const Option = AntSelect.Option;

Enzyme.configure({ adapter: new Adapter() });

describe('Select: 选择器', function () {
  it('使用 antd 默认 Option 进行渲染', function (){
    const data = [{ title: '红色', value: 'red' }];
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

  it('直接通过 data 是否正确渲染数据', function (){
    const onChange = sinon.fake();
    const data = [
      { title: '红色', value: 'red', key: '自定义key' },
      { title: '白色', value: 'white', props: { disabled: true } },
      '字符串数据', 12345,
      { title: '黑色', value: 'black' },
    ];
    const wrapper = mount(
      <Select onChange={onChange} data={data}/>
    );
    // 1. 是否正确执行
    wrapper.find('.ant-select').simulate('click');
    assert.equal(wrapper.find('.ant-select-dropdown-menu-item').length, 5);
    assert.equal(wrapper.find('.ant-select-dropdown-menu-item-disabled').length, 1);

    // 2. onChange 是否正确执行
    wrapper.find('.ant-select-dropdown-menu-item').last().simulate('click');
    assert.isTrue(onChange.called && onChange.calledWith(data[data.length - 1].value));

    // 3. key值是否正确
    wrapper.find('.ant-select-dropdown-menu-item').last().simulate('click');
    assert.equal(onChange.lastCall.lastArg.key, data[data.length - 1].value);
    wrapper.find('.ant-select-dropdown-menu-item').first(0).simulate('click');
    assert.equal(onChange.lastCall.lastArg.key, data[0].key);

    // 4. 字符串、数字类型数据是否能正确渲染
    assert.equal(wrapper.find('.ant-select-dropdown-menu-item').at(2).text(), data[2]);
    assert.equal(wrapper.find('.ant-select-dropdown-menu-item').at(3).text(), data[3]);
  });

  it('通过 formatValue 和 formatTitle 指定数据 key', function (){
    const data = [{ desc: '红色', color: 'red' }];
    const onChange = sinon.fake();
    const wrapper = mount(
      <Select formatValue="color" formatTitle="desc" onChange={onChange} data = {data} />
    );

    // 1. 判断渲染是否正确
    wrapper.find('.ant-select').simulate('click');
    assert.equal(wrapper.find('.ant-select-dropdown-menu-item').text(), data[0].desc);

    // 2. onChange 是否正确执行
    wrapper.find('.ant-select-dropdown-menu-item').simulate('click');
    assert.isTrue(onChange.called && onChange.calledWith(data[0].color));
  });

  it('通过 formatValue 和 formatTitle 对 title value 进行格式化', function (){
    const data = [
      { community: '国关小区', building: '1', house: '201', id: '123' },
      { community: '花园小区', building: '8', house: '801', id: '456' },
    ];
    const onChange = sinon.fake();
    const formatValue = v => v.id;
    const formatTitle = v => (`${v.community}${v.building}楼${v.house}`);
    const wrapper = mount(
      <Select
        data = {data}
        onChange={onChange}
        formatValue={formatValue}
        formatTitle={formatTitle}
      />
    );

    // 1. 判断渲染是否正确
    wrapper.find('.ant-select').simulate('click');
    assert.equal(
      wrapper.find('.ant-select-dropdown-menu-item').at(0).text(),
      formatTitle(data[0])
    );

    // 2. onChange 是否正确执行, 值是否正确
    wrapper.find('.ant-select-dropdown-menu-item').at(0).simulate('click');
    assert.isTrue(onChange.called && onChange.calledWith(formatValue(data[0])));
  });

  it('加载中是否能够正确显示、类型是否正确', function (){
    const data =  [{ title: '红色', value: 'red' }];
    const defaultWrapper = mount( <Select data={data} loading/>);
    const fieldWrapper = mount( <Select data={data} loading loadingType="field"/>);
    const allWrapper = mount(
      <Select
        loading
        data={data}
        loadingType="all"
        spin={{ indicator: (
          <Icon
            type="loading"
            style={{ fontSize: 24 }}
            className="kant-icon-spin"
          />
        ) }}
      />
    );
    const menuWrapper = mount(
      <Select
        loading
        data={data}
        loadingType="menu"
        spin={{ indicator: (
          <Icon
            type="loading"
            style={{ fontSize: 24 }}
            className="kant-icon-spin"
          />
        ) }}
      />
    );

    // 1. 是否正确显示
    // 1.1 默认类型以及 field 类型
    assert.equal(defaultWrapper.find('.ant-select-arrow svg.anticon-spin').length, 1);
    assert.equal(fieldWrapper.find('.ant-select-arrow svg.anticon-spin').length, 1);

    // 1.2 menu 类型
    menuWrapper.find('.ant-select').simulate('click');
    assert.equal(menuWrapper.find('.ant-select-arrow svg.anticon-spin').length, 0);
    assert.equal(menuWrapper.find('.ant-spin.ant-spin-spinning').length, 1);

    // 1.2 all 类型
    allWrapper.find('.ant-select').simulate('click');
    assert.equal(allWrapper.find('.ant-select-arrow svg.anticon-spin').length, 1);
    assert.equal(allWrapper.find('.ant-spin.ant-spin-spinning').length, 1);

    // 2 props.spin 传入值是否正确
    assert.isTrue(menuWrapper.find('.kant-icon-spin').length > 0);
    assert.isTrue(allWrapper.find('.kant-icon-spin').length > 0);

  });

  it('触底事件是否正确触发', function (){
    const data = [];
    for(let i = 0; i < 10; i++){
      data.push({ title: `红色${i}`, value: `red${i}` });
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

  it('追加 dom 是否实现', function (){
    const onClick = sinon.fake();
    const data =  [{ title: '红色', value: 'red' }];
    const wrapper = mount(
      <Select
        data = {data}
        apendDom={(<div onClick={onClick} className="kant-append">加载更多</div>)}
        dropdownRender={(dom) => (<div>{dom}<div className="kant-dropdown-render"></div></div>)}
      />
    );
    // 1. option 是否渲染
    wrapper.find('.ant-select').simulate('click');
    assert.equal(wrapper.find('.ant-select-dropdown-menu-item').length, 2);

    // 2. 追加内容是否成功
    assert.equal(wrapper.find('.kant-append').length, 1);
    assert.equal(wrapper.find('.kant-append').text(), '加载更多');

    // 2. 点击事件是否执行
    wrapper.find('.kant-append').simulate('click');
    assert.isTrue(onClick.called);

    // 3. 原生 dropdownRender 是否可用
    assert.equal(wrapper.find('.kant-dropdown-render').length, 1);

  });
});
