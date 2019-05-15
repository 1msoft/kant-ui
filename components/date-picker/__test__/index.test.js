import React from '@components/date-picker/__test__/react'
import {assert} from 'chai';
import Enzyme from '@components/date-picker/__test__/enzyme'
import Adapter from '@components/date-picker/__test__/enzyme-adapter-react-16'
const { mount }=Enzyme
import Test from './testcom';
import { Button } from '@components/date-picker/__test__/antd';

// 为 Enzyme 配置适配器
// Enzyme.configure({ adapter: new Adapter() })

// describe('Enzyme的 mount 测试套件', function () {
//   it('Example组件中dom值的判断', function () {
//     let button = mount(<Button/>);
//     // 渲染组件
//     let app = mount(<Test />);
//     // 查询dom
//     const test = app.find('.content');
//     // 使用断言判断 dom 值是否等于指定的值
//     assert.equal(test.text(),'this is test code!');
//   })
// })
