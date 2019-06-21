import React, { useRef, Fragment, useEffect, useState } from 'react';
import { Table, Divider, List, Button, Radio } from 'antd';
import { findDOMNode } from "react-dom";
import { Print } from '@components';
import { Form, InputNumber } from '@components';
import '@components/print/style';
import './Print.less';

const { FormLayout, FormItem } = Form;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index % 2 === 0) {
        obj.props.rowSpan = 2;
      } else {
        obj.props.rowSpan = 0;
      }
      return obj;
    },
  },
  {
    title: 'Company',
    children: [
      {
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
      },
    ],
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
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  });
}

const PrintDoc = (props) => {
  return (
    <div className="kant-print-demo">
      <DividerBlock>自定义打印内容 - 传入 ref</DividerBlock>
      <CustomPrintingRef />
      <DividerBlock>自定义打印内容 - 传入 reactElement</DividerBlock>
      <CustomPrintingElement />
      <DividerBlock>表格打印 - 页码控制</DividerBlock>
      <PrintTablePagination />
      <DividerBlock> 表格打印 - 布局控制 </DividerBlock>
      <PrintTableLayout />
      <DividerBlock>表格打印 - 标题、页头、页尾控制</DividerBlock>
      <PrintTableTitle />
      <DividerBlock>表格打印 - 边距控制</DividerBlock>
      <PrintTablePadding />
      <DividerBlock>表格打印 - 异步加载数据</DividerBlock>
      <PrintTableAsync />
    </div>
  );
};

export default (v => <PrintDoc />);

// 自定义打印内容 - 传入 ref
const CustomPrintingRef = () => {
  const printRef = useRef();
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  return (
    <Fragment>
      <Print content={printRef}>
        <Button>打印</Button>
      </Print>
      <div ref={printRef} className="kant-custom-printing">
        <List
          size="large"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    </Fragment>
  );
};

// 自定义打印内容 - 传入 reactElement
const CustomPrintingElement = () => {
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  return (
    <Print content={(
      <div className="kant-custom-printing">
        <List
          size="large"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    )}>
      <Button>打印</Button>
    </Print>
  );
};

// 表格打印 - 页码控制
const PrintTablePagination = () => {
  const [showPagination, setShowPagination] = useState(true);
  const onChange = (e) => {
    setShowPagination(e.target.value);
  };
  return (
    <Fragment>
      是否显示页码:&nbsp;&nbsp;
      <Radio.Group onChange={onChange} value={showPagination}>
        <Radio value={true}>显示页码</Radio>
        <Radio value={false}>不显示页码</Radio>
      </Radio.Group>
      <Print
        columns={columns}
        dataSource={dataSource}
        showPagination={showPagination}
      >
        <Button>打印</Button>
      </Print>
    </Fragment>
  );
};

// 表格打印 - 布局控制(自定义打印也是具有 llayout 属性)
const PrintTableLayout = () => {
  const [layout, setLayout] = useState('portrait');
  const onChange = (e) => {
    setLayout(e.target.value);
  };
  return (
    <Fragment>
      打印布局:&nbsp;&nbsp;
      <Radio.Group onChange={onChange} value={layout}>
        <Radio value={'portrait'}>纵向</Radio>
        <Radio value={'transverse'}>横向</Radio>
      </Radio.Group>
      <Print
        layout={layout}
        columns={columns}
        dataSource={dataSource}
      >
        <Button>打印</Button>
      </Print>
    </Fragment>
  );
};

