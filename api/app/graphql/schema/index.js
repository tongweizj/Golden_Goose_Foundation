const {
  buildSchema
} = require("graphql")

module.exports = buildSchema(`
  type Company {
    id:ID
    hash: String!
    name: String!
    location: String
  }
  input CompanyInput {
    hash: String!
    name: String!
    location: String
  }
  type Jd {
    id:ID
    title: String,
    summary: String,
    url: String,
    company: String,
    location: String,
    postDate: String,
    salary: String,
    isEasyApply: Boolean,
    jobTitle: String,
    hash: String,
  }
  input JdInput {
    title: String!,
    summary: String,
    url: String,
    company: String,
    location: String,
    postDate: String,
    salary: String,
    isEasyApply: Boolean,
    jobTitle: String,
    hash: String!,
  }
  type Query {
    jd(id:ID!): Jd,
    jds: [Jd],
    company(name:String!): [Company],
    companies: [Company],
  }
  type Mutation {
    createJd(jd:JdInput): Jd,
    updateJd(id: ID!, input: JdInput): Jd,
    deleteJd(id: ID!): Jd,
    createCompany(company:CompanyInput): Company,
    updateCompany(id: ID!, input: CompanyInput): Company,
    deleteCompany(id: ID!): Company
  }
  schema {
    query: Query
    mutation: Mutation
  }
`)