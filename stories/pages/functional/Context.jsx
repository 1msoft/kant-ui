import React, { useState } from 'react';
import { Divider } from 'antd';
import { InputNumber, DatePicker, Context } from '@components/index';

const ContextComponent = () => {
  const [config, setConfig] = useState({ theme: 'underline' });
  return (
    <div>
      <div style={{ padding: 15 }}>
        <span style={{ color: "#40a9ff", cursor: "pointer" }}
          onClick={() => {
            const theme = config.theme;
            const newConfig = {
              theme: theme === "box" ? "underline" : "box",
            };
            setConfig(newConfig);
          }}>
          修改Context的value
        </span>
      </div>
      <Divider>Context</Divider>
      <Context.Provider value={config}>
        <Divider orientation="left">数字输入框</Divider>
        <InputNumber />
        <Divider orientation="left">日期选择器</Divider>
        <DatePicker />
      </Context.Provider>
    </div>
  );
};

export default () => {
  return (
    <ContextComponent />
  );
};