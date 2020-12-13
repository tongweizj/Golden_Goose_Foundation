const Fund = require('../../models/fund');
const FundIncrease = require('../../models/fund-increase');

module.exports = {
  fund: ({ id }) => {
    try {
      console.log(id);
      // const bookFetched = await Book.find()
      // var query = { jd_id: new ObjectId(jd.id) };
      // var condition = id ? { id: id} : {};

      return Fund.findById(id);
    } catch (error) {
      throw error;
    }
  },
  fundByCode: ({ code }) => {
    try {
      console.log(code);
      // console.log(Fund.find({code:code}))
      // const bookFetched = await Book.find()
      // var query = { jd_id: new ObjectId(jd.id) };
      // var condition = id ? { id: id} : {};
      return Fund.findOne({ code: code });
    } catch (error) {
      throw error;
    }
  },
  funds: () => {
    try {
      // const bookFetched = await Book.find()
      // var condition = name ? { name: name} : {};
      return Fund.find();
    } catch (error) {
      throw error;
    }
  },
  createFund: async (args) => {
    const { name, code } = args.fund;
    try {
      const fund = new Fund({
        name: name,
        code: code,
      });
      // const newBook = await book.save()
      return fund.save(fund);
    } catch (error) {
      throw error;
    }
  },
  updateFund: ({ id, input }) => {
    try {
      // 输入数据检验
      console.log(id);
      return Fund.findByIdAndUpdate(id, input, { useFindAndModify: false });
    } catch (error) {
      throw error;
    }
  },

  updateFundTag: ({ code, tag }) => {
    try {
      // 输入数据检验
      console.log(code);
      console.log(tag);
      // Fund.findOneAndUpdate({code:code},{$addToSet:{tags:tag}},{new: true },function(err,docs){
      //   if(err) console.log(err);
      //   // console.log('更改成功'+String(docs))
      //   console.log('更改成功:' + JSON.stringify(docs, null, 4))
      //   return docs
      // })
      return Fund.findOneAndUpdate({ code: code }, { $addToSet: { tags: tag } }, { lean: true, new: true, useFindAndModify: false });
    } catch (error) {
      throw error;
    }
  },
  deleteFund: ({ id }) => {
    // 输入数据检验
    console.log(id);
    return Fund.findByIdAndRemove(id, { useFindAndModify: false });
  },

  fundIncrease: ({ code }) => {
    try {
      console.log(code);
      // console.log(Fund.find({code:code}))
      // const bookFetched = await Book.find()
      // var query = { jd_id: new ObjectId(jd.id) };
      // var condition = id ? { id: id} : {};
      return FundIncrease.findOne({ code: code });
    } catch (error) {
      throw error;
    }
  },
  fundsIncrease: () => {
    try {
      // const bookFetched = await Book.find()
      // var condition = name ? { name: name} : {};
      return FundIncrease.find();
    } catch (error) {
      throw error;
    }
  },

  createFundIncrease: async (args) => {
    const input = args.input;
    input['name'] = args.name;
    input['code'] = args.code;
    // console.log(input)
    try {
      const fundIncrease = new FundIncrease(input);
      return fundIncrease.save(fundIncrease);
    } catch (error) {
      throw error;
    }
  },

  updateFundIncrease: ({ code, update }) => {
    try {
      // 输入数据检验
      console.log(code);
      const filter = { code: code };
      return FundIncrease.findOneAndUpdate(filter, update, { lean: true, new: true, useFindAndModify: false });
    } catch (error) {
      throw error;
    }
  },

  updateFundIncreaseTag: ({ code, tag }) => {
    try {
      // 输入数据检验
      console.log(code);
      console.log(tag);
      const filter = { code: code };
      return FundIncrease.findOneAndUpdate(filter, { $addToSet: { tags: tag } }, { lean: true, new: true, useFindAndModify: false });
    } catch (error) {
      throw error;
    }
  },
  deleteFundIncrease: ({ code }) => {
    // 输入数据检验
    console.log(code);
    const filter = { code: code };
    return FundIncrease.findOneAndRemove(filter);
  },
};
