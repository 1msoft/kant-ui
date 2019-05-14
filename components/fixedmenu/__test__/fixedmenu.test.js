import React from 'react'
import {assert, expect} from 'chai';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
const { mount, shallow }=Enzyme
import FixedMenu from '../index.jsx';

// 为 Enzyme 配置适配器
Enzyme.configure({ adapter: new Adapter() })

describe('<FixedMenu>', function () {
  it('判断悬停菜单是否能正确传props值，和设置props值', function () {
    let app = mount(<FixedMenu
      showHeight={100}
      className='test1'
      // freeDom
      listClassName='test2'
      suggestClassName='test3'
      // suggestEvent
      arrowClassName='test4'
      show={true}
      always={true}
    />);

    //能否正确接收值
    expect(app.props().className).to.equal('test1');
    expect(app.props().listClassName).to.equal('test2');
    expect(app.props().suggestClassName).to.equal('test3');
    expect(app.props().arrowClassName).to.equal('test4');
    expect(app.props().showHeight).to.equal(100);
    expect(app.props().show).to.equal(true);
    expect(app.props().always).to.equal(true);

    //能否正确设置值
    app.setProps({ className: '1test' });
    expect(app.props().className).to.equal('1test');
    app.setProps({ listClassName: '2test' });
    expect(app.props().listClassName).to.equal('2test');
    app.setProps({ suggestClassName: '3test' });
    expect(app.props().suggestClassName).to.equal('3test');
    app.setProps({ arrowClassName: '4test' });
    expect(app.props().arrowClassName).to.equal('4test');
    app.setProps({ showHeight: 300 });
    expect(app.props().showHeight).to.equal(300);
    app.setProps({ show: false });
    expect(app.props().show).to.equal(false);
    app.setProps({ always: false });
    expect(app.props().always).to.equal(false);
  })

  it ('传入的自定义组件是否有在<FixedMenu>里面被获取到', function () {
    const freeDom = () => {
      return (
        <div className='abc'>1234</div>
      );
    }
    let app = mount(<FixedMenu
      freeDom={freeDom}
    />)
    expect(app.find('.abc').text()).to.equal('1234');
  })

  it ('组件内部是否能成功设置滚动值', function () {
    let app = shallow(<FixedMenu/>)
    expect(app.instance().scrollTop);
    app.instance().setScrollTop(130);
    expect(app.instance().scrollTop).to.equal(130);
  })

})
