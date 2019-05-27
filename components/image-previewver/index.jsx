import React, { useState, useRef } from "react";
import { Modal, Carousel, Icon } from 'antd';
import PropTypes from "prop-types";

const ImagePreviewer = (props) => {
  const {
    imgList,
    title,
    visible,
    minWidth,
    maxWidth,
    onCancel,
    ...remain
  } = props;

  const imgRef = useRef(null);
  

  const getImgWidth = (src) => {
    let img = new Image();
    img.src = src;
    return img.width;
  } ;

  const [width, setWidth] = useState(getImgWidth(imgList[0]));

  const onChange = (before,after) => {
    let width = getImgWidth(imgList[after]);
    setWidth(width);
  };

  return(
    <Modal 
      title = {title}
      visible={visible}
      footer={<ImagePreviewerFooter getRef={imgRef}/>}
      destroyOnClose = {true}
      onCancel = {onCancel}
      width = {width > minWidth ? width: minWidth}
      
    >
      <div>
        <Carousel
          ref = {imgRef}
          imgList = {imgList}
          beforeChange = {onChange}
          effect = {'fade'}
        >
          {imgList.map((img,i) =>{
            return (
              <div key = {i} >  
                <img src = {img} alt = {img} width = {'100%'}/>
              </div>
            )
          })
          }
        </Carousel>
      </div>
    </Modal>
  );
};

const ImagePreviewerFooter = (prors) => {
  const {
    getRef
  } = prors;

  const prev = () => {
    getRef.current.prev();
  };

  const next = () => {
    getRef.current.next();
  };

  return(
    <div style = {{textAlign: 'center'}}>
      <Icon type="left" onClick = {prev}></Icon>
      
      <Icon type="right" onClick = {next}></Icon>
    </div>
  );

};

ImagePreviewer.propTypes = {
  title: PropTypes.string
};

ImagePreviewer.defaultProps = {
  title: '预览',
  minWidth: 400
}
export default ImagePreviewer;