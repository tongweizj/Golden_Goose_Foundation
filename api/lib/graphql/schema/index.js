const {
  buildSchema
} = require("graphql")

module.exports = buildSchema(`
  type Fund {
    id:ID
    name: String!
    code: String!
    type: String
  }

  type FundIncrease{
    name: String,
    code: String!,
    type: String,
    lastUpdate:String,
    unitNetWorth:String,
    dayOfGrowth:String,
    recent1Week:String,
    recent3Month:String,
    recent6Month:String,
    recent1Year:String,
    recent2Year:String,
    recent3Year:String,
    fromThisYear:String,
    fromBuild:String,
    serviceCharge:String
  }

  input FundInput {
    name: String,
    code: String,
    type: String
  }

  input FundIncreaseInput{
    lastUpdate:String,
    unitNetWorth:String,
    dayOfGrowth:String,
    recent1Week:String,
    recent3Month:String,
    recent6Month:String,
    recent1Year:String,
    recent2Year:String,
    recent3Year:String,
    fromThisYear:String,
    fromBuild:String,
    serviceCharge:String
  }

  type Query {
    fund(id:ID!): Fund,
    fundByCode(code:String!): Fund,
    funds: [Fund],
    fundIncrease(code:String!): FundIncrease,
    fundsIncrease: [FundIncrease],
  }

  type Mutation {
    createFund(fund:FundInput): Fund,
    updateFund(id: ID!, input: FundInput): Fund,
    deleteFund(id: ID!): Fund,
    
    createFundIncrease(code: String!, name:String, type:String, input:FundIncreaseInput): FundIncrease,
    updateFundIncrease(code: String!, update: FundIncreaseInput): FundIncrease,
    deleteFundIncrease(code: String!): FundIncrease,
    
  }
  schema {
    query: Query
    mutation: Mutation
  }
`)