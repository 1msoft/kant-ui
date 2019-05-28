/**
 * 上下文 全局配置
 * @author kjx
 * @module Context
 */
import React from 'react';
import PropTypes from "prop-types";

const config = {
  theme: 'box',
};

const Context = React.createContext(config);

Context.Provider.propTypes = {
  value: PropTypes.shape({
    theme: PropTypes.oneOf(["box", "underline"]),
  }),
};

export default Context;
