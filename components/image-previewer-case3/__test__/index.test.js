import React from 'react';
import Enzyme from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import ImagePreviewer from '../index.jsx';

const { mount } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });

// urlList普通图片URL数组
const urlList = [
  "http://pic2.orsoon.com/2017/0302/20170302052418236.jpg",
  "http://pic2.orsoon.com/2017/0302/20170302052417306.jpg",
  "http://pic2.orsoon.com/2017/0302/20170302052419961.jpg",
  "http://pic2.orsoon.com/2017/0302/20170302052420498.jpg"
];

// 大图 3200*1200
const largeImg = [
  "https://pcs4.clubstatic.lenovo.com.cn/data/attachment/forum/201601/29/085957r0ysulev009lxzpf.jpg"
];

// 长图 1000*3423
const longImg = [
  "http://img.redocn.com/sheji/20150207/xiaofanganquanzhishizhanban_3928817.jpg"
];

// 宽图 3867*1563
const wideImg = [
  "http://news.mydrivers.com/img/20180907/6f0414ea92074d24be74dc82fda19479.jpg"
];

describe('ImagePreviewer', () => {
  it('能否正确接受参数', () => {
    const wrapper = mount(<ImagePreviewer
      imgList = {urlList}
      visible = {false}
      currentImg = {0}
    />);
    expect(wrapper.prop('visible')).to.equal(false);
    expect(wrapper.prop('currentImg')).to.equal(0);
    expect(wrapper.prop('imgList')).to.be.a('array');
  });

  it('默认参数是否正确', () => {
    const wrapper = mount(<ImagePreviewer
      imgList = {urlList}
    />);
    expect(wrapper.prop('visible')).to.equal(false);
    expect(wrapper.prop('currentImg')).to.equal(0);
  });

  it('currentImg大于图片数组是否处理正确', () => {
    const wrapper = mount(<ImagePreviewer
      imgList = {urlList}
      currentImg = {10}
    />);

    expect(wrapper.find('img').getDOMNode().src).to.equal(urlList[0])
  });

  it('currentImg为负是否处理正确', () => {
    const wrapper = mount(<ImagePreviewer
      imgList = {urlList}
      currentImg = {-1}
    />);

    expect(wrapper.find('img').getDOMNode().src).to.equal(urlList[0])
  });

  it('是否正确切换图片', () => {
    const wrapper = mount(<ImagePreviewer
      imgList = {urlList}
      visible = {true}
      currentImg = {0}
    />);

    wrapper.find('.em-image-previewer-prev').simulate('click');
    wrapper.update();
    expect(wrapper.find('img').getDOMNode().src).to.equal(urlList[3]);
    wrapper.find('.em-image-previewer-next').simulate('click');
    wrapper.update();
    expect(wrapper.find('img').getDOMNode().src).to.equal(urlList[0]);
  });

  it('大尺寸图片是否缩放', () => {
    const wrapper = mount(<ImagePreviewer
      imgList = {largeImg}
      visible = {false}
      currentImg = {0}
    />);
  
    // let style = wrapper.update().find('.em-image-previewer-container').getDOMNode();
    // console.log(style);
    wrapper.update();
    expect(wrapper.find('img').getDOMNode().width).to.be.below(3200);
    expect(wrapper.find('img').getDOMNode().height).to.be.below(1200);

    wrapper.setProps({imgList: longImg, visible: true});
    wrapper.update();
    wrapper.setProps({imgList: wideImg, visible: true});
    wrapper.update();
  });

  it('图片缩放', () => {
    const wrapper = mount(<ImagePreviewer
      imgList = {largeImg}
      visible = {true}
      currentImg = {0}
    />);

    wrapper.update();
    wrapper.find('.em-image-previewer-container')
      .simulate('wheel', { deltaY: -120 });
    wrapper.update();
    wrapper.find('.em-image-previewer-container')
      .simulate('wheel', { deltaY: 120 });
    wrapper.update();
    wrapper.find('.em-image-previewer-container')
      .simulate('wheel');
    wrapper.update();
    for(let i = 0;i < 10; i++){
      wrapper.find('.em-image-previewer-container')
        .simulate('wheel', { deltaY: 120 });
      wrapper.update();
    }
  });

  it('图片拖拽', () => {
    const wrapper = mount(<ImagePreviewer
      imgList = {largeImg}
      visible = {true}
      currentImg = {0}
    />);

    wrapper.find('.em-image-previewer-container')
      .simulate('mousedown', { clientX: 300, clientY: 300});
    wrapper.update();
    wrapper.find('.em-image-previewer-container')
      .simulate('mousemove', { clientX: 200, clientY: 200});
    wrapper.update();
    wrapper.find('.em-image-previewer-container')
      .simulate('mouseup');
    wrapper.update();
    wrapper.find('.em-image-previewer-container')
      .simulate('mousemove', { clientX: 400, clientY: 400});
    wrapper.update();
  });

  it('长图是否正常缩放', () => {
    const wrapper = mount(<ImagePreviewer
      imgList = {longImg}
      visible = {true}
      currentImg = {0}
    />);

    wrapper.update();
  });

  it('宽图是否正常缩放', () => {
    const wrapper = mount(<ImagePreviewer
      imgList = {wideImg}
      visible = {true}
      currentImg = {0}
    />);

    wrapper.update();
  });
});
