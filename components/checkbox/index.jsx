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
 * @param {object} Props
 * @see {@link https://ant.design/components/checkbox-cn/#API 更多多选框参数参照antd官网}
 */
const Checkbox = (props) => {
  const filterArr = [];
  const otherProps =  omit(props, filterArr);
  return (
    <AntCheckbox
      {...otherProps}
    />
  );
};

Checkbox.Group = AntCheckbox.Group;

export default Checkbox;
