import React, { useEffect, useMemo } from 'react';
import { findDOMNode } from "react-dom";

// 设置预览内容
const seInnerHTML = ({ props }) => {
  if (!props.content.current){return false;}
  const wrapper = document.querySelectorAll('.kant-print-custom-content')[0];
  const content = findDOMNode(props.content.current).outerHTML;
  wrapper && (wrapper.innerHTML = content);
};

const useStateHook = (props) => {
  // 计算样式
  const style = useMemo(() => {
    const setting = {};
    props.params.padding && (setting.padding = `${props.params.padding}px`);
    return setting;
  }, [props.params]);

  useEffect(() => {
    seInnerHTML({ props });
  }, []);
  return { style };
};

export default (props) => {
  const state = useStateHook(props);
  return (
    <div className="kant-print-custom-content" style={state.style}>
      {!props.content.current ? props.content : null}
    </div>
  );
};
