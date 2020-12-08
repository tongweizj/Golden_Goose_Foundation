const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fundSchema = new Schema({
  name: String,
  code: String,
  tags: Array
});

module.exports = mongoose.model("fund", fundSchema);