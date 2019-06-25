const fs = require('fs');
const path = require('path');

const contentParse=`\n## $1
    \n<details><summary>展开查看</summary>
    \n\`\`\`jsx\n$2\n\`\`\`
    \n</details>\n`;

/**
 * 解析文件内容
 * @param {String} resourcePath 目标文件路径
 * @param {String} source 源文件内容
 * @returns {String} 返回 markdow 内容
 */
const parseContent = (resourcePath, source) => {
  if (!resourcePath || !source){return false;}
  const extname = path.extname(resourcePath);
  let content = '';
  if (/stories\/pages/.test(resourcePath) || extname === '.jsx'){
    const signDatas = source.match(/\/\/\s*demo([.\s\S]*?)\/\/\s*end-demo/g);
    signDatas && signDatas.forEach(item => {
      content += item.replace(
        /\/\/\s*demo\s*:\s*(.*)[\t\n\x0B\f\r]*([.\s\S]*?)\/\/\s*?end-demo/,
        contentParse
      );
    });
  }
  return content;
};

/**
 * 创建 markdown 文档
 * @param {String} resourcePath 目标文件路径
 * @param {String} content 写入文件内容
 * @return {undefined}
 */
const createMd = (resourcePath, content) => {
  if (!resourcePath || !content){return false;}
  const dest = resourcePath.replace(/\.jsx$/, '.md');
  try {
    fs.writeFileSync(dest, content, 'utf-8');
  } catch(e){
    console.warn(`创建 markdown 文档失败！ dest: ${dest}, \n content: ${content}`);
  }
};


module.exports = function(source, map) {
  const content = parseContent(this.resourcePath, source);
  createMd(this.resourcePath, content);
  return source;
};
