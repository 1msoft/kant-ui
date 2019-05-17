import React, { useState } from "react";
import { Form, Row, Col, Input, Button, Divider } from "antd";
import { FormLayout, FormItem, FormItemNext } from "@components/index";

import 'antd/dist/antd.css';
import "@components/form-layout/style";
import styles from './FormLayout.less';

/**
 * app
 */
const App = () => {
  return (
    <div style={{ margin: '24px 36px'}}>
      <Divider orientation="left">展示表单 - flex布局</Divider>
      <FormLayoutNext/>
      <Divider orientation="left">输入表单 - flex布局</Divider>
      <FormLayoutNextInput/>
      <Divider orientation="left">查询块 - 查询按钮更随</Divider>
      <FormLayoutOfActiveButton />
      <Divider orientation="left">查询块 - 查询按钮固定</Divider>
      <FormLayoutOfFixedButton />
      <Divider orientation="left">输入表单 - horizontal布局</Divider>
      <FormLayoutByHorizontal />
      <Divider orientation="left">输入表单 - vertical布局</Divider>
      <FormLayoutByVertical />
      <Divider orientation="left">展示表单 - horizontal布局</Divider>
      <FormLayoutViewByHorizontal />
      <Divider orientation="left">展示表单 - inline布局</Divider>
      <FormLayoutViewByInline />
    </div>
  );
}

const getGrid = (span = 0, offset = 0) => {
  return ({ span, offset });
}

const FormLayoutOfActiveButton = Form.create({ name: 'active'})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form
      layout="inline"
      colon={false}
    >
      <FormLayout>
        <FormItem
          row={1}
          label="小区"
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
        >
          {getFieldDecorator('community')(<Input />)}
        </FormItem>
        <FormItem
          row={1}
          label="楼栋"
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(8),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
        >
          {getFieldDecorator('building')(<Input />)}
        </FormItem>
        <FormItem
          row={1}
          label="房屋"
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(8),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
        >
          {getFieldDecorator('houseNo')(<Input />)}
        </FormItem>
        <FormItem
            row={1}
            span={{
              md: getGrid(3),
            }}
            wrapperCol={{ span: 14, offset: 4 }}
          >
            <Button type="primary">查询</Button>
          </FormItem>
      </FormLayout>
    </Form>
  );
})

const FormLayoutOfFixedButton = Form.create({ name: 'active'})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form
      layout="inline"
      colon={false}
    >
      <FormLayout>
        <FormItem
          row={1}
          label="小区"
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
        >
          {getFieldDecorator('community')(<Input />)}
        </FormItem>
        <FormItem
          row={1}
          label="楼栋"
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(8),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
        >
          {getFieldDecorator('building')(<Input />)}
        </FormItem>
        <FormItem
          row={1}
          label="房屋"
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(8),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
        >
          {getFieldDecorator('houseNo')(<Input />)}
        </FormItem>
        <FormItem
          row={2}
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(8),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
        >
          <Button type="primary">查询</Button>
        </FormItem>
      </FormLayout>
    </Form>
  );
})

const FormLayoutByHorizontal = Form.create({ name: "input-horizontal" })(props => {
  const { form } = props;
  return (
    <Form
      colon={false}
      layout="horizontal"
    >
      <FormLayout
        gutter={{ xs: 8, sm: 16, md: 24 }}
        // itemSpan={{ }}
        // labelCol={{ }}
        // wrapperSpan={{ }}
      >
        <FormItem
          row={1}
          label="小区"
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          {form.getFieldDecorator("community", {
            rules: [{ required: true, message: "必填" }],
            initialValue: "大儒世家"
          })(<Input />)}
        </FormItem>
        <FormItem
          row={1}
          label="楼栋"
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          wrapperAlign="right"
          lacationRequired="afterWrapper"
        >
          {form.getFieldDecorator("building", {
            rules: [{ required: true, message: "必填" }],
            initialValue: "2号楼"
          })(<Input />)}
        </FormItem>
        <FormItem
          row={1}
          label="房屋"
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          {form.getFieldDecorator("houseNo", {
            rules: [{ required: true, message: "必填" }],
            initialValue: "204"
          })(<Input />)}
        </FormItem>
        <FormItem
          row={2}
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Button
            type='primary'
            style={{ marginRight: '12px' }}>
            提交
          </Button>
          <Button>重置</Button>
        </FormItem>
      </FormLayout>
    </Form>
  );
});

