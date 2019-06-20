import React, { useRef } from 'react';
import { Table } from 'antd';
import { Print } from '@components';
import '@components/print/style';

const dataSource = [];

for (let i = 0; i < 20; i++){
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

  //
  return (
    <div>
      <Print
        title="表格打印"
        // layout="transverse"
        columns={columns}
        showPagination={true}
        dataSource={dataSource}
        alwaysShowTitle={false}
        pageFooter="承办方: 福建农林大学东方学院"
        pageHeader="单位: 福建农林大学东方学院"
        alwaysShowPageHeader={false}
        onPaddingChange={(data) => {console.log(data);}}
        padding={{ top: 10, left: 30, right: 20, bottom: 15 }}
      >
        打印
      </Print>
      {/* <Print
        padding={10}
        content={state.contentRef}
      >
        打印
      </Print> */}
      <Table pagination={false} ref={state.contentRef} dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default (v => <PrintDoc />);
