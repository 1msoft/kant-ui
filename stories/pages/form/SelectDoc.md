
## 基础使用
    
<details><summary>展开查看</summary>
    
```jsx
const BaseUse = () => {
  const [data, setState] = useState([
    { title: '红色', value: 'red', key: '12321' },
    { title: '白色', value: 'white', props: { disabled: true } },
    { title: '黑色', value: 'black' },
  ]);

  // 动态添加
  const addData = useCallback(() => {
    setState([...data, { title: '粉色', value: 'pink' }]);
  }, [data]);

  // onChange 事件
  const onChange = useCallback((value, option) => {
    console.log('------ value ----', value, option);
  }, []);

  // onSearch 事件
  const onSearch = useCallback((value) => {
    console.log('----- value ----', value);
  }, []);

  return (
    <div>
      <Button onClick={addData} type="primary">添加粉色</Button> <br/><br/>
      <Select
        data={data}
        showSearch
        allowClear
        filterOption={false}
        onChange={onChange}
        onSearch={onSearch}
        placeholder="请选择颜色"
        style={{ width: '100%' }}
      />
    </div>
  );
};

```
    
</details>

## 支持 antd Option 写法
    
<details><summary>展开查看</summary>
    
```jsx
const CustomOption = () => {
  const data = useMemo(() => ([
    { title: '红色', value: 'red' },
    { title: '橙色', value: 'orange' },
    { title: '黄色', value: 'yellow' },
  ]), []);
  return (
    <Select
      placeholder="请选择颜色"
      style={{ width: '100%' }}
    >
      {data.map( v => (
        <Option value={v.value} key={v.value}>
          {v.title}
        </Option>
      ))}
    </Select>
  );
};

```
    
</details>

## 混杂类型数据
    
<details><summary>展开查看</summary>
    
```jsx
const HybridData =  () => {
  const data = useMemo(() => ([
    { title: '红色', value: 'red' },
    456,
    "绿色",
  ]), []);

  // onChange 事件
  const onChange = useCallback((value, option) => {
    console.log('------ value ----', value, option);
  }, []);

  return (
    <Select
      data={data}
      onChange={onChange}
      placeholder="请选择颜色"
      style={{ width: '100%' }}
    />
  );
};

```
    
</details>

## 通过 formatTitle formatValue 自定义数据 key
    
<details><summary>展开查看</summary>
    
```jsx
const CustomDataKey = () => {
  const data = useMemo(() => ([
    { desc: '红色', color: 'red' },
    { desc: '橙色', color: 'orange' },
    { desc: '黄色', color: 'yellow' },
    { desc: '绿色', color: 'green' },
    { desc: '青色', color: 'cyan' },
    { desc: '蓝色', color: 'blue' },
    { desc: '紫色', color: 'purple' },
    { desc: '灰色', color: 'grey' },
    { desc: '粉色', color: 'pink' },
  ]), []);

  // onChange 事件
  const onChange = useCallback((value, option) => {
    console.log('------ value ----', value, option);
  }, []);

  return (
    <Select
      data={data}
      formatTitle="desc"
      formatValue="color"
      onChange={onChange}
      placeholder="请选择颜色"
      style={{ width: '100%' }}
    />
  );
};

```
    
</details>

## 通过 formatTitle formatValue 手动格式化 title value
    
<details><summary>展开查看</summary>
    
```jsx
const FormatData = () => {
  const data = useMemo(() => ([
    { community: '国关小区', building: '1', house: '201', id: '123' },
    { community: '花园小区', building: '8', house: '801', id: '456' },
  ]), []);

  // onChange 事件
  const onChange = useCallback((value, option) => {
    console.log('------ value ----', value, option);
  }, []);

  return (
    <Select
      data={data}
      onChange={onChange}
      placeholder="请选择颜色"
      style={{ width: '100%' }}
      formatValue={v => v.id}
      formatTitle={v => (`${v.community}${v.building}楼${v.house}`)}
    />
  );
};

```
    
</details>

## 加载中状态以及类型演示
    
<details><summary>展开查看</summary>
    
