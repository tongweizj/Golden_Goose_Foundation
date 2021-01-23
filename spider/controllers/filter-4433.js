'use strict'
const FundIncreaseDB = require('../graphql/fund-increase')

function analyze(funds) {
  let recent3Month = funds.sort(sortFundByRecent3Month)
  recent3Month = recent3Month.slice(0, recent3Month.length / 4)

  let recent6Month = funds.sort(sortFundByRecent6Month)
  recent6Month = recent6Month.slice(0, recent6Month.length / 4)

  let recent1Year = funds.sort(sortFundByRecent1Year)
  recent1Year = recent1Year.slice(0, recent1Year.length / 5)

  let recent2Year = funds.sort(sortFundByRecent2Year)
  recent2Year = recent2Year.slice(0, recent2Year.length / 5)

  let recent3Year = funds.sort(sortFundByRecent3Year)
  recent3Year = recent3Year.slice(0, recent3Year.length / 5)

  let fromBuild = funds.sort(sortFundByFromBuild)
  fromBuild = fromBuild.slice(0, fromBuild.length / 4)

  let intersect = recent3Month.filter(function (fund) {
    return recent6Month.indexOf(fund) >= 0
  })

  intersect = intersect.filter(function (fund) {
    return recent1Year.indexOf(fund) >= 0
  })

  intersect = intersect.filter(function (fund) {
    return recent2Year.indexOf(fund) >= 0
  })

  intersect = intersect.filter(function (fund) {
    return recent3Year.indexOf(fund) >= 0
  })

  intersect = intersect.filter(function (fund) {
    return fromBuild.indexOf(fund) >= 0
  })

  intersect.forEach(fund => {
    const rank3Month = recent3Month.indexOf(fund) + 1
    const rank6Month = recent6Month.indexOf(fund) + 1
    const rank1Year = recent1Year.indexOf(fund) + 1
    const rank2Year = recent2Year.indexOf(fund) + 1
    const rank3Year = recent3Year.indexOf(fund) + 1
    const rankFromBuild = fromBuild.indexOf(fund) + 1

    fund['rank3Month'] = rank3Month
    fund['rank6Month'] = rank6Month
    fund['rank1Year'] = rank1Year
    fund['rank2Year'] = rank2Year
    fund['rank3Year'] = rank3Year
    fund['rankFromBuild'] = rankFromBuild
    fund['totalFunds'] = funds.length
  })

  return intersect
}
// exports.analyze = analyze

function sortFundByRecent3Month(fund1, fund2) {
  return sortFund(fund1, fund2, 'recent3Month')
}

function sortFundByRecent6Month(fund1, fund2) {
  return sortFund(fund1, fund2, 'recent6Month')
}

function sortFundByRecent1Year(fund1, fund2) {
  return sortFund(fund1, fund2, 'recent1Year')
}

function sortFundByRecent2Year(fund1, fund2) {
  return sortFund(fund1, fund2, 'recent2Year')
}

function sortFundByRecent3Year(fund1, fund2) {
  return sortFund(fund1, fund2, 'recent3Year')
}

function sortFundByFromBuild(fund1, fund2) {
  return sortFund(fund1, fund2, 'fromBuild')
}

function sortFund(fund1, fund2, key) {
  const result =
    parseFloat(fund2[key] || -32678) - parseFloat(fund1[key] || -32678)
  return result
}

// exports.start = function () {
//   FundIncreaseDB.queryAllFundIncreaseByTag('zs', function (resp) {
//     // console.log(resp.fundsIncreaseByTag.length)
//     console.log('Session: %j', analyze(resp.fundsIncreaseByTag))
//     return analyze(resp.fundsIncreaseByTag)
//   })
// }

exports.start = function () {
  // 1. 获取全部基金

  FundIncreaseDB.queryAllFundIncrease(function (resp) {
    // console.log('fundsIncrease:%j', resp.fundsIncrease[1].name)
    const funds = resp.fundsIncrease
    console.log('fundsIncrease: ', funds.length)
    // const funds = JSON.parse(resp.fundsIncrease)
    // console.log('fundsIncrease: %j', funds.length)
    // 2. 将基金数据从到分析程序中过滤
    const recommendFunds = analyze(funds)
    console.log('recommendFunds: ' + recommendFunds.length)
    // 3. 将 4433 基金打标签
    recommendFunds.forEach(fund => {
      let newFund = {
        code: fund.code,
        type: '4433'
      }
      FundIncreaseDB.updateFundIncreaseTag(newFund, function (resp) {
        // Log.info('Finish createFundIncrease:  ' + resp.tags)
      })
    })
    // return analyze(resp.fundsIncrease)
  })
}
