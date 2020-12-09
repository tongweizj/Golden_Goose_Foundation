const { request, gql, GraphQLClient }  = require('graphql-request');
const mongDBUrl = 'http://192.168.0.100:2000/graphql';
// const mongDBUrl = 'http://127.0.0.1:4000/graphql';
const Log = require('../utils/log');

exports.queryFund = function(code, callback) {
  // Log.success('Succeed start mongo api, get code: ' + code)
    const query = gql`
    query ($code: String!) {
        fundByCode(
        code:$code
      ){
        id
        name
        code
        tags
      }}
    `
    const variables = {
        "code": code,
      };
    // console.log(variables);
    const client = new GraphQLClient(mongDBUrl, { 
      headers: {
        'Connection': 'keep-alive',
        'Accept-Encoding': '',
        'Accept-Language': 'en-US,en;q=0.8'} })
    client.request(query, variables).then(function(data) {
     callback(data)
    })    
}


exports.createFund = function(fund,callback) {
  Log.success('Start api: createFund, get code: ' + fund)
    const query = gql`
    mutation($fund:FundInput){
        createFund(fund:$fund){
          name
          code
        }
      }
    `
    const variables = {
        "fund": {
            "name":fund.name ,
            "code":fund.code,
          }
        };
    const client = new GraphQLClient(mongDBUrl, { 
      headers: {
        'Connection': 'keep-alive',
        'Accept-Encoding': '',
        'Accept-Language': 'en-US,en;q=0.8'} })
    client.request(query, variables).then(function(data) {
      callback(data)
    }) 
}

exports.updateFundTag = function(fund,callback) {
  Log.success('Start api: updateFundTag, get code: ' + fund)
    const query = gql`
    mutation($code:String!,$tag:String!){
      updateFundTag(code:$code,tag:$tag){
        name
      }
    }
    `
    const variables = {
            "code":fund.code ,
            "tag":fund.type,
        };
    const client = new GraphQLClient(mongDBUrl, { 
      headers: {
        'Connection': 'keep-alive',
        'Accept-Encoding': '',
        'Accept-Language': 'en-US,en;q=0.8'} })
    client.request(query, variables).then(function(data) {
      callback(data)
    }) 
}
exports.queryFundIncrease = function(code,callback) {

    const query = gql`
    query($code:String!){
      fundIncrease(code:$code){
        name
        code
        lastUpdate
        dayOfGrowth
        tags
      }
    }
    `
    const variables = {
      "code": code,
    };
    const client = new GraphQLClient(mongDBUrl, { 
      headers: {
        'Connection': 'keep-alive',
        'Accept-Encoding': '',
        'Accept-Language': 'en-US,en;q=0.8'} })
    client.request(query, variables).then(function(data) {
      callback(data)
     })
}

exports.createFundIncrease = function(fund,callback) {
  Log.success('Start api:createFundIncrease:' + fund.code)
    const query = gql`
    mutation($code:String!,$name:String,$input:FundIncreaseInput){
      createFundIncrease(code:$code, name:$name, input:$input){
        name
        code
      }
    }
    `
    const variables = {
      "code": fund.code,
      "name": fund.name,
      "input": {
        "lastUpdate": fund.lastUpdate,
        "unitNetWorth": fund.unitNetWorth,
        "dayOfGrowth": fund.dayOfGrowth,
        "recent1Week": fund.recent1Week,
        "recent1Month": fund.recent1Month,
        "recent3Month": fund.recent3Month,
        "recent6Month": fund.recent6Month,
        "recent1Year": fund.recent1Year,
        "recent2Year": fund.recent2Year,
        "recent3Year": fund.recent3Year,
        "fromThisYear": fund.fromThisYear,
        "fromBuild": fund.fromBuild,
        "serviceCharge": fund.serviceCharge
      }
    };
    const client = new GraphQLClient(mongDBUrl, { 
      headers: {
        'Connection': 'keep-alive',
        'Accept-Encoding': '',
        'Accept-Language': 'en-US,en;q=0.8'} })
    client.request(query, variables).then(function(data) {
      callback(data)
    })
}


exports.updateFundIncrease = function(fund,callback) {
  Log.success('Start api:updateFundIncrease: ' + fund.code)
    const query = gql`
    mutation($code:String!,$update:FundIncreaseInput){
      updateFundIncrease(code:$code,update:$update){
        name
        code
        lastUpdate
        fromBuild
        dayOfGrowth
      }
    }
    `
    const variables = {
      "code": fund.code,
      "update": {
        "lastUpdate": fund.lastUpdate,
        "unitNetWorth": fund.unitNetWorth,
        "dayOfGrowth": fund.dayOfGrowth,
        "recent1Week": fund.recent1Week,
        "recent1Month": fund.recent1Month,
        "recent3Month": fund.recent3Month,
        "recent6Month": fund.recent6Month,
        "recent1Year": fund.recent1Year,
        "recent2Year": fund.recent2Year,
        "recent3Year": fund.recent3Year,
        "fromThisYear": fund.fromThisYear,
        "fromBuild": fund.fromBuild,
        "serviceCharge": fund.serviceCharge
      }
    };
    const client = new GraphQLClient(mongDBUrl, { 
      headers: {
        'Connection': 'keep-alive',
        'Accept-Encoding': '',
        'Accept-Language': 'en-US,en;q=0.8'} })
    client.request(query, variables).then(function(data) {
      callback(data)
    }
    )
}


exports.updateFundIncreaseTag = function(fund,callback) {
  Log.success('Start api: updateFundIncreaseTag, get code: ' + fund)
    const query = gql`
    mutation($code:String!,$tag:String!){
      updateFundIncreaseTag(code:$code,tag:$tag){
        name
      }
    }
    `
    const variables = {
            "code":fund.code ,
            "tag":fund.type,
        };
    const client = new GraphQLClient(mongDBUrl, { 
      headers: {
        'Connection': 'keep-alive',
        'Accept-Encoding': '',
        'Accept-Language': 'en-US,en;q=0.8'} })
    client.request(query, variables).then(function(data) {
      callback(data)
    }) 
}