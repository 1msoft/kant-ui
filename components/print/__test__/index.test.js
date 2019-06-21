import _ from 'lodash';
import React, { useRef } from 'react';
import sinon from 'sinon';
import Enzyme from 'enzyme';
import { assert } from 'chai';
import Print from '..';
import { Select as AntSelect, Icon } from 'antd';
import Adapter from 'enzyme-adapter-react-16';

const { mount, shallow } = Enzyme;
const Option = AntSelect.Option;
const printText = '这是打印内容';
const printTitle = '表格打印标题';
const pageHeader = '表格打印页头';
const pageFooter = '表格打印页尾';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'CompanyName',
    dataIndex: 'companyName',
    key: 'companyName',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
];

const dataSource = [];

for (let i = 0; i < 20; i++) {
  dataSource.push({
    key: i,
    name: 'John Brown',
    companyName: 'SoftLake Co',
    gender: 'M',
  });
}

Enzyme.configure({ adapter: new Adapter() });

describe('Print: 打印', function () {

  describe('自定义打印内容', function () {
    it('传入 ref', function(){
      const App = () => {
        const printRef = useRef();
        return (
          <div>
            <div className="kant-print-content" ref={printRef}>{printText}</div>
            <Print content={printRef}>打印</Print>
          </div>
        );
      };
      const wrapper = mount(<App />);
      wrapper.find('.kant-print > span').simulate('click');
      const text = wrapper.find('.kant-print-content').text();
      assert.equal(text, printText)
    });

    it('传入 reactElement', function(){
      const wrapper = mount(
        <Print content={(
          <div className="kant-print-content">{printText}</div>
        )}>打印</Print>
      );
      wrapper.find('.kant-print > span').simulate('click');
      const text = wrapper.find('.kant-print-content').text();
      assert.equal(text, printText)
    });
  })

  describe('表格打印', function () {
    it('基础', function(){
      const wrapper = mount(
        <Print
          columns={columns}
          dataSource={dataSource}
        >
          打印
        </Print>
      );
      wrapper.find('.kant-print > span').simulate('click');
      assert.equal(wrapper.find('.kant-print-page').length, 2);
    });

    it('标题、页头、页脚', function(){
      const wrapper_true = mount(
        <Print
          columns={columns}
          alwaysShowTitle={true}
          dataSource={dataSource}
          alwaysShowPageHeader={true}
          alwaysShowPageFooter={true}
          title={<div className="kant-test-title">{printTitle}</div>}
          pageHeader={<div className="kant-test-header">{pageHeader}</div>}
          pageFooter={<div className="kant-test-footer">{pageFooter}</div>}
        >
          打印
        </Print>
      );
      const wrapper_false = mount(
        <Print
          columns={columns}
          alwaysShowTitle={false}
          dataSource={dataSource}
          alwaysShowPageHeader={false}
          alwaysShowPageFooter={false}
          title={<div className="kant-test-title">{printTitle}</div>}
          pageHeader={<div className="kant-test-header">{pageHeader}</div>}
          pageFooter={<div className="kant-test-footer">{pageFooter}</div>}
        >
          打印
        </Print>
      );
      wrapper_true.find('.kant-print > span').simulate('click');
      wrapper_false.find('.kant-print > span').simulate('click');
      assert.equal(wrapper_true.find('.kant-test-title').length, 3);
      assert.equal(wrapper_true.find('.kant-test-header').length, 3);
      assert.equal(wrapper_true.find('.kant-test-footer').length, 3);

      assert.equal(wrapper_false.find('.kant-test-title').length, 2);
      assert.equal(wrapper_false.find('.kant-test-header').length, 2);
      assert.equal(wrapper_false.find('.kant-test-footer').length, 2);
    });

    it('单边距', function(){
      const wrapper = mount(
        <Print
          columns={columns}
          padding="3"
          dataSource={dataSource}
        >
          打印
        </Print>
      );
      wrapper.find('.kant-print > span').simulate('click');
      const padding = wrapper.find('.kant-print-page').at(0).getDOMNode().style['padding-top'];
      assert.equal(padding, '3px');
    });

    it('多边距', function(){
      const wrapper = mount(
        <Print
          columns={columns}
          padding={{ top: 10, bottom: 20, left: 20, right: 20 }}
          dataSource={dataSource}
        >
          打印
        </Print>
      );
      wrapper.find('.kant-print > span').simulate('click');
      const padding = wrapper.find('.kant-print-page').at(0).getDOMNode().style['padding-top'];
      assert.equal(padding, '10px');
    });
  });
});
