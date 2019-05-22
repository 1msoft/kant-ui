import React from 'react';
import { Button } from 'antd';

const com = () => {
  return (
    <div>
      <Button type="primary" size="large">测试按钮</Button>
      <div className="custom">
        自定义背景颜色
      </div>
    </div>
  );
};

export default com;