// 表格打印 - 标题、页头、页尾控制
const PrintTableTitle = () => {
  const [alwaysShowTitle, setAlwaysShowTitle] = useState(true);
  const [alwaysShowPageHeader, setAlwaysShowPageHeader] = useState(true);
  const [alwaysShowPageFooter, setAlwaysShowPageFooter] = useState(true);
  const resetAlwaysShowTitle = (e) => {
    setAlwaysShowTitle(e.target.value);
  };
  const resetAlwaysShowPageHeader = (e) => {
    setAlwaysShowPageHeader(e.target.value);
  };
  const resetAlwaysShowPageFooter = (e) => {
    setAlwaysShowPageFooter(e.target.value);
  };
  return (
    <Fragment>
      <div>
        是否一直显示标题:&nbsp;&nbsp;
        <Radio.Group onChange={resetAlwaysShowTitle} value={alwaysShowTitle}>
          <Radio value={true}>是</Radio>
          <Radio value={false}>否</Radio>
        </Radio.Group>
      </div>
      <div>
        是否一直显示页头:&nbsp;&nbsp;
        <Radio.Group onChange={resetAlwaysShowPageHeader} value={alwaysShowPageHeader}>
          <Radio value={true}>是</Radio>
          <Radio value={false}>否</Radio>
        </Radio.Group>
      </div>
      <div>
        是否一直显示页尾:&nbsp;&nbsp;
        <Radio.Group onChange={resetAlwaysShowPageFooter} value={alwaysShowPageFooter}>
          <Radio value={true}>是</Radio>
          <Radio value={false}>否</Radio>
        </Radio.Group>
      </div>
      <Print
        title="表格打印效果"
        pageHeader="单位: 福建英迈软件有限公司"
        pageFooter="承办方: 福建英迈软件有限公司"
        columns={columns}
        dataSource={dataSource}
        alwaysShowTitle={alwaysShowTitle}
        alwaysShowPageHeader={alwaysShowPageHeader}
        alwaysShowPageFooter={alwaysShowPageFooter}
      >
        <Button>打印</Button>
      </Print>
    </Fragment>
  );
};

/**
 * 表格打印 - 边距控制
 * - 自定义打印也是具有 padding onPaddingChange 属性
 * - padding 也可以是个数字，表示上下左右具有相同边距
 * @return {ReactElement}
 */
const PrintTablePadding = () => {
  const [padding, setPadding] = useState({
    top: 30, bottom: 30, left: 30, right: 30,
  });

  const onChange = (e) => {
    setLayout(e.target.value);
  };

  // 重新设置 Params
  const resetPadding = (key, value) => {
    value = value.target ? value.target.value : value;
    const reset = { ...padding, [key]: value };
    setPadding(reset);
  };

  const onPaddingChange = (data) => {
    console.log('--- padding is change --', data);
  };

  return (
    <div className="kant-print-form-layout">
      <FormLayout colon={true} inlineLabel={true}>
        <FormItem row={1} span={12} label="上边距">
          <InputNumber
            placeholder="上边距"
            value={padding.top}
            onChange={resetPadding.bind(null, 'top')}
          />
        </FormItem>
        <FormItem row={1} span={12}>
          <Print
            padding={padding}
            columns={columns}
            dataSource={dataSource}
            onPaddingChange={onPaddingChange}
          >
            <Button size="large" style={{ margin: 0 }}>打印</Button>
          </Print>
        </FormItem>
        <FormItem row={2} span={12} label="下边距">
          <InputNumber
            placeholder="下边距"
            value={padding.bottom}
            onChange={resetPadding.bind(null, 'bottom')}
          />
        </FormItem>
        <FormItem row={3} span={12} label="左边距">
          <InputNumber
            placeholder="左边距"
            value={padding.left}
            onChange={resetPadding.bind(null, 'left')}
          />
        </FormItem>
        <FormItem row={4} span={12} label="右边距">
          <InputNumber
            placeholder="右边距"
            value={padding.right}
            onChange={resetPadding.bind(null, 'right')}
          />
        </FormItem>
      </FormLayout>
    </div>
  );
};

// 表格打印 - 异步加载数据(自定义内容打印也是具有 onAfterPrint onBeforePrint 属性)
const PrintTableAsync = () => {
  const [data, setData] = useState([]);

  const onBeforePrint = ({ open }) => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(dataSource);
      }, 2000);
    }).then(res => {
      setData([...res]);
      open();
    });
  };

  const onAfterPrint = ({ close }) => {
    // 清空数据
    setData([]);
    close();
  };

  useEffect(() => {
    console.log('--- current data', data);
  }, [data]);

  return (
    <Print
      columns={columns}
      dataSource={data}
      onBeforePrint={onBeforePrint}
      onAfterPrint={onAfterPrint}
    >
      <Button>打印</Button>
    </Print>
  );
};

// 虚线
const DividerBlock = (props) => (
  <Divider
    dashed
    orientation="left"
    style={{ color: '#999', padding: '20px 0' }}
  >
    {props.children}
  </Divider>
);
