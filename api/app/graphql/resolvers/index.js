const Book = require("../../models/book")
const Author = require("../../models/author")
const Company = require("../../models/company")
const Jd = require("../../models/jd")


module.exports = {
  company: ({name}) => {
    try {
      // const bookFetched = await Book.find()
      var condition = name ? { name: name} : {};
      return Company.find(condition)
      
    } catch (error) {
      throw error
    }
  },
  companies: ()  => {
    try {
      // const bookFetched = await Book.find()
      // var condition = name ? { name: name} : {};
      return Company.find()
      
    } catch (error) {
      throw error
    }
  },
  createCompany: async args => {
    const { name, hash,url,location} = args.company
    try {
      console.log('name')
     console.log(name)
      const company = new Company({
        name,
        hash,
        url,
        location
      })
      // const newBook = await book.save()
      return company.save(company)
    } catch (error) {
      throw error
    }
  },
  updateCompany: ({id, input}) => {
    try {
      // 输入数据检验
      console.log(id)
      return Company.findByIdAndUpdate(id, input, { useFindAndModify: false })
    } catch (error) {
      throw error
    }
  },
  deleteCompany: ({id}) => {
    // 输入数据检验
       console.log(id)
       return Company.findByIdAndRemove(id, { useFindAndModify: false })
   },
  jd: ({id}) => {
    try {
      console.log(id)
      // const bookFetched = await Book.find()
      // var query = { jd_id: new ObjectId(jd.id) };
      // var condition = id ? { id: id} : {};
      return Jd.findById(id)
      
    } catch (error) {
      throw error
    }
  },   
  jds: ()  => {
    try {
      // const bookFetched = await Book.find()
      // var condition = name ? { name: name} : {};
      return Jd.find()
      
    } catch (error) {
      throw error
    }
  },
  createJd: async args => {
    const { title, summary,url,company,location,postDate,salary,isEasyApply,jobTitle,hash} = args.jd
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
  },
  updateJd: ({id, input}) => {
    try {
      // 输入数据检验
      console.log(id)
      return Jd.findByIdAndUpdate(id, input, { useFindAndModify: false })
    } catch (error) {
      throw error
    }
  },
  deleteJd: ({id}) => {
    // 输入数据检验
       console.log(id)
       return Jd.findByIdAndRemove(id, { useFindAndModify: false })
   }
}