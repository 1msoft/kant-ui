/**
 * 表格组件
 * @author jfj
 * @module Table
 */
import React, { useEffect, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Table as AntTable, Button, LocaleProvider } from 'antd';
import { Resizable } from 'react-resizable';
import zhCN from 'antd/es/locale-provider/zh_CN';

import omit from 'omit.js';
import _ from 'lodash';
import classNames from 'classnames';

const setPrecision = (num, precision) => _.round(num, precision).toFixed(precision);

const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

const getComponents = (props) => {
  const components = {};

  if (props.resizable) {
    components.header = {};
    components.header.cell = ResizeableTitle;
  }

  return components;
};

const getWrapperClassName = (props) => classNames(
  'kant-table',
  props.wrapperClassName,
);

const useTableState = (props) => {
  const reducer = (state, action) => {
    const { type, size, index } = action;
    switch(type) {
      case 'initial':
        return state.map((col) => {
          if (col.render) return col;

          col.render = (text, record, index) => {
            if (col.format) {
              text = col.format(text, record, index);
            }

            col.precision && (text = setPrecision(text, col.precision));

            text = `${col.prefix || ''} ${text} ${col.suffix || ''}`.trim();
            return (
              <span>{text}</span>
            );
          };
          return col;
        });
      case 'function':
        return state.map((col, index) => {
          const patch = {};
          if (props.resizable) {
            patch.onHeaderCell = column => ({
              width: column.width,
              onResize: onResize(index),
            });
          }
          return { ...col, ...patch };
        });
      case 'resizable':
        const nextState = [...state];
        nextState[index] = {
          ...nextState[index],
          width: size.width,
        };
        return nextState;
      default:
        break;
    }
  };
  const [columns, dispatch] = useReducer(reducer, props.columns);
  /**
   * 列宽调整
   * @param {Number} index 当前调整索引位置
   * @returns {Function}
   */
  function onResize(index) {
    return (e, { size }) => {
      dispatch({ type: 'resizable', size, index });
    };
  };

  useEffect(() => {
    dispatch({ type: 'initial' });
    dispatch({ type: 'function' });
  }, []);

  const dataSource = useMemo(() => {
    return props.dataSource;
  }, [props.dataSource]);

  return {
    columns,
    dataSource,
  };
};

const usePagination = (props) => {
  if (!props) return false;

  const showTotal = (total, range) => {
    if (props.showTotal && _.isFunction(props.showTotal)) {
      return props.showTotal(total, range);
    }
    return `当前 ${range[0]} - ${range[1]} 总共 ${total} 条`;
  };

  const showQuickJumper = {
    goButton: <Button size="large" style={{ marginLeft: '6px' }}>确定</Button>
  };

  return {
    showTotal,
    showQuickJumper,
    showSizeChanger: true,
    ...props,
  };
};

/**
 * Table
 * @param {Object} props 配置参数
 * @param {Object|Boolean} [props.pagination] 表格分页
 * @param {Boolean} [props.resizable] 可伸缩列
 * @param {Object[]} props.columns   表格列配置项
 * @param {Object[]} props.dataSource 表格数据源
 * @param {Boolean} [props.bordered]  实现显示边框
 * @returns {ReactComponent} TableComponent
 */
const Table = (props) => {
  const state = useTableState(props);
  const pagination = usePagination(props.pagination);

  const otherProps = omit(
    props,
    [
      'columns',
      'resizable',
      'pagination',
      'dataSource',
      'wrapperClassName',
    ]
  );

  return (
    <LocaleProvider locale={zhCN}>
      <div className={getWrapperClassName(props)}>
        <AntTable
          components={getComponents(props)}
          {...otherProps}
          {...state}
          pagination={pagination}
        />
      </div>
    </LocaleProvider>
  );
};

Table.propTypes = {
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  resizable: PropTypes.bool,
};

Table.defaultProps = {
  pagination: {
    defaultCurrent: 1,
    defaultPageSize: 10,
    total: 0,
  },
  resizable: false,
};

export default Table;
