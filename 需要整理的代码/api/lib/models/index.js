const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.testUrl = dbConfig.testUrl;
db.fundIncrease = require("./fund-increase.js")(mongoose);
db.fund = require("./fund.js")(mongoose);
module.exports = db;
