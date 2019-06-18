// props.content, props.pageStyle, props.bodyClass
import React, { useEffect, useRef, useState } from 'react';
import { findDOMNode, render } from "react-dom";
import { Drawer, Button, Input } from 'antd';
import { Form } from '..';
const { FormLayout, FormItem } = Form;
import './style';

// 设置页面样式
const setPageStyle = ({ printDoc, pageStyle }) => {
  const defaultPageStyle = `
  @page {
    size: auto;
    margin: 0mm;
  }
  @media print {
    body { -webkit-print-color-adjust: exact; }
  }`;
  const styleEl = printDoc.createElement("style");
  styleEl.appendChild(printDoc.createTextNode(pageStyle || defaultPageStyle));
  printDoc.head.appendChild(styleEl);
};

// 拷贝样式
const copyStyles = ({ printDoc }) => {
  const headEls = document.querySelectorAll("style, link[rel='stylesheet']");
  for (let index = 0, l = headEls.length; index < l; ++index) {
    const node = headEls[index];
    if (node.tagName === "STYLE") {
      const newHeadEl = printDoc.createElement(node.tagName);
      const sheet = (node).sheet;
      if (sheet) {
        let styleCSS = "";
        for (let i = 0; i < sheet.cssRules.length; i++) {
          if (typeof sheet.cssRules[i].cssText === "string") {
            styleCSS += `${sheet.cssRules[i].cssText}\r\n`;
          }
        }
        newHeadEl.setAttribute("id", `kant-print-${index}`);
        newHeadEl.appendChild(printDoc.createTextNode(styleCSS));
        printDoc.head.appendChild(newHeadEl);
      }
    } else {
      if (node.hasAttribute("href") && !!node.getAttribute("href")) {
        const newHeadEl = printDoc.createElement(node.tagName);
        for (let i = 0, l = node.attributes.length; i < l; ++i) {
          const attr = node.attributes[i];
          newHeadEl.setAttribute(attr.nodeName, attr.nodeValue);
        }
        printDoc.head.appendChild(newHeadEl);
      } else {
        console.warn(`
          kant-print encountered a <link> tag with an empty "href" attribute.
          In addition to being invalid HTML, this can cause problems in many browsers,
          and so the <link> was not loaded. The <link> is:
        `, node); // eslint-disable-line no-console
      }
    }
  }
};

// Iframe 写入内容
const writerWithIframe = ({ printDoc, content }) => {
  const contentNodes = findDOMNode(content.current || content);
  printDoc.open();
  printDoc.write(`<div class="kant-print-page">${contentNodes.outerHTML}</div>`);
  printDoc.close();
};

// 设置 body className
const setBodyClassName = ({ printDoc, bodyClass }) => {
  printDoc.body.classList.add('kant-print-iframe', bodyClass);
};

// 重置高度
const resetIframeHeight = ({ printWindow, printDoc }) => {
  const { scrollHeight: height } = printDoc.querySelectorAll('.kant-print-iframe')[0];
  printWindow.style.height = `${height}px`;
};

// 创建 Iframe return iframeDom
const createIframe = ({ iframeRef, props }) => {
  if (!iframeRef || !iframeRef.current){return false;}
  const { content, pageStyle, bodyClass } = props;
  const printWindow = iframeRef.current;
  const printDoc = printWindow.contentDocument || printWindow.contentWindow.document;
  writerWithIframe({ printDoc, content });
  setBodyClassName({ printDoc, bodyClass });
  setPageStyle({ printDoc, pageStyle: props.pageStyle });
  copyStyles({ printDoc });
  resetIframeHeight({ printWindow, printDoc });
};

const useStateHook = (props) => {
  const [show, setShow] = useState(false);
  const iframeRef = useRef();

  // 关闭打印页
  const onClose = () => {
    setShow(false);
  };

  // 打开打印页
  const onOpen = () => {
    setShow(true);
  };

  const onPrint = () => {
    iframeRef.current.contentWindow.focus();
    iframeRef.current.contentWindow.print();
  };

  useEffect(() => {
    createIframe({ iframeRef, props });
  }, [show]);

  return { show, onOpen, onClose, iframeRef, onPrint };
};

let Print = (props) => {
  const state = useStateHook(props);

  return (
    <div>
      <Drawer
        width="100%"
        visible={state.show}
        onClose={state.onClose}
        bodyStyle={{ padding: 0 }}
      >
        <div className="kant-print-preview">
          <div className="kant-print-preview-view">
            <iframe
              frameBorder="0"
              scrolling="no"
              ref={state.iframeRef}
              style={{ width: '100%' }}
            />
          </div>
          <div className="kant-print-preview-tool">
            <FormLayout colon={true} inlineLabel={true}>
              <FormItem row={1} span={12} label="边距">
                <Input placeholder="边距" style={{ width: '100%' }}/>
              </FormItem>
              <FormItem row={1} span={12}>
                <Button size="large" onClick={state.onPrint}>打印</Button>
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
