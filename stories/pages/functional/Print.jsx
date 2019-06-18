import React, { useRef } from 'react';
import { Table } from 'antd';
import { Print } from '@components';

const dataSource = [];

for (let i = 0; i < 100; i++){
  dataSource.push({
    key: `${new Date().getDate()}-${i}`,
    name: '胡彦斌',
    age: i,
    address: '西湖区湖底公园1号',
  });
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

const useStateHook = (props) => {
  const contentRef = useRef();

  return { contentRef };
};

const PrintDoc = (props) => {
  const state = useStateHook(props);

  return (
    <div>
      <Print table={{ dataSource, columns }}>
        打印
      </Print>

      <Table pagination={false} ref={state.contentRef} dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default (v => <PrintDoc />);
