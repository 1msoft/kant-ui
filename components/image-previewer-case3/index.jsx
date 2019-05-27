import React, { useState, useEffect } from "react";
import { Icon } from 'antd';
import PropTypes from "prop-types";

const ImagePreviewer = (props) => {
  const {
    imgList,
    visible,
    onClose,
    currentImg,
    ...remain
  } = props;

  // size.width 当前播放图片实际width, size.height 当前播放图片实际height
  const [size, setSize] = useState({width: 100, height: 100});
  // margin 图片容器样式margin-left、margin-top属性，控制图片默认居中
  const [margin, setMargin] = useState({left: 0, top: 0});
  // zoomRate 图片缩放比例，控制缩放
  const [zoomRate, setZoomRate] = useState(1);
  const [imgIndex, setImgIndex] = useState(currentImg);

  // 图片切换
  const changImg = (index) => {
    setImgIndex((index > 0 && index < imgList.length)? index: 0);
    let img = new Image();
    img.src = imgList[imgIndex];

    let pageWidth = window.innerWidth
          || document.documentElement.clientWidth
          || document.body.clientWidth;
    let pageHeight = window.innerHeight
          || document.documentElement.clientHeight
          || document.body.clientHeight;

    let width = img.width;
    let height = img.height;

    let zoom = 100;
    zoom = (pageHeight/height)<(pageWidth/width)? (pageHeight/height): (pageWidth/width);
    zoom = Math.ceil(zoom * 100);
    zoom = zoom < 100 ? zoom: 100;
    setZoomRate(zoom/100);
    setSize({width: width, height: height});
    setMargin({left: width * zoomRate/-2, top: height * zoomRate/-2});

  };

  // 上一张图片 
  const prev = () => {
    setZoomRate(1);
    let index = (imgIndex + imgList.length - 1) % imgList.length;
    setImgIndex(index);
  };

  // 下一张图片
  const next = () => {
    setZoomRate(1);
    let index = (imgIndex + 1) % imgList.length;
    setImgIndex(index);
  };

  // 图片相对实际尺寸放大10%
  const zoomIn = () => {
    setZoomRate(zoomRate + 0.1);
    setMargin({left: size.width * zoomRate/-2, top: size.height * zoomRate/-2});
  };

  // 图片相对实际尺寸缩小10%
  const zoomOut = () => {
    setZoomRate(zoomRate - 0.1);
    setMargin({left: size.width * zoomRate/-2, top: size.height * zoomRate/-2});
  };

  const handleKeydowm = (e) =>{
    e.stopPropagation();
    if(e.deltaY > 0) {
      zoomOut();
    } 
    else if(e.deltaY < 0) {
      zoomIn();
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    console.log(e.type);
    console.log("drag:",e.screenX,e.screenY);
  };

  useEffect(()=>{
    changImg(imgIndex);
  },[imgIndex,imgList]);
  
  return(
    <div>
      <div 
        className = {`em-image-previewer-mask${visible === true? '': '-none'}`}
        onWheel = {handleKeydowm}>
        <div 
          className = {'em-image-previewer-header'}>
        </div>
        <span className = {'em-image-previewer-quit'}
          onClick = {onClose}>
          <Icon type="close" />
        </span>
        <div 
          className = {'em-image-previewer-body'}>
          <div 
            className = {'em-image-previewer-container'} 
            onDragStart = {handleDrag}
            style = {{
              width: size.width * zoomRate, 
              height: size.height * zoomRate, 
              marginLeft: margin.left, 
              marginTop: margin.top}}>
            <img 
              className = {'em-image-previewer-img'} 
              src = {imgList[imgIndex]} 
              alt = {'图片读取错误！'} />
          </div>
          <div 
            className = {'em-image-previewer-prev'}
            onClick = {prev}>
            <Icon type = "left"/>
          </div>
          <div 
            className = {'em-image-previewer-next'}
            onClick = {next}>
            <Icon type = "right"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewer;