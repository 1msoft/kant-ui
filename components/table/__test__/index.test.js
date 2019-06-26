import React from 'react';
import { expect, assert } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import moment from 'moment';
import Table from '../index';

const { mount } = Enzyme;

const columns = [
  { title: '姓名', dataIndex: 'name', width: 100, },
  { title: '年龄', dataIndex: 'age', width: 100, },
  {
    title: '生日',
    dataIndex: 'birthday',
    format: text => moment(text, 'YYYY-MM-DD'),
    width: 100,
  },
  {
    title: '学费',
    dataIndex: 'tuition',
    precision: 2,
    prefix: '$',
    width: 100,
  },
  { title: '名次', dataIndex: 'ranking', suffix: '%', width: 100, },
];

const dataSource = [
  { id: 1, name: 'Jack', age: 12, birthday: '2010-1-1', tuition: 1350, ranking: 30 },
  { id: 2, name: 'Lucy', age: 9, birthday: '2010-06-19', tuition: 1350, ranking: 12 },
];

// 为 Enzyme 配置适配器
Enzyme.configure({ adapter: new Adapter() });

describe('Table 表格组件', () => {
  it ('参数是否正确接收', () => {
    const wrapper = mount(
      <Table
        rowKey={record => record.id}
        resizable={true}
        columns={columns}
        dataSource={dataSource}
        wrapperClassName="custom-table-wrapper"
      />
    );
    expect(wrapper.exists('.kant-table .react-resizable')).to.equal(true);
    expect(wrapper.exists('.custom-table-wrapper')).to.equal(true);
  });

  it ('覆盖默认分页配置', () => {
    const pagination = {
      showTotal: (total) => `共 ${total} 条`
    };
    const wrapper = mount(
      <Table
        rowKey={record => record.id}
        pagination={pagination}
        columns={columns}
        dataSource={dataSource}
      />
    );
    const pageTotalText = wrapper.find('.kant-table .ant-pagination-total-text').text();
    expect(/[0-9]/.test(pageTotalText)).to.equal(true);
  });

  it ('覆盖率测试', () => {
    mount(
      <Table
        rowKey={record => record.id}
        pagination={null}
        resizable={null}
        columns={columns}
        dataSource={dataSource}
      />
    );
  });
});
