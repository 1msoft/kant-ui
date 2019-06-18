// props.content, props.pageStyle, props.bodyClass
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { findDOMNode } from "react-dom";
import { Drawer, Button, Input } from 'antd';
import CustomContent from './subpage/CustomContent';
import TableList from './subpage/TableList';
import ReactToPrint from 'react-to-print';
import { Form } from '..';
import './style';

const { FormLayout, FormItem } = Form;

const useStateHook = (props) => {
  const [show, setShow] = useState(false);
  const [params, setParams] = useState({});
  const previewViewRef = useRef();

  // 关闭打印页
  const onClose = () => {
    setShow(false);
  };

  // 打开打印页
  const onOpen = () => {
    setShow(true);
  };

  // 重新设置 Params
  const resetParams = (key, value) => {
    console.log(value.target.value, 'value.target.value');
    value = value.target ? value.target.value : value;
    setParams({ ...params, [key]: value });
  };

  return { params, show, onOpen, onClose, previewViewRef, resetParams };
};

let Print = (props) => {
  const state = useStateHook(props);

  return (
    <div>
      <Drawer
        width="100%"
        visible={state.show}
        onClose={state.onClose}
        bodyStyle={{ padding: 0, height: '100%' }}
      >
        <div className="kant-print-preview">
          <div
            ref={state.previewViewRef}
            className="kant-print-preview-view"
          >
            {props.content ? <CustomContent {...props} params={state.params}/> : null }
            {props.table ? <TableList {...props} params={state.params}/> : null}
          </div>
          <div className="kant-print-preview-tool">
            <FormLayout colon={true} inlineLabel={true}>
              <FormItem row={1} span={12} label="边距">
                <Input placeholder="边距" onChange={state.resetParams.bind(null, 'margin')}/>
              </FormItem>
              <FormItem row={1} span={12}>
                <ReactToPrint
                  content={() => (state.previewViewRef.current)}
                  trigger={() => (
                    <Button size="large">
                      打印
                    </Button>
                  )}
                />
              </FormItem>
            </FormLayout>
          </div>
        </div>
      </Drawer>
      <Button onClick={ state.onOpen }>
        {props.children}
      </Button>
    </div>
  );
};

export default Print;
