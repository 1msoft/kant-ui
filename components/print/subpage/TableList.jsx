import React, {
  useRef,
  useMemo,
  Fragment,
  useState,
  useEffect,
} from 'react';
import { findDOMNode } from "react-dom";
import { Table } from 'antd';
// 2 维数组渲染数据

const FIRST_APPEND_NUM = 10;
const PAGE_HEIGHT = 1060;
const PAGINATION_HEIGHT = 30;

const useStateHook = (props) => {
  const [list, setList] = useState([[]]);

  // 计算样式
  const style = useMemo(() => {
    const setting = {};
    props.params.padding && (setting.padding = `${props.params.padding}px`);
    return setting;
  }, [props.params]);
  /**
   * 显示标题
   * @param {Number} current 当前页
   * @return {Boolean}
   */
  const showTitle = (current) => {
    const { alwaysShowTitle, title } = props;
    // 1. 为给定 title 则返回 false
    if (!title){return false;}
    // 2. 需要每页都显示 title 或者当前页为第一页则返回 true
    if (alwaysShowTitle || current === 1){return true;}
    return false;
  };

  /**
   * 是否显示打印页头
   * @param {Number} current 当前页
   * @return {Boolean}
   */
  const showPageHeader = (current) => {
    const { alwaysShowPageHeader, pageHeader } = props;
    // 1. 未给定 pageHeader 则返回 false
    if (!pageHeader){return false;}
    // 2. 需要每页都显示 pageHeader 或者当前页为第一页则返回 true
    if (alwaysShowPageHeader || current === 1){return true;}
    return false;
  };

  /**
   * 是否显示打印页脚
   * @param {Number} current 当前页
   * @return {Boolean}
   */
  const showPageFooter = (current) => {
    const { alwaysShowPageFooter, pageFooter } = props;
    // 1. 未给定 pageFooter 则返回 false
    if (!pageFooter){return false;}
    // 2. 需要每页都显示 pageFooter 或者当前页为最后一页则返回 true
    if (alwaysShowPageFooter || current === list.length){return true;}
    return false;
  };

  // 计算高度
  const calculatedHeight = () => {
    const rows = document.querySelectorAll('.kant-print-hidden .ant-table-row');
    const tableHeader = document.querySelectorAll('.kant-print-hidden .ant-table-thead')[0];
    const title = document.querySelectorAll('.kant-print-hidden .kant-print-title')[0];
    const header = document.querySelectorAll('.kant-print-hidden .kant-print-header')[0];
    const footer = document.querySelectorAll('.kant-print-hidden .kant-print-footer')[0];
    const data = {
      rows: [],
      title: title.offsetHeight,
      header: header.offsetHeight,
      footer: footer.offsetHeight,
      tableHeader: tableHeader.offsetHeight,
    };
    rows.forEach(v => { data.rows.push(v.offsetHeight);});
    return data;
  };

  // 获取表格内容块高度
  const getTableBodyHeight = (current) => {
    const { padding = 0 } = props.params;
    const { tableHeader, title, header, footer } = calculatedHeight();
    let height = PAGE_HEIGHT - tableHeader - 2 * padding;
    showTitle(current) && (height -= title);
    showPageHeader(current) && (height -= header);
    showPageFooter(current) && (height -= footer);
    props.showPagination && (height -= PAGINATION_HEIGHT);
    return height;
  };

  // 数据处理
  const handlerData = () => {
    let tem = 0;
    const data = [[]];
    const { rows } = calculatedHeight();
    props.dataSource.forEach( (item, index) => {
      if (tem + rows[index] > getTableBodyHeight(data.length)){
        tem = rows[index] + 0;
        data.push([item]);
      } else {
        tem += rows[index];
        data[data.length - 1].push(item);
      }
    });
    setList(data);
  };

  useEffect(() => {
    handlerData();
  }, [props.params]);

  return { list, style, showTitle, showPageHeader, showPageFooter };
};

export default (props) => {
  const state = useStateHook(props);

  return (
    <Fragment>
      {
        state.list.map( (item, index) => (
          <div
            key={index}
            style={state.style}
            className="kant-print-page"
            ref={state.list .length === index + 1 ? state.lastPageRef : null}
          >
            <div className="kant-print-page-content">
              <div className="kant-print-page-content-title">
                {state.showTitle(index + 1) ? props.title : null}
              </div>
              <div className="kant-print-page-content-header">
                {state.showPageHeader(index + 1) ? props.pageHeader : null}
              </div>
              <Table
                rowKey="key"
                pagination={false}
                dataSource={item}
                columns={props.columns || []}
              />
              <div className="kant-print-page-content-footer">
                {state.showPageFooter(index + 1) ? props.pageFooter : null}
              </div>
              <div className="kant-print-page-num">
                { props.showPagination ? `${index + 1} / ${state.list.length}` : null }
              </div>
            </div>
          </div>
        ))
      }
      <div className="kant-print-hidden">
        <Table
          rowKey="key"
          pagination={false}
          dataSource={props.dataSource}
          columns={props.columns || []}
        />
        <div className="kant-print-title">
          {props.title}
        </div>
        <div className="kant-print-header">
          {props.pageHeader}
        </div>
        <div className="kant-print-footer">
          {props.pageFooter}
        </div>
      </div>
    </Fragment>
  );
};
