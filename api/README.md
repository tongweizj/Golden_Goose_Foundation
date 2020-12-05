# zhaowork_api

## API 接口说明

### 基金基本信息接口

#### 1) 查询全部基金

```json

// 查询
 query{
   funds{
     id
     name
     code
   }
 }


// 查询成功,返回信息
 {
  "data": {
    "funds": [
      {
        "id": "5fcba0e91a383b18defba1ee",
        "name": "中金新锐股票C",
        "code": "920923"
      }
    ]
  }
}
```

#### 2) 根据ID查基金

```json
// 查询
query ($id: ID!) {
  fund(
  id:$id
){
  id
  name
  code
}}

// 查询 variables
{"id": "5fcba0e91a383b18defba1ee"}

// 查询成功,返回信息
{
  "data": {
    "fund": {
      "id": "5fcba0e91a383b18defba1ee",
      "name": "中金新锐股票C",
      "code": "920923"
    }
  }
}
```

#### 2) 根据code查基金

```json
// 查询
query ($code: String!) {
  fundByCode(
  code:$code
){
  id
  name
  code
  
}}

// 查询 variables
{"code": "920923"}

// 查询成功,返回信息
{
  "data": {
    "funds": [
      {
        "id": "5fcba36c1a383b18defba1ef",
        "name": "中金新锐股票C",
        "code": "920923"
      },
      {
        "id": "5fcbae883a1c9229ff5a753b",
        "name": "中金精选股票C",
        "code": "920922"
      }
    ]
  }
}
```

#### 3) 添加基金

```json
// 语句
mutation($fund:FundInput){
  createFund(fund:$fund){
    name
    code
  }
}
// 查询 variables
{"fund": {"name":"中金精选股票C", "code":"920922"}}
// 创建成功,返回信息
{
  "data": {
    "createFund": {
      "name": "中金新锐股票C",
      "code": "920923"
    }
  }
}
```

#### 4) 修改基金

TODO:
问题: 参数是写死的,没有使用变量

```json
// 语句
mutation($id:ID!,$input:FundInput){
  updateFund(id:$id,input:$input){
    id
    name
    code
  }
}
// 查询 variables
{"id": "5fcba36c1a383b18defba1ef","input": {"name":"中金精选股票Cc", "code":"9209221"}}
// 修改成功,返回信息
{
  "data": {
    "updateFund": {
      "id": "5fcba36c1a383b18defba1ef",
      "name": "中金新锐股票C",
      "code": "920923"
    }
  }
}
```

#### 5) 删除基金


```json
// 语句
mutation($id:ID!){
  deleteFund(
    id:$id,
  ){
    id
    name
    code
  }
}
// 查询 variables
{"id": "5fcbae883a1c9229ff5a753b"}
// 创建成功,返回信息
{
  "data": {
    "deleteFund": {
      "id": "5fcba0e91a383b18defba1ee",
      "name": "ddddddd",
      "code": "dddddd"
    }
  }
}
```

### 基金涨幅情况 FundIncreaseInput


#### 1) 查询全部基金的涨幅情况

```json

// 查询
query{
  fundsIncrease{
    name
    code
    lastUpdate
    dayOfGrowth
  }
}


// 查询成功,返回信息
{
  "data": {
    "fundsIncrease": []
  }
}
```

#### 2) 根据code查基金的涨幅情况

```json
// 查询
query($code:String!){
  fundIncrease(code:$code){
    name
    code
    lastUpdate
    dayOfGrowth
    
  }
}

// 查询 variables
{"code": "920923"}

// 查询成功,返回信息
{
  "data": {
    "funds": [
      {
        "id": "5fcba36c1a383b18defba1ef",
        "name": "中金新锐股票C",
        "code": "920923"
      },
      {
        "id": "5fcbae883a1c9229ff5a753b",
        "name": "中金精选股票C",
        "code": "920922"
      }
    ]
  }
}
```

#### 3) 添加基金的涨幅情况

```json
// 语句
mutation($code:String!,$name:String,$input:FundIncreaseInput){
  createFundIncrease(code:$code, name:$name,input:$input){
    name
    code
  }
}
// 查询 variables
{
  "code": "920923",
  "name": "中金新锐股票C",
  "input": {
    "lastUpdate": "222222",
    "unitNetWorth": "String",
    "dayOfGrowth": "String",
    "recent1Week": "String",
    "recent3Month": "String",
    "recent6Month": "String",
    "recent1Year": "String",
    "recent2Year": "String",
    "recent3Year": "String",
    "fromThisYear": "String",
    "fromBuild": "String",
    "serviceCharge": "String"
  }
}
// 创建成功,返回信息
{
  "data": {
    "createFundIncrease": {
      "name": "中金新锐股票C",
      "code": "920923"
    }
  }
}
```

#### 4) 修改基金的涨幅情况

```json
// 语句
mutation($code:String!,$update:FundIncreaseInput){
  updateFundIncrease(code:$code,update:$update){
    name
    code
    lastUpdate
    fromBuild
    dayOfGrowth
  }
}
// 查询 variables
{
  "code": "920924",
  "update": {
    "lastUpdate": "2222223333333333444444",
    "unitNetWorth": "String",
    "dayOfGrowth": "333333",
    "recent1Week": "String",
    "recent3Month": "String",
    "recent6Month": "33444",
    "recent1Year": "String",
    "recent2Year": "String",
    "recent3Year": "String",
    "fromThisYear": "String",
    "fromBuild": "String",
    "serviceCharge": "String"
  }
}
// 修改成功,返回信息
{
  "data": {
    "updateFundIncrease": {
      "name": "中金新锐股票C",
      "code": "920924",
      "lastUpdate": "2222223333333333444444",
      "fromBuild": "String",
      "dayOfGrowth": "333333"
    }
  }
}
```

#### 5) 删除基金的涨幅情况


```json
// 语句
mutation($code:String!){
  deleteFundIncrease(code:$code){
    name
    code
    lastUpdate
    unitNetWorth
  }
}
// 查询 variables
{
  "code": "920924"
}
// 创建成功,返回信息
{
  "data": {
    "deleteFundIncrease": {
      "name": "中金新锐股票C",
      "code": "920924",
      "lastUpdate": "2222223333333333444444",
      "unitNetWorth": "String"
    }
  }
}
```
