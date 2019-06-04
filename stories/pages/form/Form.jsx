import React from "react";
import { InputNumber as AntInputNumber, Button, Divider } from "antd";
import { Form, InputNumber, Input, DatePicker } from "@components/index";

import "@components/form/style";

const { FormLayout, FormItem } = Form;
const TextArea = Input.TextArea;
const getGrid = FormItem.getGrid;

export default () => {
  return (
    <div style={{ margin: '24px 36px' }}>
      <Divider orientation="left">展示表单 - 只读表单</Divider>
      <ReadOnlyFormLayout />
      <Divider orientation="left">输入表单 - 查询块</Divider>
      <QueryFormLayout />
      <Divider orientation="left">输入表单 - row布局</Divider>
      <InputFormLayoutByHorizontal />
      <Divider orientation="left">输入表单 - column布局</Divider>
      <InputFormLayoutByVertical />
    </div>
  );
};

const ReadOnlyFormLayout = props => {
  return (
    <FormLayout
      labelAlign="left"
      colon={true}
    >
      <FormItem
        row={1}
        label="小区"
        span={8}
      >
        大儒世家
      </FormItem>
      <FormItem
        row={1}
        label="楼栋"
        span={8}
      >
        2号楼
      </FormItem>
      <FormItem
        row={1}
        label="单元"
        span={8}
      >
        2单元
      </FormItem>
      <FormItem
        row={2}
        label="房号"
        span={8}
      >
        304
      </FormItem>
      <FormItem
        row={2}
        label="业主"
        span={8}
      >
        王大陆
      </FormItem>
      <FormItem
        row={2}
        label="身份证"
        span={8}
      >
        3504251995xxxxxxxx
      </FormItem>
    </FormLayout>
  );
};

const QueryFormLayout = Form.create({ name: 'query-input' })(props => {
  const query = (e) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  return (
    <FormLayout colon={true} inlineLabel={true}>
      <FormItem row={1} span={getGrid(6)} label="小区">
        {props.form.getFieldDecorator("community")(
          <Input placeholder="小区" />
        )}
      </FormItem>
      <FormItem row={1} span={getGrid(6)} label="楼栋">
        {props.form.getFieldDecorator("building")(
          <Input placeholder="楼栋" />
        )}
      </FormItem>
      <FormItem row={1} span={getGrid(6)} label="单元">
        {props.form.getFieldDecorator("unitNo")(
          <Input placeholder="单元" />
        )}
      </FormItem>
      <FormItem row={1} span={getGrid(6)} label="房号">
        {props.form.getFieldDecorator("houseNo")(
          <Input placeholder="房号" />
        )}
      </FormItem>
      <FormItem row={2} span={getGrid(6)} label="业主">
        {props.form.getFieldDecorator("owner")(
          <Input placeholder="业主" />
        )}
      </FormItem>
      <FormItem row={2} span={getGrid(6)} push={12} wrapperAlign="right">
        <Button type="primary" onClick={query}>
          查询
        </Button>
      </FormItem>
    </FormLayout>
  );
});

const InputFormLayoutByHorizontal = Form.create({ name: 'row-input' })(({ form }) => {
  const submit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  const resetFields = () => form.resetFields();
  return (
    <FormLayout
      colon={true}
    >
      <FormItem
        row={1}
        span={8}
        label="小区"
      >
        {form.getFieldDecorator("community", {
          rules: [{ required: true, message: "必填" }],
        })(<Input placeholder="小区" />)}
      </FormItem>
      <FormItem
        row={1}
        span={8}
        label="楼栋"
      >
        {form.getFieldDecorator("building", {
          rules: [{ required: true, message: "必填" }],
        })(<AntInputNumber style={{ width: '100%' }} placeholder="楼栋" />)}
      </FormItem>
      <FormItem
        row={2}
        span={8}
        label="单元"
      >
        {form.getFieldDecorator("unitNo", {
          rules: [{ required: true, message: "必填" }],
        })(<InputNumber style={{ width: '100%' }} placeholder="单元" />)}
      </FormItem>
      <FormItem
        row={2}
        span={8}
        label="合同日期"
      >
        {form.getFieldDecorator("date", {
          rules: [
            { required: true, message: "合同日期必填" },
          ],
        })(<DatePicker />)}
      </FormItem>
      <FormItem
        row={3}
        span={6}
        push={1}
      >
        <Button
          type="primary"
          onClick={submit}
          style={{ marginRight: '20px' }}
        >提交</Button>
        <Button
          onClick={resetFields}
        >重置</Button>
      </FormItem>
    </FormLayout>
  );
});

const InputFormLayoutByVertical = Form.create({ name: 'flex-input' })(({ form }) => {
  const submit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  const resetFields = () => form.resetFields();
  return (
    <FormLayout
      direction="column"
      colon={true}
    >
      <FormItem
        row={1}
        span={8}
        label="小区"
      >
        {form.getFieldDecorator("community", {
          rules: [{ required: true, message: "必填" }],
        })(<Input placeholder="小区" />)}
      </FormItem>
      <FormItem
        row={1}
        span={8}
        label="楼栋"
      >
        {form.getFieldDecorator("building", {
          rules: [{ required: true, message: "必填" }],
        })(<Input placeholder="楼栋" />)}
      </FormItem>
      <FormItem
        row={2}
        span={8}
        label="单元"
      >
        {form.getFieldDecorator("unitNo", {
          rules: [{ required: true, message: "必填" }],
        })(<Input placeholder="单元" />)}
      </FormItem>
      <FormItem
        row={2}
        span={8}
        label="房屋"
      >
        {form.getFieldDecorator("houseNo", {
          rules: [{ required: false, message: "必填" }],
        })(<Input placeholder="单元" />)}
      </FormItem>
      <FormItem
        row={3}
        span={6}
      >
        <Button
          type="primary"
          onClick={submit}
          style={{ marginRight: '20px' }}
        >提交</Button>
        <Button
          onClick={resetFields}
        >重置</Button>
      </FormItem>
    </FormLayout>
  );
});
