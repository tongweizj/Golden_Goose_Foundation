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
    var fundsList =[]
    funds.myHolds.forEach(item => {
      item['lastdayIncome']=(item['amount']*item['holdingIncome']['lastday']).toFixed(2);
      item['holdingIncome']['totalRate']= (item['holdingIncome']['totalRate']*100).toFixed(2)
      item['cost']= (item['cost']).toFixed(2)
      item['holdingIncome']['lastday']= (item['holdingIncome']['lastday']*item['amount']).toFixed(2)
      item['holdingIncome']['total']= (item['holdingIncome']['total']).toFixed(2)
      item['holdingIncome']['all']= (item['holdingIncome']['total']-item['amount']*item['cost']).toFixed(2)
      fundsList.push(item); 
      console.log(item);    
    });

    // let fundsList = funds.myHolds;
    res.render('index', {
      title: '首页',
      path: '/',
      jobTitle: 'All',
      funds: fundsList,//funds.myHolds,
    });
  });
});

module.exports = router;
