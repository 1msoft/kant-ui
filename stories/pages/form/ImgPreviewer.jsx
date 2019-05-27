import React, { useState } from "react";
import { Divider, Button } from "antd";
import { ImagePreviewer } from "@components/index";
import '@components/image-previewer-case3/style';


const urlList = [
  "http://5b0988e595225.cdn.sohucs.com/images/20180504/cc178a20314c4d409dbee7b5419d796c.jpeg",
  "http://5b0988e595225.cdn.sohucs.com/images/20180504/b7fb9af7621941988212f625be138947.jpeg",
  "http://5b0988e595225.cdn.sohucs.com/images/20180504/6e7648285fb2424f9034b0f455bff6c0.jpeg"
];

const list = {url: urlList};


const UseBase = () => {
  const [visible, setVisible] = useState(false);
  const [imgList, setImgList ] = useState(urlList)
  return(
    <div style={{ margin: 30 }}>
 
      <ImagePreviewer
        imgList = {imgList}
        visible = {visible}
        onClose = {() => {setVisible(false)}}/>

      <Button onClick = {() => {setVisible(true)}}>显示预览</Button>
      <Divider/>
      <input type = "file" accept = {"image/*"}  multiple={"multiple"} 
        onChange = {(e)=>{
          let list = [];
          for(let i = 0; i < e.target.files.length; i++){
            list.push(URL.createObjectURL(e.target.files[i]));
          };
          setImgList(list);
          setVisible(list.length > 0 ? true: false);
        }}>
      </input>
      <Divider/>
      {/* <PreviewPictures
        fileList = {list}
      >
      </PreviewPictures> */}
    </div>
  );
};


export default () => (
  <UseBase/>
);

