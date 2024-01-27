const { request, gql, GraphQLClient } = require('graphql-request');
// const logger = require('../utils/log');
// const config = require('../config');
const endpoint = 'http://127.0.0.1:4000/graphql';

exports.queryMyHolds = function (callback) {
  const query = gql`
    query {
      myHolds {
        code
        name
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
  `;
  // console.log(variables);
  const client = new GraphQLClient(endpoint, {
    headers: {
      Connection: 'keep-alive',
      'Accept-Encoding': '',
      'Accept-Language': 'en-US,en;q=0.8',
    },
  });
  client.request(query).then(function (data) {
    callback(data);
  });
};

exports.queryMyHoldByCode = function (code,callback) {
  const query = gql`
  query ($code: String!) {
    myHoldByCode(
    code:$code
  ){
    code
    name
    amount
    cost
    holdingIncome{
        lastday
        lastdayRate
        total
        totalRate
      }
  }}
  `;
  const variables = {
    code: code
  }
  // console.log(variables);
  const client = new GraphQLClient(endpoint, {
    headers: {
      Connection: 'keep-alive',
      'Accept-Encoding': '',
      'Accept-Language': 'en-US,en;q=0.8',
    },
  });
  client.request(query,variables).then(function (data) {
    callback(data);
  });
};

exports.updateMyHolds = function (code,amount,cost,callback) {
  const query = gql`
  mutation($code:String!,$amount:Float!,$cost:Float!){
    updateMyHolds(code:$code,amount:$amount,cost:$cost){
      code
      amount
      cost
      holdingIncome{
        lastday
        lastdayRate
        total
        totalRate
      }
    }
  }
  `;
  const variables = {
    code: code,
    amount: parseFloat(amount),
    cost:parseFloat(cost)
  }
  // console.log(variables);
  const client = new GraphQLClient(endpoint, {
    headers: {
      Connection: 'keep-alive',
      'Accept-Encoding': '',
      'Accept-Language': 'en-US,en;q=0.8',
    },
  });
  client.request(query,variables).then(function (data) {
    callback(data);
  });
};