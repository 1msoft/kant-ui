import React, {
  useMemo,
  useState,
  useCallback,
} from 'react';
import { Select } from '@components/index';
import '@components/select/style';

import {
  Spin,
  Button,
  Divider,
  Collapse,
  Select as AntSelect,
} from 'antd';

const Panel = Collapse.Panel;
const Option = AntSelect.Option

export default () => {
  return (
    <div style={{padding: 20}}>
      <DividerBlock>基础调用</DividerBlock>
      <BaseUse />
      <DividerBlock>自定义数据 key</DividerBlock>
      <CustomDataKey />
      <DividerBlock>手动格式化数据</DividerBlock>
      <FormatData />
      <DividerBlock>自定义 option</DividerBlock>
      <CustomOption />
      <DividerBlock>滚动触底加载更多</DividerBlock>
      <TouchBottom />
    </div>
  );
}

// 基础使用
const BaseUse = () => {
  const [data, setState] = useState([
    {title: '红色', value: 'red'},
    {title: '白色', value: 'white', props: { disabled: true }},
    {title: '黑色', value: 'black'},
  ]);

  // 动态添加
  const addData = useCallback(() => {
    setState([ ...data, {title: '粉色', value: 'pink'} ]);
  }, [data])

  // onChange 事件
  const onChange = useCallback((value, option) => {
    console.log('------ value ----', value, option);
  }, []);

  // onSearch 事件
  const onSearch = useCallback((value) => {
    console.log('----- value ----', value);
  }, []);

  return (
    <div>
      <Button onClick={addData} type="primary">添加粉色</Button> <br/><br/>
      <Select
        data={data}
        showSearch
        allowClear
        filterOption={false}
        onChange={onChange}
        onSearch={onSearch}
        placeholder="请选择颜色"
        apendOption={<div>加载更多</div>}
        style={{width: '100%'}}
      />
    </div>
  )
}

// 自定义数据 key
const CustomDataKey = () => {
  const data = useMemo(() => ([
    {desc: '红色', color: 'red'},
    {desc: '橙色', color: 'orange'},
    {desc: '黄色', color: 'yellow'},
    {desc: '绿色', color: 'green'},
    {desc: '青色', color: 'cyan'},
    {desc: '蓝色', color: 'blue'},
    {desc: '紫色', color: 'purple'},
    {desc: '灰色', color: 'grey'},
    {desc: '粉色', color: 'pink'},
  ]), []);

  // onChange 事件
  const onChange = useCallback((value, option) => {
    console.log('------ value ----', value, option);
  }, []);

  return (
    <Select
      data={data}
      formatTitle="desc"
      formatValue="color"
      onChange={onChange}
      placeholder="请选择颜色"
      style={{width: '100%'}}
    />
  );
}

// 格式化数据
const FormatData = () => {
  const data = useMemo(() => ([
    {community: '国关小区', building: '1', house: '201', id: '123'},
    {community: '花园小区', building: '8', house: '801', id: '456'},
  ]), []);

  // onChange 事件
  const onChange = useCallback((value, option) => {
    console.log('------ value ----', value, option);
  }, []);

  return (
    <Select
      data={data}
      onChange={onChange}
      placeholder="请选择颜色"
      style={{width: '100%'}}
      formatValue={v => v.id}
      formatTitle={v => (`${v.community}${v.building}楼${v.house}`)}
    />
  );
}

// 自定义 option
const CustomOption = () => {
  const data = useMemo(() => ([
    {title: '红色', value: 'red'},
    {title: '橙色', value: 'orange'},
    {title: '黄色', value: 'yellow'},
  ]), []);
  return (
    <Select
      placeholder="请选择颜色"
      style={{width: '100%'}}
    >
      {data.map( v => (
        <Option value={v.value} key={v.value}>
          {v.title}
        </Option>
      ))}
    </Select>
  );
}

// 滚动触底加载更多
const TouchBottom = () => {
  const [spinning, setSpinning] = useState(false);
  const [data, setData] = useState([
    {title: '红色', value: 'red'},
    {title: '橙色', value: 'orange'},
    {title: '黄色', value: 'yellow'},
    {title: '绿色', value: 'green'},
    {title: '青色', value: 'cyan'},
    {title: '蓝色', value: 'blue', props: {disabled: true}},
    {title: '紫色', value: 'purple'},
    {title: '灰色', value: 'grey'},
    {title: '粉色', value: 'pink'},
  ]);

  // 触底事件
  const onTouchBottom = useCallback( e => {
    console.log(e.target);
    new Promise(resolve => {
      setSpinning(true);
      setTimeout(resolve, 3000);
    }).then(res => {
      setSpinning(false);
      setData([
        ...data,
        {title: '黑色', value: 'black'},
        {title: '白色', value: 'white'},
        {title: '棕色', value: 'brown'},
      ]);
    });
  }, [data]);

  // 下拉列表滚动事件
  const onPopupScroll = useCallback(e => {
    console.log('------ 下拉滚动事件 ------', e);
  }, []);

  return (
    <div>
      <Select
        data={data}
        placeholder="请选择颜色"
        onTouchBottom={onTouchBottom}
        onPopupScroll={onPopupScroll}
        style={{width: '100%'}}
      />
      <Spin
        spinning={spinning}
        wrapperClassName={ spinning ? 'em-spin' : '' }
      >
        &nbsp;
      </Spin>
    </div>

  );
}

// 虚线
const DividerBlock = (props) => (
  <Divider
    dashed
    orientation="left"
    style={{color: '#999', padding: '20px 0'}}
  >
    {props.children}
  </Divider>
);
