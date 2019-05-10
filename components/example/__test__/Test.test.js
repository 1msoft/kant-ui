import React from 'react'
import {assert} from 'chai'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
const { mount }=Enzyme

class Test extends React.Component{
  render(){
    return (
      <div className="content">
        this is test code!
      </div>
    );
  }
}

// 为 Enzyme 配置适配器
Enzyme.configure({ adapter: new Adapter() })

describe('Enzyme的 mount 测试套件', function () {
  it('Example组件中dom值的判断', function () {
    // 渲染组件
    let app = mount(<Test />);
    // 查询dom
    const test = app.find('.content');
    // 使用断言判断 dom 值是否等于指定的值
    assert.equal(test.text(),'this is test code!')
  })
})
