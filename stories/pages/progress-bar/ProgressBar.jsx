import React, { useState } from 'react';
import { Divider, Button } from 'antd';
import { ProgressBar } from '@components/index';

import "@components/progress-bar/style";

const styles = {
  outerLayout: {
    width: '80%',
    margin: '20px auto'
  },
};

const ProgressBarComponent = () => {
  const [progress1, setProgress1] = useState(80);
  return (
    <div>
      <Divider>正常情况</Divider>
      <Button onClick={() => setProgress1(100)}>完成</Button>
      <Button onClick={() => setProgress1(80)}>跳转</Button>
      <div style={styles.outerLayout}>
        <ProgressBar percent={progress1} animation={false} />
      </div>
    </div>
  );
};

export default () => {
  return (
    <ProgressBarComponent />
  );
};