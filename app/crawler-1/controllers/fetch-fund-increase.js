const async = require('async') // 控制并发数，防止被封IP
const Crawler = require('crawler')

const TaskQueue = require('../crawler/taskQueue')
const logger = require('../utils/log')
const parseDataFI = require('../crawler/parse-fund-increase')
const saveToLocal = require('../utils/save2csv')
const saveToMongo = require('../services/update-funds')
const Analyzer = require('./filter-4433')
// const Spider2 = require('./spider2')
// const DB = require('../lib/mongo')
let count = 0 // 已采集总数

function spider() {
  let uriList = [
    'gp', // 股票型
    'hh', // 混合型
    'zq', // 债券型
    'zs', // 指数型
    'qdii', // QDII
    'fof' // FOF
  ]
  // let uriListTest = [
  //   'gp' // 股票型
  // ]
  let taskQueue = TaskQueue.start(uriList)
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

      // 1) 将采集数据格式化成 Json
      result.forEach(function (item) {
        // 1) 将采集数据格式化成 Json
        const funds = parseDataFI(item.data, item.task) // 输入: 抓取页面的原始 html,输出: 基金列表
        console.log(funds.length)
        // 2) 保存本地
        saveToLocal.write(item.task.storePath, funds)
        // 3) 添加到allFunds,统一做上传 mongdo 服务器的操作
        saveToMongo(funds)
        // allFunds.push(funds);
        // allFunds.push.apply(allFunds, funds)
      })
      Analyzer.start()
      // db = new DB()
      // db.save(result)

      console.log('----------------------------')
      // Spider2()
    }
  )
}
module.exports = spider
