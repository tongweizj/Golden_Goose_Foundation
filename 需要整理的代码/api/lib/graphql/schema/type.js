const graphql = require("graphql");

const Company = require("../../models/company")
const Jd = require("../../models/jd")

// 定义Book的数据结构
// const BookType = new GraphQLObjectType({
//   name: "Book",
//   fields: () => ({
//     id: {
//       type: GraphQLID
//     },
//     name: {
//       type: GraphQLString
//     },
//     author: {
//       type: AuthorType,
//       resolve(parent, args) {
//         return _.find(authors, {
//           id: parent.authorId
//         });
//       }
//     }
//   })
// });


// 定义 Company 类型
//   type Company {
//     id:ID
//     hash: String!
//     name: String!
//     location: String
//   }
var companyType = new graphql.GraphQLObjectType({
  name: 'Company',
  fields: {
    id: {
      type: graphql.GraphQLID
    },
    hash: {
      type: graphql.GraphQLString
    },
    name: {
      type: graphql.GraphQLString
    },
    location: {
      type: graphql.GraphQLString
    },
  }
});

// 定义 Jd 类型
//   type Jd {
//     id:ID
//     title: String,
//     summary: String,
//     url: String,
//     company: String,
//     location: String,
//     postDate: String,
//     salary: String,
//     isEasyApply: Boolean,
//     jobTitle: String,
//     hash: String,
//   }
var jdType = new graphql.GraphQLObjectType({
  name: 'Jd',
  fields: {
    id: {
      type: graphql.GraphQLID
    },
    title: {
      type: graphql.GraphQLString
    },
    summary: {
      type: graphql.GraphQLString
    },
    url: {
      type: graphql.GraphQLString
    },
    company: {
      type: graphql.GraphQLString
    },
    location: {
      type: graphql.GraphQLString
    },
    postDate: {
      type: graphql.GraphQLString
    },
    salary: {
      type: graphql.GraphQLString
    },
    isEasyApply: {
      type: graphql.GraphQLBoolean
    },
    jobTitle: {
      type: graphql.GraphQLString
    },
    hash: {
      type: graphql.GraphQLString
    },
  }
});


// 定义 Query 类型
var queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    jd: {
      type: jdType,
      // `args` 描述了 `jd` 查询接受的参数
      args: {
        id: {
          type: graphql.GraphQLID
        }
      },
      resolve: (_, {
        id
      }) => {
        return Jd.findById(id)
      }
    },
    jds: {
      type: graphql.GraphQLList(jdType),
      // `args` 描述了 `jd` 查询接受的参数
      // args: {
      //   id: { type: graphql.GraphQLID }
      // },
      resolve: (parent, args) => {
        // console.log(Jd.find());
        try {
          // const bookFetched = await Book.find()
          // var condition = name ? { name: name} : {};
          return Jd.find({})

        } catch (error) {
          throw error
        }
      }
    },
    company: {
      type: companyType,
      // `args` 描述了 `jd` 查询接受的参数
      args: {
        id: {
          type: graphql.GraphQLID
        }
      },
      resolve: (_, {
        id
      }) => {
        return Company.findById(id)
      }
    },
    companies: {
      type: graphql.GraphQLList(companyType),
      // `args` 描述了 `jd` 查询接受的参数
      // args: {
      //   id: { type: graphql.GraphQLID }
      // },
      resolve: (parent, args) => {
        // console.log(Jd.find());
        try {
          // const bookFetched = await Book.find()
          // var condition = name ? { name: name} : {};
          return Company.find({})

        } catch (error) {
          throw error
        }
      }
    },
  }
});

// createJd(jd:JdInput): Jd,
// updateJd(id: ID!, input: JdInput): Jd,
// deleteJd(id: ID!): Jd,
// createCompany(company:CompanyInput): Company,
// updateCompany(id: ID!, input: CompanyInput): Company,
// deleteCompany(id: ID!): Company
var mutationType = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createJd:{
      type: jdType,
      args: {
        title: {
          type: graphql.GraphQLString
        },
        summary: {
          type: graphql.GraphQLString
        },
        url: {
          type: graphql.GraphQLString
        },
        company: {
          type: graphql.GraphQLString
        },
        location: {
          type: graphql.GraphQLString
        },
        postDate: {
          type: graphql.GraphQLString
        },
        salary: {
          type: graphql.GraphQLString
        },
        isEasyApply: {
          type: graphql.GraphQLBoolean
        },
        jobTitle: {
          type: graphql.GraphQLString
        },
        hash: {
          type: graphql.GraphQLString
        },
      },
      resolve(parent, args) {
        console.log(args);
        const { title, summary,url,company,location,postDate,salary,isEasyApply,jobTitle,hash} = args
        try {
          console.log('title')
         console.log(title)
          const jd = new Jd({
            title:title, 
            summary:summary,
            url:url,
            company:company,
            location:location,
            postDate:postDate,
            salary:salary,
            isEasyApply:isEasyApply,
            jobTitle:jobTitle,
            hash:hash
          })
          // const newBook = await book.save()
          return jd.save(jd)
        } catch (error) {
          throw error
        }
    }
    },
    updateJd:{
      type: jdType,
      args: {
        id: {
          type: graphql.GraphQLID
        },
        input:{
        title: {
          type: graphql.GraphQLString
        },
        summary: {
          type: graphql.GraphQLString
        },
        url: {
          type: graphql.GraphQLString
        },
        company: {
          type: graphql.GraphQLString
        },
        location: {
          type: graphql.GraphQLString
        },
        postDate: {
          type: graphql.GraphQLString
        },
        salary: {
          type: graphql.GraphQLString
        },
        isEasyApply: {
          type: graphql.GraphQLBoolean
        },
        jobTitle: {
          type: graphql.GraphQLString
        },
        hash: {
          type: graphql.GraphQLString
        }}
      },
      resolve(parent, args) {
        console.log(args);
        const { title, summary,url,company,location,postDate,salary,isEasyApply,jobTitle,hash} = args
        try {
          console.log('title')
         console.log(title)
          const jd = new Jd({
            title:title, 
            summary:summary,
            url:url,
            company:company,
            location:location,
            postDate:postDate,
            salary:salary,
            isEasyApply:isEasyApply,
            jobTitle:jobTitle,
            hash:hash
          })
          // const newBook = await book.save()
          return jd.save(jd)
        } catch (error) {
          throw error
        }
    }
    }
  }
 
});
// 构建schema并导出
// module.exports = new GraphQLSchema({
//   query: RootQuery
// });
module.exports = new graphql.GraphQLSchema({
  query: queryType,
  mutation:mutationType
});