import _ from 'lodash';
import React from 'react'
import sinon from 'sinon';
import Enzyme from 'enzyme';
import {assert} from 'chai';
import SideMenu from '../index';
import Adapter from 'enzyme-adapter-react-16';
import { wrap } from 'module';

const { mount, shallow } = Enzyme;

Enzyme.configure({ adapter: new Adapter() })

describe('侧边栏菜单', function () {

  it('给入数据源是否正确渲染数据', function () {
    const dataSource = [
      { key: '123', title: '菜单1', url: '/abc', icon: 'delete',
        child: [{ key: '345', title: '菜单2', url: '/abcd', icon: 'delete',
        child: [{ key: '778', title: '菜单3', url: '/abcdea', icon: 'delete',
          child: [{
            key: '999', title: '菜单99', url: '/abcdea', icon: 'delete'
          }]
        },
          { key: '878', title: '菜单99', url: '/abcdea', icon: 'delete'},
          { key: '078', title: '菜单00', url: '/abcdea', icon: 'delete'},
        ]}
      ]},
      { key: '678', title: '菜单3', url: '/abcde', icon: 'delete',
        child: [{ key: '3456', title: '菜单62', url: '/abcdh', icon: 'delete'}]
      },
      { key: '798', title: '菜单4', url: '/abcde', icon: 'delete'},
      { key: '789', title: '菜单5', url: '/abcde', icon: 'delete'},
      { key: '978', title: '菜单6', url: '/abcde', icon: 'delete'}
    ];
    const wrapper = mount(
      <SideMenu dataSource={dataSource} />
    );

    assert.equal(wrapper.find('.ant-menu-item').length, 5);
  })

})
