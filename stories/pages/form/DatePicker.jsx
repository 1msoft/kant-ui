import React, { useState } from 'react';
import { Divider, Button } from 'antd';
import { DatePicker, Form } from '@components/index';
import moment from 'moment';

import "@components/date-picker/style";
import './DatePicker.less';

const { FormLayout, FormItem } = Form;

const DatePickerComponent = () => {
  const [theme, setTheme] = useState("box");

  const [date, setDate] = useState([moment('2019-05-11'), moment('2019-05-22')]);
  const [week, setWeek] = useState([moment('2019-05-11'), moment('2019-05-22')]);
  const [month, setMonth] = useState([moment('2019-05-11'), moment('2019-06-22')]);
  const [year, setYear] = useState([moment('2018-01-01'), moment('2019-01-01')]);

  // const [date, setDate] = useState([null, null]);
  // const [week, setWeek] = useState([null, null]);
  // const [month, setMonth] = useState([null, null]);
  // const [year, setYear] = useState([null, null]);

  return (
    <div style={{ padding: 15 }}>
      <div>
        <span style={{ color: "#40a9ff", cursor: "pointer" }}
          onClick={() => {
            const nextTheme = theme === "box" ? "underline" : "box";
            setTheme(nextTheme);
          }}>
          切换风格
        </span>
      </div>
      <Divider>默认情况</Divider>

      <Divider orientation="left">日期选择器</Divider>
      <DatePicker theme={theme} />

      <Divider orientation="left">周数选择器</Divider>
      <DatePicker
        theme={theme}
        type="Week" />

      <Divider orientation="left">月份选择器</Divider>
      <DatePicker
        theme={theme}
        type="Month" />

      <Divider orientation="left">年份选择器</Divider>
      <DatePicker
        theme={theme}
        type="Year" />

      <Divider>传参情况</Divider>

      <Divider orientation="left">日期选择器</Divider>
      <DatePicker
        theme={theme}
        value={[date[0], date[1]]}
        onChange={([startDate, endDate]) => {setDate([startDate, endDate]);}} />

      <Divider orientation="left">周数选择器</Divider>
      <DatePicker
        type="Week"
        theme={theme}
        value={[week[0], week[1]]}
        onChange={([startDate, endDate]) => {setWeek([startDate, endDate]);}} />

      <Divider orientation="left">月份选择器</Divider>
      <DatePicker
        theme={theme}
        type="Month"
        value={[month[0], month[1]]}
        onChange={([startDate, endDate]) => {setMonth([startDate, endDate]);}} />

      <Divider orientation="left">年份选择器</Divider>
      <DatePicker
        theme={theme}
        type="Year"
        value={[year[0], year[1]]}
        onChange={([startDate, endDate]) => {setYear([startDate, endDate]);}} />

      <Divider>Format参数</Divider>
      <Divider orientation="left">日期选择器</Divider>
      <DatePicker
        theme={theme}
        value={[date[0], date[1]]}
        format="YYYY年MM月DD日"
        onChange={([startDate, endDate]) => {setDate([startDate, endDate]);}} />

      <Divider orientation="left">周数选择器</Divider>
      <DatePicker
        type="Week"
        theme={theme}
        value={[week[0], week[1]]}
        format="YYYY年 第wo"
        onChange={([startDate, endDate]) => {setWeek([startDate, endDate]);}} />

      <Divider orientation="left">月份选择器</Divider>
      <DatePicker
        theme={theme}
        type="Month"
        value={[month[0], month[1]]}
        format="YYYY年MM月"
        onChange={([startDate, endDate]) => {setMonth([startDate, endDate]);}} />
      
      <Divider>form表单</Divider>
      <DateFormLayout />
    </div>
  );
};

const DateFormLayout = Form.create({ name: 'date-form' })(({ form }) => {
  const submit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };
  const resetFields = () => {
    form.resetFields();
  };
  return (
    <FormLayout colon={true} inlineLabel={true}>
      <FormItem row={2} span={8} label="日期">
        {form.getFieldDecorator("date", {
          rules: [
            { required: true, message: "日期必填" },
          ],
        })(<DatePicker />)}
      </FormItem>
      <FormItem row={2} span={8} label="周数">
        {form.getFieldDecorator("week", {
          rules: [
            { required: true, message: "周数必填" },
          ],
        })(<DatePicker type="Week" />)}
      </FormItem>
      <FormItem row={2} span={8} label="月份">
        {form.getFieldDecorator("month", {
          rules: [
            { required: true, message: "月份必填" },
          ],
        })(<DatePicker type="Month" />)}
      </FormItem>
      <FormItem row={2} span={8} label="年份">
        {form.getFieldDecorator("year", {
          rules: [
            { required: true, message: "年份必填" },
          ],
        })(<DatePicker type="Year" />)}
      </FormItem>
      <FormItem row={3} span={6} push={1}>
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

export default () => {
  return (
    <DatePickerComponent />
  );
};