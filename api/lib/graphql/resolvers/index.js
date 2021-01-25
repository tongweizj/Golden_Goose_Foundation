const Fund = require('../../models/fund');
const FundIncrease = require('../../models/fund-increase');
const MyHolds = require('../../models/my-holds');
const FundHistory = require('../../models/fund-history');
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
  fundsIncreaseByTag: ({ tag }) => {
    try {
      // const bookFetched = await Book.find()
      // var condition = name ? { name: name} : {};
      return FundIncrease.find({ tags: tag });
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

  myHolds: () => {
    try {
      // const bookFetched = MyHolds.find();
      // console.log(bookFetched);
      return MyHolds.find();
    } catch (error) {
      throw error;
    }
  },
  addMyHolds: async (args) => {
    const { code, amount, cost, holdingIncome } = args.fund;
    console.log(code);
    console.log('%j', args.fund);
    try {
      const myHold = new MyHolds({
        code: code,
        amount: amount,
        cost: cost,
        holdingIncome: {
          lastday: holdingIncome.lastday,
          lastdayRate: holdingIncome.lastdayRate,
          total: holdingIncome.total,
          totalRate: holdingIncome.totalRate,
        },
      });

      return myHold.save(myHold);
    } catch (error) {
      throw error;
    }
  },
  // 根据基金编码查询基金历史价格
  fundHistory: ({ code }) => {
    try {
      console.log(code);
      // console.log(Fund.find({code:code}))
      // const bookFetched = await Book.find()
      // var query = { jd_id: new ObjectId(jd.id) };
      // var condition = id ? { id: id} : {};
      return FundHistory.findOne({ code: code });
    } catch (error) {
      throw error;
    }
  },
  // 更新基金历史价格
  updateFundHistory: async ({ code, update }) => {
    try {
      // 输入数据检验
      // console.log(code);
      // console.log(update);
      const filter = { code: code };
      let respone = await FundHistory.find(filter);
      if (respone.length == 0) {
        const newUpdate = {
          code: code,
          historty: [update],
        };
        return await FundHistory.create(newUpdate);
      }
      const lastday = respone[0].historty.slice(-1)[0];
      if (lastday.date != update.date) {
        const newUpdate = {
          historty: [update],
        };
        return await FundHistory.findOneAndUpdate(filter, { $addToSet: newUpdate }, { lean: true, new: true, useFindAndModify: false });
      }
    } catch (error) {
      throw error;
    }
  },
};
