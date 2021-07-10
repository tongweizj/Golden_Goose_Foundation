# API接口说明



# 1. 基金相关表

## 1.1 基金表


### 1.1.1. 添加基金


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
{"fund": {"name":"中金精选股票C222", "code":"920922222","type": "gp"}}
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

### 1.1.2. 删除基金


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

### 1.1.3. 修改基金信息

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
{"id": "5fce762dba7bf416be8c7f27","input": {"name":"中金精选股票Cc", "code":"9209221","type": "sss"}}
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
### 1.1.4. 查询基金

#### 1.1.4.1 查全部基金
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

#### 1.1.4.2. 根据ID查基金

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

#### 1.1.4.3. 根据code查基金

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



## 1.2.基金历史价格

### 1.2.1. 添加单日的历史价格

```json
// 查询语句
mutation($code: String!,$update: FundHistoryInput){
  updateFundHistory(code:$code,update:$update){
    code
    historty{
      date
      nav
      cnw
      changeRate
      openBuy
      openSell
    }
  }
}
// 查询 variables
{
  "code": "920925",
  "update": {
    "date": "2021-01-22",
    "nav": 0.9082,
    "cnw": 0.9082,
    "changeRate": 0.12,
    "openBuy": true,
    "openSell": true
  }
}
// 创建成功,返回信息
{
  "data": {
    "updateFundHistory": {
      "code": "920925",
      "historty": [
        {
          "date": "2021-01-22",
          "nav": 0.9082,
          "cnw": 0.9082,
          "changeRate": 0.12,
          "openBuy": true,
          "openSell": true
        }
      ]
    }
  }
}
```

异常：相同日期数据已经添加

```json
{
  "data": {
    "updateFundHistory": null
  }
}
```



### 1.2.2. 批量添加历史价格



```json
// 查询
query($code: String!){
  fundHistory(
  code:$code
){
    code
    historty{
      date
      nav
      cnw
      changeRate
      openBuy
      openSell
    }
   }
 }
// 查询 variables
{"code": "920923"}
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

### 1.2.3. 根据基金编码查询基金历史价格

```json
// 查询
query($code: String!){
  fundHistory(
  code:$code
){
    code
    historty{
      date
      nav
      cnw
      changeRate
      openBuy
      openSell
    }
   }
 }
// 查询 variables
{"code": "920923"}
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

## 1.3. 基金涨幅情况 FundIncreaseInput


### 1) 查询全部基金的涨幅情况

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

### 2) 根据code查基金的涨幅情况

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

### 3) 添加基金的涨幅情况

```json
// 语句
mutation($code:String!,$name:String,$input:FundIncreaseInput,$type:String){
  createFundIncrease(code:$code, name:$name,type:$type,input:$input){
    name
    code
    type
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

### 4) 修改基金的涨幅情况

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

### 5) 删除基金的涨幅情况


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



# 2. 用户表

## 2.1 用户持有基金表

### 2.1.1 添加用户持有基金

```json
// 查询语句
mutation($fund:myHoldsInput){
  addMyHolds(fund:$fund){
    code
    amount
    cost
    holdingIncome{
      lastday
      lastdayRate
      total
      totalRate
    }
  }
}
// 查询 variables
{
  "fund": {
    "code": "111111",
    "amount": 1000,
    "cost": 1.01,
    "holdingIncome": {
      "lastday": 111,
      "lastdayRate": 0.1,
      "total": 1000,
      "totalRate": 0.5
    }
  }
}
// 创建成功,返回信息
{
  "data": {
    "addMyHolds": {
      "code": "111111",
      "amount": 1000,
      "cost": 1.01,
      "holdingIncome": {
        "lastday": 111,
        "lastdayRate": 0.1,
        "total": 1000,
        "totalRate": 0.5
      }
    }
  }
}
```

### 2.1.2 查询用户持有基金
```json
// 查询
query{
  myHolds{
    code
    cost
    amount
    holdingIncome{
      lastday
      lastdayRate
      total
      totalRate
    }
   }
 }

// 查询成功,返回信息
{
  "data": {
    "myHolds": [
      {
        "code": "111111",
        "cost": 1.01,
        "amount": 1000,
        "holdingIncome": {
          "lastday": 111,
          "lastdayRate": 0.1,
          "total": 1000,
          "totalRate": 0.5
        }
      },
      {
        "code": "111111",
        "cost": 1.01,
        "amount": 1000,
        "holdingIncome": {
          "lastday": 111,
          "lastdayRate": 0.1,
          "total": 1000,
          "totalRate": 0.5
        }
      }
    ]
  }
}
```
### 2.1.3 更新用户持有基金