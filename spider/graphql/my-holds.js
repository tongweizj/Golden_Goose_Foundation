const { request, gql, GraphQLClient } = require('graphql-request')
const logger = require('../utils/log')
const config = require('../config')
const endpoint = config.api.testDb

exports.queryMyHolds = function (callback) {
  const query = gql`
    query {
      myHolds {
        code
        cost
        amount
        holdingIncome {
          lastday
          lastdayRate
          total
          totalRate
        }
      }
    }
  `
  // console.log(variables);
  const client = new GraphQLClient(endpoint, {
    headers: {
      Connection: 'keep-alive',
      'Accept-Encoding': '',
      'Accept-Language': 'en-US,en;q=0.8'
    }
  })
  client.request(query).then(function (data) {
    callback(data)
  })
}

exports.updateHoldingIncome = function (data,callback) {
  console.log(data)
  const query = gql`
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
  `
  const variables = {
      "code": data[0],
      "update": data[1]
  }
  console.log(variables)
  // console.log(variables);
  const client = new GraphQLClient(endpoint, {
    headers: {
      Connection: 'keep-alive',
      'Accept-Encoding': '',
      'Accept-Language': 'en-US,en;q=0.8'
    }
  })
  client.request(query,variables).then(function (data) {
    callback(data)
  })
}