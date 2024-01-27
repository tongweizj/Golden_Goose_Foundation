const randomUseragent = require('../utils/randomUseragent')
const DateFormat = require('dateformat')
const Util = require('util')

// const logger = require('../utils/log')
const config = require('../config')

// const Crawler = require('crawler')
/**
 * Task
 * TAsk = 采集某一个网站, 甚至特定页面的具体任务
 * 整理出每一次爬虫任务的各个细节
 * 如: 将 keyword 转化成标准可访问的 url
 * callback
 * success 任务状态,默认 false
 *
 * @class Task
 */
class Task {
  constructor(item) {
    this.uri = item.uri
    this.jQuery = false
    this.tryTimes = 0
    this.storePath = item.storePath
    this.headers = randomUseragent()
    this.type = item.type
  }
}
// module.exports = Task;
class TaskQueue {
  constructor() {
    this.tasks = []
    this.count = 0
  }

  static start(uriString, taskList) {
    // 1. Init
    // 2) 初始化 url
    let uri = ''
    // 2. 生成 taskQueue
    var taskQueue = new TaskQueue()
    taskList.forEach(item => {
      // 2) 构造爬取 uri
      uri = Util.format(uriString, item)
      // 3) 创建 task,加入 taskQueue
      taskQueue.addTask(new Task({ uri: uri, type: item }))
    })
    taskQueue.count = taskList.length

    return taskQueue
  }

  list() {
    return this.tasks
  }
  // 在Queue 的最后添加Task
  addTask(task) {
    this.tasks.push(task)
  }
  // 从 TaskQueue 中 取出最后一个任务
  popTask() {
    return this.tasks.pop()
  }

  // 判断Queue是否完成
  hasNext() {
    return this.tasks.length > 0
  }
}
module.exports = TaskQueue
