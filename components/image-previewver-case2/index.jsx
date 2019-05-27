import React, { useState, useRef } from "react";
import { Modal, Carousel, Icon } from 'antd';
import PropTypes from "prop-types";

const ImagePreviewer = (props) => {
  const {
    imgList,
    title,
    visible,
    footer,
    onCancel,

  } = props;

  const getImgWidth = (src) => {
    let img = new Image();
    img.src = src;
    return img.width;
  };

  const renderImage = (imgList) => 
    imgList.map((img, i) => {
      return(
        <div key = {i}>
          <img src = {img} alt = {img} /> 
        </div>  
      );
    });


  return(
    <React.Fragment>
      <Modal
        title = {title}
        visible = {visible}
        footer = {footer}
        destroyOnClose = {true}
        onCancel = {onCancel}>
        
        <div width = {600} height = {500}></div>
      </Modal>
    </React.Fragment>
  ); 

};

ImagePreviewer.propTypes = {
  title: PropTypes.string
};
  
ImagePreviewer.defaultProps = {
  title: '预览',

}

export default ImagePreviewer;