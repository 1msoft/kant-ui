import React from "react";
import { Divider } from "antd";
import { InputNumber } from "@components/index";

import "@components/input-number/style";
import "./InputNumber.less";

export default () => (
  <div style={{ margin: 30 }}>
    <Divider orientation="left">自动获焦</Divider>
    <InputNumber
      autoFocus={true}
      defaultValue={100}
      className="custom-input-number"
    />
    <Divider orientation="left">隐藏控制按钮</Divider>
    <InputNumber
      controls={true}
      defaultValue={100}
      className="custom-input-number"
    />
    <Divider orientation="left">最大值=100 | 最小值=0</Divider>
    <InputNumber
      min={0}
      max={100}
      defaultValue={50}
      className="custom-input-number"
    />
    <Divider orientation="left">前缀</Divider>
    <InputNumber
      prefix="$"
      defaultValue={100}
      className="custom-input-number"
      onPressEnter={e => console.log(e.target.value)}
    />
    <Divider orientation="left">后缀</Divider>
    <InputNumber
      suffix="%"
      defaultValue={100}
      className="custom-input-number"
    />
    <Divider orientation="left">后缀 + 关闭步骤控制器</Divider>
    <InputNumber
      suffix="%"
      controls={true}
      defaultValue={100}
      className="custom-input-number"
    />
    <Divider orientation="left">不同风格模式 box | underline</Divider>
    <InputNumber
      theme="box"
      controls={true}
      defaultValue={100}
      className="custom-input-number"
    />
    <span style={{ padding: '0 30px' }}></span>
    <InputNumber
      theme="underline"
      controls={true}
      defaultValue={100}
      className="custom-input-number"
    />
    <Divider orientation="left">精度</Divider>
    <InputNumber
      precision={4}
      defaultValue={100}
      className="custom-input-number"
    />
    <Divider orientation="left">回车事件</Divider>
    <InputNumber
      defaultValue={100}
      className="custom-input-number"
      onPressEnter={(e) => alert(e.target.value)}
      onKeyDown={e => console.log(e.target.value)}
    />
  </div>
);
