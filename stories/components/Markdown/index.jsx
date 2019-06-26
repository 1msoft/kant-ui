
import React, { useEffect, useMemo, Fragment, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import { Drawer, Icon } from 'antd';
import hljs from 'highlight.js';
import './index.less';

const useStateHook = (props) => {
  const [show, setShow] = useState(false);
  const staticData = useMemo(() => ({ open: 0 }), []);

  useEffect(() => {
    if (show && staticData.open === 1){
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });
    }
  }, [props.data, show]);

  const md = useMemo(() => (
    props.data ? (props.data.default || props.data) : ''
  ), [props.data]);

  const onOpen = () => {
    staticData.open += 1;
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
  };

  return { md, show, onOpen, onClose };
};

const MarkdownBlock = (props) => {
  const state = useStateHook(props);
  return (
    <Fragment>
      <Drawer
        width="80%"
        title="演示代码"
        placement="right"
        closable={false}
        onClose={state.onClose}
        visible={state.show}
      >
        <div className="markdown">
          <Markdown>
            {state.md}
          </Markdown>
        </div>
      </Drawer>
      <div className="markdown-icon" onClick={state.onOpen}>
        <Icon type="code-sandbox" style={{ fontSize: 20, color: '#999' }}/>
      </div>
    </Fragment>
  );
};

export default MarkdownBlock;
