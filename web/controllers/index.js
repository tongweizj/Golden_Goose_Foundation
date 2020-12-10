const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const Fund = mongoose.model('fund');
const FundIncrease = mongoose.model('fundIncrease');


router.get('/', (req, res) => {
  Fund.find().sort({
      postDate: -1
    })
    .then((funds) => {
      // console.log(jds)
      res.render('index', {
        title: 'Home | zhaoWork.ca',
        path: '/',
        jobTitle:'All',
        funds
      });
    })
    .catch(() => {
      res.send('Sorry! Something went wrong.');
    });
});

// router.get('/fundranking', (req, res) => {
//   Jds.find({jobTitle:'machine learning engineer'}).sort({
//       postDate: -1
//     })
//     .then((jds) => {
//       // console.log(jds)
//       res.render('index', {
//         title: 'Home | zhaoWork.ca',
//         path: '/',
//         jobTitle:'ML',
//         jds
//       });
//     })
//     .catch(() => {
//       res.send('Sorry! Something went wrong.');
//     });
// });




module.exports = router;