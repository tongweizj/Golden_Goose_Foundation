const { request, gql, GraphQLClient } = require('graphql-request')

const logger = require('../utils/log')
const config = require('../config')
const endpoint = config.api.testDb

exports.queryFund = function (code, callback) {
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

exports.createFund = function (fund, callback) {
  logger.log('info', 'Start api: createFund, get code:' + fund, {
    label: 'setp1'
  })

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

exports.updateFundTag = function (fund, callback) {
  logger.log('info', 'Start api: updateFundTag, get code:' + fund, {
    label: 'setp1'
  })

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
