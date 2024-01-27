const { request, gql, GraphQLClient } = require('graphql-request')

const logger = require('../utils/log')
const config = require('../config')
const endpoint = config.api.testDb

// 更新一只基金的历史数据
exports.updateFundHistory = function (fund, callback) {
  logger.log('info', 'Start api: updateFundHistory, get code:' + fund, {
    label: 'setp1'
  })

  const query = gql`
    mutation($code: String!, $update: FundHistoryInput) {
      updateFundHistory(code: $code, update: $update) {
        code
        historty {
          date
          nav
          cnw
          changeRate
          openBuy
          openSell
        }
      }
    }
  `
  const variables = {
    code: fund[6],
    update: {
      date: fund[0],
      nav: parseFloat(fund[1]),
      cnw: parseFloat(fund[2]),
      changeRate: parseFloat(fund[3]),
      openBuy: fund[4] == '开放申购' ? true : false,
      openSell: fund[5] == '开放赎回' ? true : false
    }
  }
  const client = new GraphQLClient(endpoint, {
    headers: {
      Connection: 'keep-alive',
      'Accept-Encoding': '',
      'Accept-Language': 'en-US,en;q=0.8'
    }
  })
  client.request(query, variables).then(function (data) {
    callback(data)
  })
}
