import React, { useState, useEffect } from "react";
import { Divider } from 'antd';
import { Table } from "@components/index";

import "@components/table/style";

const smallDataSource = [
  {
    key: 0,
    date: `2019-02-${Math.floor(Math.random() * 28) + 1}`,
    amount: 120,
    type: 'income',
    note: 'transfer',
  },
  {
    key: 1,
    date: '2018-03-11',
    amount: 243,
    type: 'income',
    note: 'transfer',
  },
  {
    key: 2,
    date: '2018-04-11',
    amount: 98,
    type: 'income',
    note: 'transfer',
  },
];

const greatDataSource = [];
for (let i = 0; i < 100; i++) {
  greatDataSource.push({
    key: i,
    date: `2019-02-${Math.floor(Math.random() * 28) + 1}`,
    amount: i,
    type: `income-${i}`,
    note: 'transfer',
  });
};

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    width: 100,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    width: 100,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: 100,
  },
  {
    title: 'Note',
    dataIndex: 'note',
    width: 100,
    sorter: (a, b) => a.note - b.note,
  },
];

const App = () => {
  return (
    <div style={{ margin: '24px 36px' }}>
      <Divider orientation="left">表格展示 - 可伸缩列</Divider>
      <ResizableTable />
      <Divider orientation="left">表格展示 - 表格分页</Divider>
      <PaginationTable />
      <Divider orientation="left">表格展示 - 前端分页,排序</Divider>
      <FrontEndSorterTable />
    </div>
  );
};

const ResizableTable = () => {
  return (
    <Table
      bordered
      resizable={true}
      columns={columns}
      dataSource={smallDataSource}
    />
  );
};

const fetchData = async (url) => {
  return await fetch(url).then(res => res.json());
};

const paginationColumns = [
  {
    title: 'title',
    dataIndex: 'title',
  },
  {
    title: 'create_atNote',
    dataIndex: 'create_at',
    width: 100,
  },
  {
    title: 'last_reply_at',
    dataIndex: 'last_reply_at',
  },
  {
    title: 'visit_count',
    dataIndex: 'visit_count',
    sorter: (a, b) => a.visit_count - b.visit_count,
  },
];

const url = 'https://cnodejs.org/api/v1/topics';
const PaginationTable = () => {
  const [loading, useLoading] = useState(false);
  const [pagination, usePage] = useState({ current: 1, pageSize: 10, total: 100 });
  const onChange = (page, filters, sorter) => {
    usePage(prevPage => ({ ...prevPage, current: page.current, pageSize: page.pageSize }));
  };

  const [dataSource, useDataSource] = useState([]);
  useEffect(() => {
    useLoading(() => true);
    fetchData(`${url}?page=${pagination.current}&limit=${pagination.pageSize}`)
      .then((res) => useDataSource([...res.data]))
      .then(() => useLoading(() => false));
  }, [pagination]);

  return (
    <Table
      rowKey={(record) => record.id}
      bordered
      loading={loading}
      pagination={pagination}
      columns={paginationColumns}
      onChange={onChange}
      dataSource={dataSource}
    />
  );
};

const sortColumns = [
  {
    title: 'Date',
    dataIndex: 'date',
    sorter: (a, b) => a.date - b.date,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    prefix: '$',
    precision: 4,
    sorter: (a, b) => a.amount - b.amount,
    sortDirections: ['descend']
  },
  {
    title: 'Type',
    dataIndex: 'type',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Note',
    dataIndex: 'note',
    width: 100,
    format: (text, record, index) => {
      return `${record.date} ${text}`;
    },
    sorter: (a, b) => a.note - b.note,
  },
];

const FrontEndSorterTable = () => {
  return (
    <Table
      rowKey={(record) => record.amount}
      bordered
      columns={sortColumns}
      dataSource={greatDataSource}
    />
  );
};

export default App;
