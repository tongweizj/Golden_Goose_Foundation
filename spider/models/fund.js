const { request, gql, GraphQLClient } = require('graphql-request')
const config = require('../config')
const api = config.api
const Log = require('../utils/log')

exports.queryFund = function (code, callback) {
  // Log.success('Succeed start mongo api, get code: ' + code)
  const query = gql`
    query($code: String!) {
      fundByCode(code: $code) {
        id
        name
        code
        tags
      }
    }
  `
  const variables = {
    code: code
  }
  // console.log(variables);
  const client = new GraphQLClient(api.db, {
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

exports.createFund = function (fund, callback) {
  Log.success('Start api: createFund, get code: ' + fund)
  const query = gql`
    mutation($fund: FundInput) {
      createFund(fund: $fund) {
        name
        code
      }
    }
  `
  const variables = {
    fund: {
      name: fund.name,
      code: fund.code
    }
  }
  const client = new GraphQLClient(api.db, {
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

exports.updateFundTag = function (fund, callback) {
  Log.success('Start api: updateFundTag, get code: ' + fund)
  const query = gql`
    mutation($code: String!, $tag: String!) {
      updateFundTag(code: $code, tag: $tag) {
        name
      }
    }
  `
  const variables = {
    code: fund.code,
    tag: fund.type
  }
  const client = new GraphQLClient(api.db, {
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
