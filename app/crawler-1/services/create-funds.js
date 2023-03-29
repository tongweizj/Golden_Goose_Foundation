var async = require('async')
const logger = require('../utils/log')
const FundDB = require('../graphql/fund')
const FundIncreaseDB = require('../graphql/fund-increase')

/// 将数据上传Mongo 服务器
function createFund(funds) {
  console.log('2createFundList.length:' + funds.length)
  async.mapLimit(
    funds,
    1,
    function (fund, callback) {
      // console.log('2create fund:%j' + funds)
      // 1) 创建新基金和涨幅记录
      async.series(
        [
          function (callback) {
            FundDB.createFund(fund, function (resp) {
              callback(null, resp)
            })
          },
          function (callback) {
            FundDB.updateFundTag(fund, function (resp) {
              callback(null, resp)
            })
          },
          function (callback) {
            FundIncreaseDB.createFundIncrease(fund, function (resp) {
              callback(null, resp)
            })
          },
          function (callback) {
            FundIncreaseDB.updateFundIncreaseTag(fund, function (resp) {
              callback(null, resp)
            })
          }
        ],

        function (err, results) {
          //最后结果
          callback(null, results)
        }
      )
    },
    function (err, results) {
      // 2) 创建新基金和涨幅记录
      results
      logger.log(
        'info',
        'Finish create Fund List length is:' + results.length,
        {
          label: 'save2Mongo'
        }
      )
    }
  )
}
module.exports = createFund
