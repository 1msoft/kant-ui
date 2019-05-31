import React, { useState, useEffect } from 'react';
import { Checkbox } from '@components/index';
import '@components/checkbox/style';
import './Checkbox.less';

const CheckboxBlock = () => {
  return (
    <div style={{ padding: '30px' }}>
      <Checkbox />
    </div>
  );
};

export default () => (
  <CheckboxBlock></CheckboxBlock>
);
