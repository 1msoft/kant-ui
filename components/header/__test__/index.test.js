import React from 'react';
import Enzyme from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../';

const { mount } = Enzyme;
Enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
  it('能否正确接收参数', () => {
    const wrapper = mount(
      <Header
        fixed={true}
        downHide={true}
        upHide={true} />
    );
  });
});