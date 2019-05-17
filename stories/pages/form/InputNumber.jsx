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
      // label="姓名"
      defaultValue={100}
      className="custom-input-number"
    />
    <Divider orientation="left">隐藏控制按钮</Divider>
    <InputNumber
      controls={false}
      defaultValue={100}
      className="custom-input-number"
    />
    <Divider orientation="left">前缀</Divider>
    <InputNumber
      prefix="$"
      defaultValue={100}
      className="custom-input-number"
    />
    <Divider orientation="left">后缀</Divider>
    <InputNumber
      suffix="%"
      defaultValue={100}
      className="custom-input-number"
    />
    <Divider orientation="left">不同风格模式 box | underline</Divider>
    <InputNumber
      theme="box"
      controls={false}
      defaultValue={100}
      className="custom-input-number"
    />
    <span style={{ padding: '0 30px' }}></span>
    <InputNumber
      theme="underline"
      controls={false}
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
      onPressEnter={(value) => alert(value)}
    />
  </div>
);
