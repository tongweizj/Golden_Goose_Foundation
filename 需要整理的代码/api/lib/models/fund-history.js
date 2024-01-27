const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fundHistorySchema = new Schema({
  code: String,
  historty: [
    {
      date: String,
      nav: Number,
      cnw: Number,
      changeRate: Number,
      openBuy: Boolean,
      openSell: Boolean,
    },
  ],
});

module.exports = mongoose.model('FundHistory', fundHistorySchema);
