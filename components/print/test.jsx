import * as React from "react";
import { findDOMNode } from "react-dom";

export default class ReactToPrint extends React.Component {
  removeWindow = (target) => {
    setTimeout(() => {
      target.parentNode.removeChild(target);
    }, 500);
  };

  triggerPrint = (target) => {
    const { onBeforePrint, onAfterPrint } = this.props;

    if (onBeforePrint) {
      onBeforePrint();
    }

    setTimeout(() => {
      target.contentWindow.focus();
      target.contentWindow.print();
      this.removeWindow(target);

      if (onAfterPrint) {
        onAfterPrint();
      }
    }, 500);
  };

  handlePrint = () => {
    const {
      bodyClass = "",
      content,
      copyStyles = true,
      pageStyle,
    } = this.props;

    const contentEl = content();

    const printWindow = document.createElement("iframe");
    printWindow.style.position = "absolute";
    printWindow.style.top = "-1000px";
    printWindow.style.left = "-1000px";

    const contentNodes = findDOMNode(contentEl);
    const linkNodes = document.querySelectorAll("link[rel='stylesheet']");

    this.linkTotal = linkNodes.length || 0;
    this.linksLoaded = [];
    this.linksErrored = [];

    const markLoaded = (linkNode, loaded) => {
      if (loaded) {
        this.linksLoaded.push(linkNode);
      } else {
        console.error(`"react-to-print" was unable to load a link. It may be invalid. "react-to-print" will continue attempting to print the page. The link the errored was:`, linkNode);
        this.linksErrored.push(linkNode);
      }

      if (this.linksLoaded.length + this.linksErrored.length === this.linkTotal) {
        this.triggerPrint(printWindow);
      }
    };

    printWindow.onload = () => {
      // if (window.navigator && window.navigator.userAgent.indexOf("Trident/7.0") > -1) {
      //   printWindow.onload = null;
      // }

      // 获取打印文档（document）
      const domDoc = printWindow.contentDocument || printWindow.contentWindow.document;
      const srcCanvasEls = (contentNodes).querySelectorAll("canvas");

      // . 写入内容
      domDoc.open();
      domDoc.write(contentNodes.outerHTML);
      domDoc.close();

      // 打印页面样式
      const defaultPageStyle = pageStyle === undefined
        ? "@page { size: auto;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }"
        : pageStyle;

      // 写入打印页面样式
      const styleEl = domDoc.createElement("style");
      styleEl.appendChild(domDoc.createTextNode(defaultPageStyle));
      domDoc.head.appendChild(styleEl);

      // 写入 body class
      if (bodyClass.length) {
        domDoc.body.classList.add(bodyClass);
      }

      // 处理 canvas
      const canvasEls = domDoc.querySelectorAll("canvas");
      for (let index = 0, l = canvasEls.length; index < l; ++index) {
        const node = canvasEls[index];
        node.getContext("2d").drawImage(srcCanvasEls[index], 0, 0);
      }

      // 拷贝样式
      if (copyStyles !== false) {
        const headEls = document.querySelectorAll("style, link[rel='stylesheet']");

        for (let index = 0, l = headEls.length; index < l; ++index) {
          const node = headEls[index];
          if (node.tagName === "STYLE") {
            const newHeadEl = domDoc.createElement(node.tagName);
            const sheet = (node).sheet;

            if (sheet) {
              let styleCSS = "";
              for (let i = 0; i < sheet.cssRules.length; i++) {
                if (typeof sheet.cssRules[i].cssText === "string") {
                  styleCSS += `${sheet.cssRules[i].cssText}\r\n`;
                }
              }
              newHeadEl.setAttribute("id", `react-to-print-${index}`);
              newHeadEl.appendChild(domDoc.createTextNode(styleCSS));
              domDoc.head.appendChild(newHeadEl);
            }
          } else {
            if (node.hasAttribute("href") && !!node.getAttribute("href")) {
              const newHeadEl = domDoc.createElement(node.tagName);

              // node.attributes has NamedNodeMap type that not Array and can be iterated only via direct [i] access
              for (let i = 0, l = node.attributes.length; i < l; ++i) {
                const attr = node.attributes[i];
                newHeadEl.setAttribute(attr.nodeName, attr.nodeValue);
              }

              newHeadEl.onload = markLoaded.bind(null, newHeadEl, true);
              newHeadEl.onerror = markLoaded.bind(null, newHeadEl, false);
              domDoc.head.appendChild(newHeadEl);
            } else {
              console.warn(`"react-to-print" encountered a <link> tag with an empty "href" attribute. In addition to being invalid HTML, this can cause problems in many browsers, and so the <link> was not loaded. The <link> is:`, node); // eslint-disable-line no-console
              markLoaded(node, true); // `true` because we"ve already shown a warning for this
            }
          }
        }
      }

      // 如果原 document 上 link 标签为 0 或者 copyStyles === false 则直接处理打印
      if (this.linkTotal === 0 || copyStyles === false) {
        this.triggerPrint(printWindow);
      }
    };

    // 将 printWindow 添加到原 dom
    document.body.appendChild(printWindow);
  };

  setRef = (ref) => {
    this.triggerRef = ref;
  };

  render() {
    const { trigger } = this.props;

    return React.cloneElement(trigger(), {
      onClick: this.handlePrint,
      ref: this.setRef,
    });
  }
}
