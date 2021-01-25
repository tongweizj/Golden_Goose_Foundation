const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Fund {
    id:ID
    name: String!
    code: String!
    tags: [String]
  }

  type MyHolds {
    code: String!
    amount: Float!
    cost: Float!
    holdingIncome:incomeMapTuple
  }
  type incomeMapTuple {
    lastday: Float,
    lastdayRate: Float,
    total: Float,
    totalRate: Float,
  }
  type FundIncrease{
    name: String,
    code: String!,
    tags: [String],
    lastUpdate:String,
    unitNetWorth:String,
    dayOfGrowth:String,
    recent1Week:String,
    recent1Month:String,
    recent3Month:String,
    recent6Month:String,
    recent1Year:String,
    recent2Year:String,
    recent3Year:String,
    fromThisYear:String,
    fromBuild:String,
    serviceCharge:String
  }
  type FundHistory {
    code: String!
    historty: [historyMapTuple]
  }
  type historyMapTuple {
    date: String,
    nav: Float,
    cnw: Float,
    changeRate: Float,
    openBuy:Boolean,
    openSell:Boolean
  }
  input FundInput {
    name: String,
    code: String
  }

  input FundIncreaseInput{
    lastUpdate:String,
    unitNetWorth:String,
    dayOfGrowth:String,
    recent1Week:String,
    recent1Month:String,
    recent3Month:String,
    recent6Month:String,
    recent1Year:String,
    recent2Year:String,
    recent3Year:String,
    fromThisYear:String,
    fromBuild:String,
    serviceCharge:String
  }
  input myHoldsInput {
    code: String!,
    amount: Float!,
    cost: Float!,
    holdingIncome:IncomeInput!
  }
  input IncomeInput {
    lastday: Float,
    lastdayRate: Float,
    total: Float,
    totalRate: Float,
  }
  input FundHistoryInput {
    date: String,
    nav: Float,
    cnw: Float,
    changeRate: Float,
    openBuy:Boolean,
    openSell:Boolean
  }
  
  type Query {
    fund(id:ID!): Fund,
    fundByCode(code:String!): Fund,
    funds: [Fund],
    fundHistory(code:String!): [FundHistory],
    fundIncrease(code:String!): FundIncrease,
    fundsIncrease: [FundIncrease],
    fundsIncreaseByTag(tag:String!): [FundIncrease],
    myHolds:[MyHolds],
  }

  type Mutation {
    createFund(fund:FundInput): Fund,
    updateFund(id: ID!, input: FundInput): Fund,
    deleteFund(id: ID!): Fund,
    updateFundTag(code:String!,tag:String!):Fund,
    
    createFundIncrease(code: String!, name:String, input:FundIncreaseInput): FundIncrease,
    updateFundIncrease(code: String!, update: FundIncreaseInput): FundIncrease,
    updateFundIncreaseTag(code:String!,tag:String!):FundIncrease,
    deleteFundIncrease(code: String!): FundIncrease,

    updateFundHistory(code: String!, update: FundHistoryInput): FundHistory,

    addMyHolds(fund:myHoldsInput): MyHolds,
    
  }
  schema {
    query: Query
    mutation: Mutation
  }
`);
