import React, { useEffect, useState, useRef, useMemo } from 'react';
import { findDOMNode } from "react-dom";
import { Table } from 'antd';
// 2 维数组渲染数据

const FIRST_APPEND_NUM = 10;

// 设置预览内容
const seInnerHTML = ({ props }) => {

};

const useStateHook = (props) => {
  const dataSource = useMemo(() => ([...props.table.dataSource]), [props.params]);
  const [list, setList] = useState([]);
  const lastPageRef = useRef();

  // 计算样式
  const style = useMemo(() => {
    const setting = {};
    props.params.margin && (setting.padding = `${props.params.margin}mm`);
    return setting;
  }, [props.params]);

  // 追加
  const appendList = () => {
    if (dataSource.length === 0){return false;}
    console.log('========================================');
    const { clientHeight, scrollHeight } =  (lastPageRef || {}).current || {};
    const reset = list.length !== 0 ? [...list] : [[]];

    // 1. 如果溢出则进行特殊处理
    if (scrollHeight > clientHeight){
      const remove = reset[reset.length - 1].pop();
      reset.push([remove]);
    }
    // 2 判断是否是第一次处理
    if (reset[reset.length - 1].length < FIRST_APPEND_NUM){
      // 2.1 第一次添加采取批量添加
      const data = dataSource.splice(0, FIRST_APPEND_NUM);
      reset[reset.length - 1] = reset[reset.length - 1].concat(data);
    } else {
      // 2.1 通常时候采取单条添加
      const data = dataSource.splice(0, 1);
      reset[reset.length - 1] = reset[reset.length - 1].concat(data);
    }
    setList(reset);
  };

  useEffect(() => {
    appendList();
  }, [list]);

  useEffect(() => {
    setList([]);
  }, [props.params]);

  return { list, lastPageRef, style };
};

export default (props) => {
  const state = useStateHook(props);
  return (
    <div className="kant-print-table-list">
      {
        state.list.map( (item, index) => (
          <div
            style={state.style}
            className="kant-print-page"
            ref={state.list .length === index + 1 ? state.lastPageRef : null}
            >
            <Table
              dataSource={item}
              pagination={false}
              columns={props.table.columns || []}
            />
          </div>
        ))
      }
    </div>
  );
};
