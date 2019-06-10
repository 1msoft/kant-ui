import React, { useState } from "react";
import { Divider, Button, Checkbox, Radio } from "antd";
import { ImagePreviewer } from "@components/index";
import "@components/image-previewer/style";

const urlList = [
  "http://5b0988e595225.cdn.sohucs.com/images/20180504/cc178a20314c4d409dbee7b5419d796c.jpeg",
  "http://5b0988e595225.cdn.sohucs.com/images/20180504/b7fb9af7621941988212f625be138947.jpeg",
  "http://5b0988e595225.cdn.sohucs.com/images/20180504/6e7648285fb2424f9034b0f455bff6c0.jpeg"
];

const list = urlList.map((value, index) => ({ title: `第${index + 1}张图片`, url: value }));


const UseBase = () => {
  const [visible, setVisible] = useState(false);
  const [imgList, setImgList] = useState(list);
  const [loop, setLoop] = useState(false);
  const [type, setType] = useState('lite');
  return (
    <div style={{ margin: 30 }}>

      <ImagePreviewer
        imgList={imgList}
        visible={visible}
        loop={loop}
        controlBar = {type}
        onClose={() => { setVisible(false); }} />

      <Checkbox 
        checked = {loop}
        onChange = {(e) => {
          setLoop(e.target.checked);
        }}>是否循环播放</Checkbox>
      <Divider />

      <Radio.Group value={type} onChange={(e) => {
        setType(e.target.value);
        console.log(e.target.value);
      }}>
        <Radio.Button value="none">none不显示</Radio.Button>
        <Radio.Button value="lite">lite</Radio.Button>
        <Radio.Button value="normal">normal</Radio.Button>
      </Radio.Group>

      <Divider />

      <Button onClick={() => { setVisible(true); }}>显示预览</Button>

      <Divider />
      
      <input type="file" accept={"image/*"} multiple={"multiple"}
        onChange={(e) => {
          let list = [];
          for (let i = 0; i < e.target.files.length; i++) {
            list.push({ title: i + 1, url: URL.createObjectURL(e.target.files[i]) });
          };
          setImgList(list);
          setVisible(list.length > 0 ? true : false);
        }}>
      </input>

      <Divider />
    </div>
  );
};


export default () => (
  <UseBase />
);

