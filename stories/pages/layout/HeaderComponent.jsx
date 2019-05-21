import React, { useState } from 'react';
import { Header } from '@components/index';
import { Layout, Switch } from 'antd';
import '@components/header/style';

const styles = {
  outerLayer: {
    background: '#eef0f3',
    height: 1500,
  },
  marginTop: {
    marginTop: 96
  },
  subNav: {
    padding: '5px 20px',
    borderBottom: '1px solid #eee',
    borderTop: '1px solid #eee',
    textAlign: 'right',
  },
};

const subHeaderComponent = () => {
  return (
    <div style={styles.subNav} key="subNav">
      <span style={{ marginRight: 10 }}>加为书签</span>
      <span>收藏本站点</span>
    </div>
  )
};

const HeaderComponent = () => {
  const [fixed, setFixed] = useState(true);
  const [subNav, setSubNav] = useState(true);
  const [placement, setPlacement] = useState(true);
  return (
    <div >
      <div style={styles.outerLayer}>
        <Layout>
          <Header
            fixed={fixed}
            upShow={200}
            downHide={200}
            subNavPlacement={placement ? 'up' : 'down'}
            subNav={subNav ? subHeaderComponent() : undefined}>
            <span>这个是logo</span>
          </Header>
          <p style={fixed ? styles.marginTop : {}}>
            段落一段落一段落一段落一
          </p>
          <p>段落一段落一段落一段落一</p>
          <p>段落二段落二段落二段落二</p>
          <p>段落三段落三段落三段落三</p>
          <p>段落四段落四段落四段落四</p>
          <p>段落五段落五段落五段落五</p>
          <div>
            <p>是否固定:
              <Switch
                checkedChildren="是"
                unCheckedChildren="否"
                checked={fixed}
                onChange={(checked) => { setFixed(checked) }} />
            </p>
            <p>是否存在子标题:
              <Switch
                checkedChildren="是"
                unCheckedChildren="否"
                checked={subNav}
                onChange={(checked) => { setSubNav(checked) }} />
            </p>
            {
              subNav ?
                <p>
                  子标题方向：
                  <Switch
                    checkedChildren="上"
                    unCheckedChildren="下"
                    checked={placement}
                    onChange={(checked) => { setPlacement(checked) }} />
                </p> : ''
            }
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default () => {
  return (
    <HeaderComponent />
  );
};