const FormLayoutByVertical = Form.create({ name: "input-vertical" })(props => {
  const { form } = props;
  return (
    <Form
      colon={false}
      layout="vertical"
    >
      <FormLayout
        gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 48, xxl: 48 }}
      >
        <FormItem
          row={1}
          label="小区"
          span={{
            xs: getGrid(24),
            sm: getGrid(24),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
        >
          {form.getFieldDecorator("community", {
            rules: [{ required: true, message: "必填" }],
            initialValue: "大儒世家"
          })(<Input />)}
        </FormItem>
        <FormItem
          row={1}
          label="楼栋"
          span={{
            sm: getGrid(24),
            xs: getGrid(24),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
        >
          {form.getFieldDecorator("building", {
            rules: [{ required: true, message: "必填" }],
            initialValue: "2号楼"
          })(<Input />)}
        </FormItem>
        <FormItem
          row={1}
          label="房屋"
          span={{
            xs: getGrid(24),
            sm: getGrid(24),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
        >
          {form.getFieldDecorator("houseNo", {
            rules: [{ required: true, message: "必填" }],
            initialValue: "204"
          })(<Input />)}
        </FormItem>
        <FormItem
          row={2}
          span={{
            xs: getGrid(24),
            sm: getGrid(24),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
        >
          <Button
            type='primary'
            style={{ marginRight: '12px' }}>
            提交
          </Button>
          <Button>重置</Button>
        </FormItem>
      </FormLayout>
    </Form>
  );
});

const FormLayoutViewByHorizontal = props => {
  return (
    <Form
      layout="horizontal"
      className="layout-by-flex"
    >
      <FormLayout
        gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 48, xxl: 48 }}
      >
        <FormItem
          row={1}
          label="小区"
          span={{
            xs: getGrid(24),
            sm: getGrid(24),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
        >
          大儒世家
        </FormItem>
        <FormItem
          row={1}
          label="楼栋"
          span={{
            sm: getGrid(24),
            xs: getGrid(24),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
        >
          2号楼
        </FormItem>
        <FormItem
          row={1}
          label="房屋"
          span={{
            xs: getGrid(24),
            sm: getGrid(24),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
        >
          204
        </FormItem>
      </FormLayout>
    </Form>
  );
};

const FormLayoutViewByInline = props => {
  return (
    <Form layout="inline" className="layout-by-flex">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <Form.Item label="规则名称">请输入</Form.Item>
        </Col>
        <Col md={8} sm={24}>
          <Form.Item label="使用状态">运行中</Form.Item>
        </Col>
        <Col md={8} sm={24}>
          <Form.Item label="调用次数">调用次数</Form.Item>
        </Col>
      </Row>
      <FormLayout
      // gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 48, xxl: 48 }}
      >
        <FormItem
          row={1}
          label="小区"
          colon={true}
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6)
          }}
        >
          大儒世家
        </FormItem>
        {/* <FormItem
          row={1}
          label="楼栋"
          span={{
            sm: getGrid(24),
            xs: getGrid(12),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
        >
          2号楼
        </Form.Item>
        <FormItem
          row={1}
          label="房屋"
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6),
          }}
        >
          204
        </FormItem> */}
      </FormLayout>
    </Form>
  );
};

const FormLayoutNext = Form.create({ name: 'flex' })(props => {
  return (
    <Form layout="inline">
      <FormLayout
      gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 48, xxl: 48 }}
      >
        <FormItemNext
          row={1}
          label="小区"
          labelWidth="120px"
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6)
          }}
        >
          大儒世家
        </FormItemNext>
        <FormItemNext
          row={1}
          label="小区"
          labelWidth="100px"
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6)
          }}
        >
          大儒世家
        </FormItemNext>
        <FormItemNext
          row={1}
          label="小区"
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6)
          }}
        >
          大儒世家
        </FormItemNext>
      </FormLayout>
    </Form>
  );
});

const FormLayoutNextInput = Form.create({ name: 'flex-input' })(props => {
  return (
    <Form layout="inline">
      <FormLayout gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 48, xxl: 48 }}>
        <FormItemNext
          row={1}
          label="小区"
          // labelWidth="120px"
          locationRequired="beforeLabel"
          colon={false}
          // direction="column"
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6)
          }}
        >
          {props.form.getFieldDecorator("community", {
            rules: [{ required: true, message: "必填" }],
            initialValue: "204"
          })(<Input />)}
        </FormItemNext>
        <FormItemNext
          row={1}
          label="楼栋"
          locationRequired='afterWrapper'
          // labelWidth="120px"
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6)
          }}
        >
          {props.form.getFieldDecorator("building", {
            rules: [{ required: true, message: "必填" }],
            initialValue: "204"
          })(<Input style={{ width: '80px' }} />)}
        </FormItemNext>
        <FormItemNext
          row={2}
          label="单元"
          // labelWidth="120px"
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6)
          }}
        >
          {props.form.getFieldDecorator("unitNo", {
            rules: [{ required: true, message: "必填" }],
            initialValue: "204"
          })(<Input style={{ width: '80px' }} />)}
        </FormItemNext>
        <FormItemNext
          row={2}
          label="房屋"
          // labelWidth="120px"
          span={{
            xs: getGrid(24),
            sm: getGrid(12),
            md: getGrid(12),
            lg: getGrid(8),
            xl: getGrid(8),
            xxl: getGrid(6)
          }}
        >
          {props.form.getFieldDecorator("houseNo", {
            rules: [{ required: true, message: "必填" }],
            initialValue: "204"
          })(<Input />)}
        </FormItemNext>
      </FormLayout>
    </Form>
  );
});

export default App;
