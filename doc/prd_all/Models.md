# 金母鹅数据库表格设计

# 1. 用户账户

## 1.1. balances



## 1.2. orders



## 1.3. holds 持有基金



| 参数名        | 英文名           | 必选           | 类型  | 说明 |
| ------------- |:--------------|:-------------:| -----:| -----:|
| 基金 | code |   |   | |
| 份数 | amount  |   |   | |
| 成本 | cost |   |   | |
| 持有收益 | Holding income |   |   | |

```json
{  
  "code":"1111",
  "amount": 111111,
  "cost": 1.10,
  "holding income" : {
    "lastday":1.10,
    "lastday-rate":0.09,
    "total"：1000,
    "total-rate":0.99
  }
}
```




## 2. 基金类



### 1.1. 基金基本信息表

| 参数名        | 英文名           | 必选           | 类型  | 说明 |
| ------------- |:--------------|:-------------:| -----:| -----:|
| 基金名字 | name | 是  | string | 用户名 |
| 基金代码 | code |   | 是  | string |
| 基金类型 | type |   | Json | |
| 标签 | tags |   | Array | |
| 阶段涨幅 | Trailing-Returns |   | string | |
| 年度涨幅 | Annual-Total-Return |   | string | |
| 基金档案 | Profile |   |   | |

##### 基金档案

| 参数名        | 英文名           | 必选           | 类型  | 说明 |
| ------------- |:--------------|:-------------:| -----:| -----:|
| 基金公司 | company |   |   | |
| 基金经理 | manager |   |   | |
| 成立时间 | Inception Date |   |   | |
| 基金规模 | Net Assets |   |   | |
| 基金板块 | Category | | | |



```json
{
    "Name" : "建信富时100指数(QDII)人民币A",
    "Code" : "539003",
  "Type":{
      "type":"etf",
      "etf"："qdii",
      },
  "Profile":{
      "Fund Family":"ARK ETF Trust",
      "manager"："qdii",
      "Category":"Technology",
      "Net Assets":"5.27B",
      "Inception Date":"2014-09-03"
      },
  "Trailing-Returns":{
    YTD:{
      "Quarter":true,
      "Type-Quarter"：true,
      "return": 0.34
      },
    1-Month:{
      "Quarter":true,
      "Type-Quarter"：true,
      "return": 0.34
      },
    3-Month:{
      "Quarter":true,
      "Type-Quarter"：true,
      "return": 0.34
      },
    1-Year:{
      "Quarter":true,
      "Type-Quarter"：true,
      "return": 0.34
      },
    3-Year:{
      "Quarter":true,
      "Type-Quarter"：true,
      "return": 0.34
      },
    5-Year:{
      "Quarter":true,
      "Type-Quarter"：true,
      "return": 0.34
      },
    10-Year:{
      "Quarter":true,
      "Type-Quarter"：true,
      "return": 0.34
      },
  },
  "Annual-Total-Return":{
    "2020":{
      "Quarter":true,
      "Type-Quarter"：true,
      "return": 0.34
      },
    2019:{
      "Quarter":true,
      "Type-Quarter"：true,
      "return": 0.34
      },
    2018:{
      "Quarter":true,
      "Type-Quarter"：true,
      "return": 0.34
      },
    2017:{
      "Quarter":true,
      "Type-Quarter"：true,
      "return": 0.34
      },
    2016:{
      "Quarter":true,
      "Type-Quarter"：true,
      "return": 0.34
      },
    2015:{
      "Quarter":true,
      "Type-Quarter"：true,
      "return": 0.34
      },
    2014:{
      "Quarter":true,
      "Type-Quarter"：true,
      "return": 0.34
      },
  },
  "tags" : [],
}
```



### 1.2. fund-history 基金价格数据

| 参数名        | 英文         | 类型  | 说明 |
| ------------- |:-------------:| -----:| -----:|
| 基金  | code | string | 用户名 |
| 日期  | Date | string | 用户名 |
| 单位净值  | NAV | string | 密码 |
| 累计净值 | cnw |  |  |
| 日增长率 | change rate |  |  |
| 开放申购 | openBuy | Boolean| |
| 开放赎回 | openSell | Boolean| |

```json
{  
  "code":"1111",
  "historty" : [
    ["2018-11-28","0.9008","0.9008","1.12%","开放申购","开放赎回",""],   
    ["2018-11-27","0.8908","0.8908","-0.52%","开放申购","开放赎回",""],
    ["2018-11-26","0.8955","0.8955","0.39%","开放申购","开放赎回",""]
  ]
}
```

```
Net Asset Value,NAV
Cumulative net worth ，cnw
```