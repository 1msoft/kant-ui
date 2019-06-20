import React, { useEffect, useRef, useState, useMemo, Fragment } from 'react';
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
  const [params, setParams] = useState({
    padding: props.padding,
  });
  const printBody = useRef();

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
    value = value.target ? value.target.value : value;
    setParams({ ...params, [key]: value });
  };

  return { params, show, onOpen, onClose, printBody, resetParams };
};

/**
 * @param {Object} props
 * # 自定义打印
 * @param {Ref | ReactNode} props.content 自定义打印内容
 * # 表格打印
 * @param {Object[]} dataSource 参考 antd table dataSource
 * @param {Object[]} columns    参考 antd table columns
 * @param {Boolean} showPagination 显示页码，默认为 true
 * @param {ReactNode} title          标题
 * @param {Boolean} alwaysShowTitle 是否一直显示标题，默认为 true
 * @param {ReactNode} pageHeader          打印页头
 * @param {Boolean} alwaysShowPageHeader 是否一直显示打印页头，默认为 true
 * @param {ReactNode} pageFooter          打印页脚
 * @param {Boolean} alwaysShowPageFooter 是否一直显示打印页脚，默认为 true
 * # 私有属性
 * @param {Number | String} padding 打印页面内边距
 * @returns {ReactComponent}
 */
let Print = (props) => {
  const state = useStateHook(props);
  return (
    <div className="kant-print">
      <Drawer
        width="100%"
        visible={state.show}
        onClose={state.onClose}
        bodyStyle={{ padding: 0, height: '100%' }}
      >
        <div className="kant-print-preview">
          <div className="kant-print-preview-view">
            <div ref={state.printBody} className="kant-print-body">
              {props.content ? <CustomContent {...props} params={state.params}/> : null }
              {props.dataSource ? <TableList {...props} params={state.params}/> : null}
            </div>
          </div>
          <div className="kant-print-preview-tool">
            <FormLayout colon={true} inlineLabel={true}>
              <FormItem row={1} span={12} label="边距">
                <Input
                  placeholder="边距"
                  value={state.params.padding}
                  onChange={state.resetParams.bind(null, 'padding')}
                />
              </FormItem>
              <FormItem row={1} span={12}>
                <ReactToPrint
                  bodyClass="kant-print-iframe"
                  content={() => (state.printBody.current)}
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

Print.defaultProps = {
  padding: 30,
  showPagination: true,
  alwaysShowTitle: true,
  alwaysShowPageHeader: true,
  alwaysShowPageFooter: true,
};

export default Print;
