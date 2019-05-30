import React, { useState, useEffect } from "react";
import { Icon } from 'antd';
import PropTypes from "prop-types";

/**
 * 图片预览组件
 * @param {object}  props
 * @param {array}   [props.imgList]           图片url数组 
 * @param {bool}    [props.visible='false']   是否显示
 * @param {func}    [props.onClose]           点击关闭事件
 * @param {number}  [props.currentImg]        首次显示图片在数组中index
 */
const ImagePreviewer = (props) => {
  const {
    imgList,
    visible,
    onClose,
    currentImg  
  } = props;

  // size.width: 当前播放图片实际width, size.height: 当前播放图片实际height
  const [size, setSize] = useState({width: 100, height: 100});
  // margin: 图片容器样式margin-left、margin-top属性，控制图片默认居中
  const [margin, setMargin] = useState({left: 0, top: 0});
  // zoomRate: 图片缩放比例，控制缩放
  const [zoomRate, setZoomRate] = useState(1);
  // imgIndex: 显示图片在imgList中index
  const [imgIndex, setImgIndex] = useState(currentImg);
  // mouseUp：拖拽图片控制参数，左键是否按下
  const [mouseUp, setMouseUp] = useState(true);
  // mouseX，mouseY：拖拽时，左键KeyDown时坐标
  const [mouseX, setMouseX] = useState();
  const [mouseY, setMouseY] = useState();

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

    // 图片加载完成，居中显示
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      let zoom = 100;
      zoom = (pageHeight/height)<(pageWidth/width)? (pageHeight/height): (pageWidth/width);
      zoom = Math.ceil(zoom * 100);
      zoom = zoom < 100 ? zoom: 100;
      setZoomRate(zoom/100);
      setSize({width: width, height: height});
      setMargin({left: width * zoom/-200, top: height * zoom/-200});
    };

  };

  // 上一张图片 
  const prev = () => {
    let index = (imgIndex + imgList.length - 1) % imgList.length;
    setImgIndex(index);
  };

  // 下一张图片
  const next = () => {
    let index = (imgIndex + 1) % imgList.length;
    setImgIndex(index);
  };

  // 图片相对实际尺寸放大10%
  const zoomIn = () => {
    setZoomRate(zoomRate + 0.1);
    setMargin(
      {left: margin.left + size.width * 0.1 / -2, top: margin.top + size.height * 0.1 / -2}
    );
  };

  // 图片相对实际尺寸缩小10%
  const zoomOut = () => {
    if(zoomRate <= 0.1) {
      return;
    }
    setZoomRate(zoomRate - 0.1);
    setMargin(
      {left: margin.left - size.width * 0.1 / -2, top: margin.top - size.height * 0.1 / -2}
    );
  };

  // 滚轮缩放
  const handleWheel = (e) =>{
    e.stopPropagation();
    if(e.deltaY > 0) {
      zoomOut();
    } 
    else if(e.deltaY < 0) {
      zoomIn();
    }
  };

  // 鼠标左键KeyDowm事件
  const dragDown = (e) => {
    let event = e || window.event;
    event.preventDefault();
    setMouseX(event.clientX);
    setMouseY(event.clientY);
    setMouseUp(false);
  };

  // 鼠标移动事件
  const dragMove = (e) => {
    let event = e || window.event;
    event.preventDefault();
    if(mouseUp === true) {
      return;
    }
    setMouseX(event.clientX);
    setMouseY(event.clientY);
    let leftOffset = event.clientX - mouseX;
    let topOffset = event.clientY - mouseY;
    setMargin({left: margin.left +leftOffset, top: margin.top + topOffset});
  };

  // 鼠标左键KeyUp事件
  const dragUp = () => {
    setMouseUp(true);
  };

  useEffect(()=>{
    changImg(imgIndex);
  },[imgIndex,imgList]);
  
  return(
    <div>
      <div 
        className = {`em-image-previewer-mask${visible === true? '': '-none'}`}
        onWheel = {handleWheel}>
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
            onMouseDown = {dragDown}
            onMouseMove = {dragMove}
            onMouseUp = {dragUp}
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

ImagePreviewer.propTypes = {
  imgList: PropTypes.array,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  currentImg: PropTypes.number,
};

ImagePreviewer.defaultProps = {
  visible: false,
  currentImg: 0,
};

export default ImagePreviewer;