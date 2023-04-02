const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myHoldsSchema = new Schema({
  code: String,
  name: String,
  amount: Number,
  cost: Number,
  holdingIncome: {
    lastday: Number,
    lastdayRate: Number,
    total: Number,
    totalRate: Number,
  },
});

module.exports = mongoose.model('myHolds', myHoldsSchema);
