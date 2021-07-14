const Crawler = require('crawler')
const async = require('async') // 控制并发数，防止被封IP
const MyHoldsApi = require('../graphql/my-holds')
const TaskQueue = require('../crawler/taskQueue2')
const config = require('../config')
const logger = require('../utils/log')
const parse = require('../crawler/parse')
const saveToMongo = require('../services/update-my-holds')
let count = 0 // 已采集总数

function spider() {
  // 1. 抓取所有持有基金

  // 1) 检查基金是否存在
  MyHoldsApi.queryMyHolds(function (resp) {
    // 2)整理出一个采集列表
    // console.log(resp.myHolds)
    let fundList = []
    resp.myHolds.map(item => {
      fundList.push(item.code)
    })
    // console.log(fundList)
    // 2. 抓取这些基金的最新价格
    let taskQueue = TaskQueue.start(config.crawl.fundPriceUri, fundList)
    console.log(taskQueue)
    console.log('Setp1:抓取一级页面,总共：' + taskQueue.count + '条')
    console.log('----------------------------')
    const crawler = new Crawler({
      rateLimit: 1000, // between two tasks, minimum time gap is 1000 (ms)
      maxConnections: 1
    })
    const crawlerCallback = function (task, callback) {
      return function (error, res, done) {
        if (error) {
          logger.log('error', error, { label: 'setp1' })
        } else {
          logger.log('info', 'Succeed to crawl:' + res.options.uri, {
            label: 'setp1'
          })
          callback(null, { data: res.body, task: res.options.task })
        }
        done()
      }
    }
    // 使用async控制异步抓取
    // mapLimit(arr, limit, iterator, [callback])
    async.mapLimit(
      taskQueue.tasks,
      1,
      function (task, callback) {
        count++
        console.log(
          count + '/' + taskQueue.count + '.' + '异步回调的url:' + task.type
        )
        crawler.queue({
          uri: task.uri,
          headers: task.headers,
          task: task,
          callback: crawlerCallback(task, callback)
        })
      },
      function (err, result) {
        console.log('一级页面抓取完成，共有数据：' + result.length)
        // console.log(result)
        let fundPriceList = []
        // 1) 将采集数据格式化成 Json
        result.forEach(function (item) {
          // 1) 将采集数据格式化成 Json
          //console.log(item)
          //console.log(item.task.type)
          const fundPrice = parse.fundPrice(item.data) // 输入: 抓取页面的原始 html,输出: 基金列表
          fundPrice.push(item.task.type)
          fundPriceList.push(fundPrice)
        })
        // 3. 存储数据库
        console.log('----------------------------')
        saveToMongo(fundPriceList)
      }
    )
  })
}
module.exports = spider