```jsx
const LoadingBlock = () => {
  const data = useMemo(() => ([
    { title: '红色', value: 'red' },
    { title: '橙色', value: 'orange' },
    { title: '黄色', value: 'yellow' },
  ]), []);

  // onChange 事件
  const onChange = useCallback((value, option) => {
    console.log('------ value ----', value, option);
  }, []);

  return (
    <Fragment>
      <Row gutter={8} style={{ paddingBottom: 10, color: '#999' }}>
        <Col span={6}>默认加载中类型</Col>
        <Col span={6}>filed 类型的加载中</Col>
        <Col span={6}>menu 类型的加载中</Col>
        <Col span={6}>all 类型的加载中</Col>
      </Row>
      <Row gutter={8}>
        <Col span={6}>
          <Select
            loading
            data={data}
            onChange={onChange}
            placeholder="请选择颜色"
            style={{ width: '100%' }}
          />
        </Col>
        <Col span={6}>
          <Select
            loading
            data={data}
            onChange={onChange}
            loadingPosition="field"
            placeholder="请选择颜色"
            style={{ width: '100%' }}
          />
        </Col>
        <Col span={6}>
          <Select
            loading
            data={data}
            onChange={onChange}
            loadingPosition="menu"
            placeholder="请选择颜色"
            style={{ width: '100%' }}
          />
        </Col>
        <Col span={6}>
          <Select
            loading
            data={data}
            onChange={onChange}
            loadingPosition="all"
            placeholder="请选择颜色"
            style={{ width: '100%' }}
            spin={{
              indicator: (
                <Icon type="loading" style={{ fontSize: 24 }} spin />
              )
            }}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

```
    
</details>

## 滚动触底事件
    
<details><summary>展开查看</summary>
    
```jsx
const TouchBottom = () => {
  const [spinning, setSpinning] = useState(false);
  const [data, setData] = useState([
    { title: '红色', value: 'red' },
    { title: '橙色', value: 'orange' },
    { title: '黄色', value: 'yellow' },
    { title: '绿色', value: 'green' },
    { title: '青色', value: 'cyan' },
    { title: '蓝色', value: 'blue', props: { disabled: true } },
    { title: '紫色', value: 'purple' },
    { title: '灰色', value: 'grey' },
    { title: '粉色', value: 'pink' },
  ]);

  // 触底事件
  const onTouchBottom = e => {
    console.log(e.target);
    if (data.length === 12 || spinning){return false;}
    new Promise(resolve => {
      setSpinning(true);
      setTimeout(resolve, 3000);
    }).then(res => {
      setSpinning(false);
      setData([
        ...data,
        { title: '黑色', value: 'black' },
        { title: '白色', value: 'white' },
        { title: '棕色', value: 'brown' },
      ]);
    });
  };

  useEffect(() => {
    console.log(data, 'data');
  }, [data]);

  // 下拉列表滚动事件
  const onPopupScroll = useCallback(e => {
    console.log('------ 下拉滚动事件 ------', e);
  }, []);

  return (
    <div>
      <Select
        data={data}
        loadingPosition="all"
        loading={spinning}
        placeholder="请选择颜色"
        onTouchBottom={onTouchBottom}
        onPopupScroll={onPopupScroll}
        style={{ width: '100%' }}
      />
    </div>
  );
};

```
    
</details>

## 追加dom 实现点击加载更多功能, 追加的 dom 不可选
    
<details><summary>展开查看</summary>
    
```jsx
const ClickLoadingMore = () => {
  const [spinning, setSpinning] = useState(false);
  const [data, setData] = useState([
    { title: '红色', value: 'red' },
    { title: '橙色', value: 'orange' },
    { title: '黄色', value: 'yellow' },
    { title: '绿色', value: 'green' },
    { title: '青色', value: 'cyan' },
    { title: '蓝色', value: 'blue' },
    { title: '紫色', value: 'purple' },
    { title: '灰色', value: 'grey' },
    { title: '粉色', value: 'pink' },
  ]);

  // 点击事件
  const onClick = useCallback( e => {
    console.log(e.target);
    if (data.length === 12 || spinning){return false;}
    new Promise(resolve => {
      setSpinning(true);
      setTimeout(resolve, 3000);
    }).then(res => {
      setSpinning(false);
      setData([
        ...data,
        { title: '黑色', value: 'black' },
        { title: '白色', value: 'white' },
        { title: '棕色', value: 'brown' },
      ]);
    });
  }, [data, spinning]);

  const appendDom = useMemo(() => (
    <div className="kant-select-apend" onClick={onClick}>
      { data.length === 12 ? '没有更多数据' : '加载更多' }
    </div>
  ), [data]);

  return (
    <div>
      <Select
        data={data}
        loadingPosition="all"
        loading={spinning}
        appendDom={appendDom}
        placeholder="请选择颜色"
        style={{ width: '100%' }}
      />
    </div>

  );
};

```
    
</details>
