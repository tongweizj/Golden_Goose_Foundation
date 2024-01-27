const { request, gql, GraphQLClient } = require('graphql-request')

const config = require('../config')
const endpoint = config.api.testDb
const logger = require('../utils/log')
exports.queryAllFundIncrease = function (callback) {
  const query = gql`
    query {
      fundsIncrease {
        name
        code
        tags
        unitNetWorth
        dayOfGrowth
        recent1Week
        recent1Month
        recent3Month
        recent6Month
        recent1Year
        recent2Year
        recent3Year
        fromThisYear
        fromBuild
        serviceCharge
      }
    }
  `

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

exports.queryAllFundIncreaseByTag = function (tag, callback) {
  const query = gql`
    query($tag: String!) {
      fundsIncreaseByTag(tag: $tag) {
        name
        code
        tags
        unitNetWorth
        dayOfGrowth
        recent1Week
        recent1Month
        recent3Month
        recent6Month
        recent1Year
        recent2Year
        recent3Year
        fromThisYear
        fromBuild
        serviceCharge
      }
    }
  `
  const variables = {
    tag: tag
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

exports.queryFundIncrease = function (code, callback) {
  const query = gql`
    query($code: String!) {
      fundIncrease(code: $code) {
        name
        code
        lastUpdate
        dayOfGrowth
        tags
      }
    }
  `
  const variables = {
    code: code
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

exports.createFundIncrease = function (fund, callback) {
  logger.log('info', 'Start api: createFundIncrease, get code:' + fund.code, {
    label: 'setp1'
  })

  const query = gql`
    mutation($code: String!, $name: String, $input: FundIncreaseInput) {
      createFundIncrease(code: $code, name: $name, input: $input) {
        name
        code
      }
    }
  `
  const variables = {
    code: fund.code,
    name: fund.name,
    input: {
      lastUpdate: fund.lastUpdate,
      unitNetWorth: fund.unitNetWorth,
      dayOfGrowth: fund.dayOfGrowth,
      recent1Week: fund.recent1Week,
      recent1Month: fund.recent1Month,
      recent3Month: fund.recent3Month,
      recent6Month: fund.recent6Month,
      recent1Year: fund.recent1Year,
      recent2Year: fund.recent2Year,
      recent3Year: fund.recent3Year,
      fromThisYear: fund.fromThisYear,
      fromBuild: fund.fromBuild,
      serviceCharge: fund.serviceCharge
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

exports.updateFundIncrease = function (fund, callback) {
  logger.log('info', 'Start api: updateFundIncrease, get code:' + fund.code, {
    label: 'setp1'
  })

  const query = gql`
    mutation($code: String!, $update: FundIncreaseInput) {
      updateFundIncrease(code: $code, update: $update) {
        name
        code
        lastUpdate
        fromBuild
        dayOfGrowth
      }
    }
  `
  const variables = {
    code: fund.code,
    update: {
      lastUpdate: fund.lastUpdate,
      unitNetWorth: fund.unitNetWorth,
      dayOfGrowth: fund.dayOfGrowth,
      recent1Week: fund.recent1Week,
      recent1Month: fund.recent1Month,
      recent3Month: fund.recent3Month,
      recent6Month: fund.recent6Month,
      recent1Year: fund.recent1Year,
      recent2Year: fund.recent2Year,
      recent3Year: fund.recent3Year,
      fromThisYear: fund.fromThisYear,
      fromBuild: fund.fromBuild,
      serviceCharge: fund.serviceCharge
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

exports.updateFundIncreaseTag = function (fund, callback) {
  logger.log(
    'info',
    'Start api: updateFundIncreaseTag, get code:' + fund.code,
    {
      label: 'setp1'
    }
  )

  const query = gql`
    mutation($code: String!, $tag: String!) {
      updateFundIncreaseTag(code: $code, tag: $tag) {
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
