import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  Fragment,
} from 'react';
import _ from 'lodash';
import ReactToPrint from 'react-to-print';
import { findDOMNode } from "react-dom";
import { Drawer, Button } from 'antd';
import { Form, InputNumber } from '..';

import CustomContent from './subpage/CustomContent';
import TableList from './subpage/TableList';

const { FormLayout, FormItem } = Form;

/**
 * @constant
 * 打印布局 （横向： transverse 纵向： portrait）
 */
const LAYOUT = {
  TRANSVERSE: 'transverse',
  PORTRAIT: 'portrait',
};

/**
 * @constant
 * 布局尺寸： 定义指定布局下，打印页面的宽高
 */
const LAYOUT_SIZE = {
  [LAYOUT.TRANSVERSE]: { height: '210mm', width: '297mm' },
  [LAYOUT.PORTRAIT]: { height: '297mm', width: '210mm' },
};

/**
 * 获取初始参数
 * @param {*} padding 待解析数据 props.padding
 * @returns {Object}
 */
const parsePadding = (padding) => {
  const parseNumber = (data) => {
    const num = parseInt(data, 10);
    return (isNaN(num) ? 0 : num);
  };
  return {
    paddingTop: parseNumber(padding.top || padding),
    paddingBottom: parseNumber(padding.bottom || padding),
    paddingLeft: parseNumber(padding.left || padding),
    paddingRight: parseNumber(padding.right || padding),
  };
};

const useStateHook = (props) => {
  const [params, setParams] = useState({});
  const [show, setShow] = useState(false);
  const printBody = useRef();

  // 计算样式
  const printPageStyle = useMemo(() => {
    const setting = {};
    params.paddingTop && (setting.paddingTop = `${params.paddingTop}px`);
    params.paddingBottom && (setting.paddingBottom = `${params.paddingBottom}px`);
    params.paddingLeft && (setting.paddingLeft = `${params.paddingLeft}px`);
    params.paddingRight && (setting.paddingRight = `${params.paddingRight}px`);
    return setting;
  }, [params]);

  // 关闭打印页
  const onClose = () => {
    props.onAfterPrint ? props.onAfterPrint({
      close: () => setShow(false),
    }) : setShow(false);
  };

  // 打开打印页
  const onOpen = () => {
    props.onBeforePrint ? props.onBeforePrint({
      open: () => setShow(true),
    }) : setShow(true);
  };

  // 重新设置 Params
  const resetParams = (key, value) => {
    value = value.target ? value.target.value : value;
    const reset = { ...params, [key]: value };
    props.onPaddingChange && props.onPaddingChange(reset);
    setParams(reset);
  };

  // 打印主体样式
  const printBodyStyle = useMemo(() => ({
    width: LAYOUT_SIZE[props.layout].width,
  }), [props.layout]);

  useEffect(() => {
    setParams(parsePadding(props.padding));
  }, [props.padding]);

  return {
    show,
    onOpen,
    params,
    onClose,
    printBody,
    resetParams,
    printPageStyle,
    printBodyStyle,
  };
};

/**
 * @param {Object} props
 * # 自定义打印
 * @param {Ref | ReactNode} props.content           自定义打印内容
 * # 表格打印
 * @param {Object[]} props.dataSource               参考 antd table dataSource
 * @param {Object[]} props.columns                  参考 antd table columns
 * @param {String|Function} props.rowKey            参考 antd table rowKey
 * @param {Number} props.unitScale                  单位转换比例（mm 转 ps 的比例， 默认为 3.5）
 * @param {Boolean} props.showPagination            显示页码，默认为 true
 * @param {Number} props.paginationHeight           页码高度（默认30）
 * @param {ReactNode} props.title                   标题
 * @param {Boolean} props.alwaysShowTitle           是否一直显示标题，默认为 true
 * @param {ReactNode} props.pageHeader              打印页头
 * @param {Boolean} props.alwaysShowPageHeader      是否一直显示打印页头，默认为 true
 * @param {ReactNode} props.pageFooter              打印页脚
 * @param {Boolean} props.alwaysShowPageFooter      是否一直显示打印页脚，默认为 true
 * # 公有
 * @param {String} props.layout                     布局（横向 transverse 、纵向 portrait）
 * @param {Number | String | Object} padding        打印页面内边距
 * @param {Function} props.onPaddingChange          边距改变触发该事件
 * @param {Function} props.onAfterPrint             关闭打印预览界面时触发的事件,
 *                                                  需手动调用 close 方法关闭打印预览界面 ({ close }) => {}
 * @param {Function} props.onBeforePrint            打开打印预览界面时触发的事件,
 *                                                  需手动调用 open 方法打开打印预览界面 ({ open }) => {}
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
            <div
              ref={state.printBody}
              style={state.printBodyStyle}
              className="kant-print-body"
            >
              {props.content ?
                <CustomContent
                  {...props}
                  params={state.params}
                  printPageStyle={state.printPageStyle}
                /> : null
              }
              {props.dataSource ?
                <TableList
                  {...props}
                  params={state.params}
                  printPageStyle={state.printPageStyle}
                /> : null
              }
            </div>
          </div>
          <div className="kant-print-preview-tool">
            <FormLayout colon={true} inlineLabel={true}>
              <FormItem row={1} span={12} label="上边距">
                <InputNumber
                  placeholder="上边距"
                  value={state.params.paddingTop}
                  onChange={state.resetParams.bind(null, 'paddingTop')}
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
              <FormItem row={2} span={12} label="下边距">
                <InputNumber
                  placeholder="下边距"
                  value={state.params.paddingBottom}
                  onChange={state.resetParams.bind(null, 'paddingBottom')}
                />
              </FormItem>
              <FormItem row={3} span={12} label="左边距">
                <InputNumber
                  placeholder="左边距"
                  value={state.params.paddingLeft}
                  onChange={state.resetParams.bind(null, 'paddingLeft')}
                />
              </FormItem>
              <FormItem row={4} span={12} label="右边距">
                <InputNumber
                  placeholder="右边距"
                  value={state.params.paddingRight}
                  onChange={state.resetParams.bind(null, 'paddingRight')}
                />
              </FormItem>
            </FormLayout>
          </div>
        </div>
      </Drawer>
      <span onClick={ state.onOpen }>
        {props.children}
      </span>
    </div>
  );
};

Print.defaultProps = {
  rowKey: 'key',
  unitScale: 3.5,
  paginationHeight: 30,
  showPagination: true,
  alwaysShowTitle: true,
  layout: LAYOUT.PORTRAIT,
  alwaysShowPageHeader: true,
  alwaysShowPageFooter: true,
  padding: { top: 30, bottom: 30, left: 30, right: 30 },
};

export default Print;
