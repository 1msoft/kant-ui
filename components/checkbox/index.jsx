/**
 * 多选框
 * @author dxl
 * @module Checkbox
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Checkbox as AntCheckbox  } from 'antd';
import omit from 'omit.js';
import _ from 'lodash';

/**
 * @param {Object} props
 * @param {Object}  ref      自动接收表单校验的ref
 * @returns {ReactComponent} 多选框
 * @see {@link https://ant.design/components/checkbox-cn/#API 更多多选框参数参照antd官网}
 */
let Checkbox = (props, ref) => {
  const filterArr = [];
  const otherProps =  omit(props, filterArr);
  return (
    <span className="kant-checkbox-content" ref={ref}>
      <AntCheckbox
        {...otherProps}
      />
    </span>
  );
};

Checkbox = React.forwardRef(Checkbox);

Checkbox.Group = AntCheckbox.Group;

export default Checkbox;
