const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fundIncreaseSchema = new Schema({
  name: String,
  code: String,
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
});

module.exports = mongoose.model("fundIncrease", fundIncreaseSchema);