import React, { useState, useEffect } from 'react';
import { Checkbox } from '@components/index';
import { Divider } from "antd";
import '@components/checkbox/style';
import './Checkbox.less';

const CheckboxBlock = () => {
  return (
    <div style={{ margin: '30px' }}>
      <Divider orientation="left">勾选框</Divider>
      <div style={{ padding: '30px' }}>
        勾选框：<Checkbox />
      </div>
    </div>
  );
};

export default () => (
  <CheckboxBlock></CheckboxBlock>
);
