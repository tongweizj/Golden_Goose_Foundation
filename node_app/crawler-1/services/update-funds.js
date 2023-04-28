var async = require('async')
const logger = require('../utils/log')
const FundDB = require('../graphql/fund')
const FundIncreaseDB = require('../graphql/fund-increase')
const createFund = require('./create-funds')

/// 将数据上传Mongo 服务器
function saveToMongo(funds) {
  // const taskLength = funds.length
  var taskTimes = 0
  // var waitListTimes = 1
  // var createFundList
  var waitListLength = 0
  async.mapLimit(
    funds,
    1,
    function (fund, callback) {
      // 1) 检查基金是否存在
      FundDB.queryFund(fund.code, function (resp) {
        // 如果不存在,就添加到创建的 waitlist
        if (resp.fundByCode == null) {
          logger.log('info', waitListLength + '. New Fund:' + fund.code, {
            label: 'save2Mongo'
          })
          waitListLength++
          callback(null, fund)
          // console.log(resp.fundByCode)
        } else {
          // 如果存在,就更新基金记录
          // TODO: 升级没有返回数据,不知道成功与否
          async.series(
            [
              function (callback) {
                FundIncreaseDB.updateFundIncrease(fund, function (resp) {
                  logger.log(
                    'info',
                    taskTimes + '. update FundIncrease:' + fund.code,
                    {
                      label: 'save2Mongo'
                    }
                  )
                })
              },
              function (callback) {
                FundDB.updateFundTag(fund, function (resp) {
                  // callback(null, resp)
                })
              },
              function (callback) {
                FundIncreaseDB.updateFundIncreaseTag(fund, function (resp) {
                  // callback(null, resp)
                })
              }
            ],

            function (err, results) {
              //最后结果
              // callback(null, results)
            }
          )

          taskTimes += 1
          callback(null, '')
        }
      })
    },
    function (err, results) {
      // 2) 创建新基金和涨幅记录
      let funds = []
      results.forEach(item => {
        if (item != '') {
          funds.push(item)
        }
      })
      console.log('createFundList.length:' + funds.length)
      if (funds.length > 0) {
        createFund(funds)
      }
    }
  )
}
module.exports = saveToMongo
