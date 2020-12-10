'use strict';

const DB = require('../utils/local-file');
const Log = require('../utils/log');
// const Mongo = require('../models/mongo-api')
const FundDB = require('../models/fund')
const FundIncreaseDB = require('../models/fund-increase')
var async = require("async");
const DateFormat = require('dateformat');
var today = DateFormat(new Date(), 'yyyy/mm/dd')

function parseData(data,task) {
  const jsonObj = parseJsonObject(data);

  const fundItems = [];
  for (const item of jsonObj['datas']) {
    let fundItem = {};
    const fundArray = item.split('|');
  
    fundItem['code'] = fundArray[0];
    fundItem['name'] = fundArray[1];
    fundItem['type'] = task.type ;
    fundItem['lastUpdate'] = today ;
    fundItem['unitNetWorth'] = fundArray[4];
    fundItem['dayOfGrowth'] = fundArray[5];
    fundItem['recent1Week'] = fundArray[6];
    fundItem['recent1Month'] = fundArray[7];
    fundItem['recent3Month'] = fundArray[8];
    fundItem['recent6Month'] = fundArray[9];
    fundItem['recent1Year'] = fundArray[10];
    fundItem['recent2Year'] = fundArray[11];
    fundItem['recent3Year'] = fundArray[12];
    fundItem['fromThisYear'] = fundArray[13];
    fundItem['fromBuild'] = fundArray[14];
    fundItem['serviceCharge'] = fundArray[20];
    fundItems.push(fundItem);
  }
  return fundItems;
};

function parseJsonObject(data) {
  const start = data.indexOf('{');
  const end = data.indexOf('}') + 1;
  const jsonStr = data.slice(start, end);
  const jsonObj = eval('(' + jsonStr + ')');

  return jsonObj
};


/// 将数据上传Mongo 服务器
function saveToMongo(funds) {
  const taskLength = funds.length
  var taskTimes = 1
  var waitListTimes = 1
  var createFundList
  var waitListLength = 0
  async.mapLimit(funds, 1, function (fund, callback) {
    Log.info('Start queryFund task2:' + taskTimes + '/' + taskLength)
    taskTimes += 1
    // 1) 检查基金是否存在
    Log.info('Start queryFund task data:' + fund.code)
    FundDB.queryFund(fund.code, function (resp) {
      Log.info('Finish queryFund task ' + taskTimes + 'data:' + resp.fundByCode)
      // 如果不存在,就添加到创建的 waitlist
      if (resp.fundByCode == null) {
        waitListLength++
        // return fund;
        callback(null, fund)
        // console.log(resp.fundByCode)
        
      } else {
        // 如果存在,就更新基金记录
        Log.success('Start api: updateFundIncrease, get code: ' + fund)
        FundIncreaseDB.updateFundIncrease(fund, function (resp) {
          Log.success('Finish updateFundIncrease task: ' + resp.updateFundIncrease)
          // console.log(resp.fundByCode)
          
        })
        callback(null, null)
      }
    })
  }, function (err, results) {

    // 2) 创建新基金和涨幅记录

    createFundList = results
    Log.info('create Fund List length is  ' + createFundList.length)
    async.mapLimit(createFundList, 1, async function (fund) {
      if (fund != null) {
        Log.info('Start waitList task:' + waitListTimes + '/' + waitListLength)
        // 创建新基金
        FundDB.createFund(fund, function (resp) {
          Log.info('Finish create Fund:  ' + resp.createFund)
        })
        FundDB.updateFundTag(fund, function (resp) {
          Log.info('Finish create Fund:  ' + resp.tags)
        })
        // 创建新基金涨幅记录
        FundIncreaseDB.createFundIncrease(fund, function (resp) {
          Log.info('Finish createFundIncrease:  ' + resp.createFundIncrease)
        })
        FundIncreaseDB.updateFundIncreaseTag(fund, function (resp) {
          Log.info('Finish createFundIncrease:  ' + resp.tags)
        })
      }
    })
  })
}

// 开始
exports.start = function start(data) {
  const allFunds = [];
  var times = 1;
  Log.success('Succeed start FundIncrease work: ' + data.length)
  if(data.length == 6){
  data.forEach(function(item) {
    
    // 1) 将采集数据格式化成 Json
    const funds = parseData(item.data, item.task); // 输入: 抓取页面的原始 html,输出: 基金列表
    console.log(funds.length);
    console.log(funds[0]);
    console.log(item.task)
    // 2) 保存本地 
    DB.write(item.task.storePath, funds)
    // 3) 添加到allFunds,统一做上传 mongdo 服务器的操作 
    // allFunds.push(funds);
    allFunds.push.apply(allFunds,funds);
  })
  Log.success('End 数据本地存储,次数= ' + times)
  console.log(allFunds.length);
  console.log(allFunds[0]);
  times ++
  // res.options.task.type,res.options.task.storePath
  // 3) 通过 api 服务,将数据保存到 mongo 服务器
  saveToMongo(allFunds);
}
}