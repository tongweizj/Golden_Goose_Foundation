# 1. 用户持有基金表

## 1. 查



### 1.1 查询用户持有基金

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

### 1.2 根据code查询用户持有基金

```json
// 查询
query ($code: String!) {
  myHoldByCode(
  code:$code
){
  code
  name
  amount
  cost
  holdingIncome{
      lastday
      lastdayRate
      total
      totalRate
    }
}}

// 查询 variables
{"code": "005267"}

// 查询成功,返回信息
{
  "data": {
    "myHoldByCode": {
      "code": "005267",
      "name": "嘉实价值精选",
      "amount": 10,
      "cost": 10,
      "holdingIncome": {
        "lastday": -0.01779312361363178,
        "lastdayRate": -0.82,
        "total": 0,
        "totalRate": 1.1307920792079207
      }
    }
  }
}

```



## 2. 增删改

### 2.1.1 添加用户持有基金


// 查询语句
```json

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
```

// 查询 variables
```JSON

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
```
// 创建成功,返回信息
```JSON

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



### 2.1.3 更新用户持有基金的收益

// 查询语句

```json
mutation($code:String!,$update:IncomeInput){
  updateMyHoldsHoldingIncome(code:$code,update:$update){
    code
    holdingIncome{
      lastday
      lastdayRate
      total
      totalRate
    }
  }
}
```

// 查询 variables

```JSON
{
  "code": "005267",
  "update": {
    "lastday": 10,
    "lastdayRate": 0.1,
    "total": 10000,
    "totalRate": 1.5
  }
}
```

// 创建成功,返回信息

```JSON
{
  "data": {
    "updateMyHoldsHoldingIncome": {
      "code": "005267",
      "holdingIncome": {
        "lastday": 10,
        "lastdayRate": 0.1,
        "total": 10000,
        "totalRate": 1.5
      }
    }
  }
}
```



### 2.1.4 更新用户持有基金的信息

// 查询语句

```json
mutation($code:String!,$amount:Float!,$cost:Float!){
  updateMyHolds(code:$code,amount:$amount,cost:$cost){
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
```

// 查询 variables

```JSON
{
  "code": "005267",
  "amount": 10,
  "cost":10
}
```

// 创建成功,返回信息

```JSON
{
  "data": {
    "updateMyHolds": {
      "code": "005267",
      "amount": 10,
      "cost": 10,
      "holdingIncome": {
        "lastday": -0.01779312361363178,
        "lastdayRate": -0.82,
        "total": 0,
        "totalRate": 1.1307920792079207
      }
    }
  }
}
```

