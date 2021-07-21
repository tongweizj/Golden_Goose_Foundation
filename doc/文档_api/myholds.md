# 用户表



## 1. 用户持有基金表



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

