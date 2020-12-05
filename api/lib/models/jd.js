const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jdSchema = new Schema({
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
});

module.exports = mongoose.model("jd", jdSchema);