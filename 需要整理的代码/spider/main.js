'use strict'

// const FundIncrease = require('./crawler/fund-increase')
// const Analyzer = require('./analyzer/fundanalyzer')
const spiderMyHolds = require('./controllers/fetch-my-holds')
const spider = require('./controllers/fetch-fund-increase')
/// 调度器

/// 1) spider: 更新持有基金的最新价格信息
spiderMyHolds()

/// 2) spider: 市场已有基金的涨幅情况
// spider()

/// TODO 2) spider: 已有基金的基本信息

/// TODO 3) spider: 市场已有基金的每日交易情况

/// TODO 4) analyzer: 4433 基金标签
// Analyzer.start()
// const funds = FundIncreaseDB.queryAllFundIncrease(function (resp) {
//   Log.success('analyzer: 4433 基金标签: ' + resp)
//   // console.log(resp.fundByCode)
// })
// const recommendFunds = Analyzer.start()
// console.log(recommendFunds)
// console.log('Session: %j', recommendFunds)
