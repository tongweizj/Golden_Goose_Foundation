const express = require('express');
const router = express.Router();
const path = require('path');
// const mongoose = require('mongoose');
// const Fund = mongoose.model('fund');
// const FundIncrease = mongoose.model('fundIncrease');
const MyHoldsApi = require('../graphql/my-holds');
router.get('/', (req, res) => {
  MyHoldsApi.queryMyHolds(function (funds) {
    console.log(funds.myHolds[0]);
    // let fundsList = funds.myHolds;
    res.render('index', {
      title: '首页',
      path: '/',
      jobTitle: 'All',
      funds: funds.myHolds,
    });
  });
});

module.exports = router;
