//  add 函数
import add from './add';

// 导入断言库
import {expect} from 'chai';

// 编写测试套件（区块）
describe('test demo',function(){
  // 编写测试单元
  it('1+1=2',function(){
    expect(add(1,1)).to.be.equal(2);
  })
})
