import React, { useState } from 'react';
import { Divider, Button } from 'antd';
import { ProgressBar } from '@components/index';

import "@components/progress-bar/style";

const styles = {
  webHeight: {
    height: 4000,
  },
  outerLayout: {
    width: '80%',
    margin: '20px auto'
  },
  jumpButton: {
    margin: "0 20px"
  },
  flex: {
    position: 'fixed'
  }
};

const ProgressBarComponent = () => {
  const [progress1, setProgress1] = useState(80);
  const [animation1, setAnimation1] = useState(true);
  return (
    <div style={styles.webHeight}>
      <Divider>加载进度条</Divider>
      <Button onClick={() => setProgress1(100)}>
        完成
      </Button>
      <Button style={styles.jumpButton}
        onClick={() => setProgress1(80)}>
        跳转
      </Button>
      <Button onClick={() => setAnimation1(!animation1)}>
        {`${animation1 ? "关闭" : "启动"}动画效果`}
      </Button>
      <div style={styles.outerLayout}>
        <ProgressBar
          percent={progress1}
          animation={animation1}
          autoClearPercent={true} />
      </div>
      <div style={styles.flex}>
        <Divider>滚动进度条</Divider>
        <div style={styles.outerLayout}>
          <ProgressBar mode="scroll" />
        </div>
      </div>
    </div>
  );
};

export default () => {
  return (
    <ProgressBarComponent />
  );
};