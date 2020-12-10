const Log = require('./log')
const { Parser } = require('json2csv');
var iconv = require('iconv-lite');
const fs = require('fs-extra')


function getGitHubPersonalAccessToken() {
    return process.env.TOKEN;
}

class LocalFileSave {
    constructor(path, content) {
        this.path = path
        this.content = content
        this.tryTimes = 0
    }
}
class DBTaskQueue {

    constructor() {
        this.dbTasks = []
        this.isRunning = false;
    }

    addDBTask(dbTask) {
        if (dbTask.tryTimes > 2) {
            // Reach the max try times, abort
            return
        }

        dbTask.tryTimes++
        this.dbTasks.push(dbTask)

        this.schedule()
    }

    hasNext() {
        return this.dbTasks.length > 0
    }

    schedule() {
        if (this.isRunning) {
            return;
        }

        if (this.hasNext()) {
            this.isRunning = true

            // Run the first task
            var dbTask = this.dbTasks.pop()
            dbTask.run().then(success => {
                if (!success) {
                    // Failed, add task again to the queue for retry
                    this.addDBTask(dbTask)
                }

                // Contine to schedule
                this.isRunning = false
                this.schedule()
            })
        } else {
            // No task left
            this.isRunning = false
        }
    }
}

class DBTask {
    constructor(path, content) {
        this.path = path
        this.content = content
        this.tryTimes = 0
    }

    run() {
        Log.info('Schedule DB task: ' + this.path + ', try times = ' + this.tryTimes) // 写日志
        /// 声明导出的字段
        const fields = [
            {
              label: "code",  // 字段的标题
              value: "code"  // 对应的 字段
            },
            {
              label: "name",
              value: "name"
            },
            {
                label: "day",
                value: "day"
              },
              {
                label: "unitNetWorth",
                value: "unitNetWorth"
              },
              {
                label: "dayOfGrowth",
                value: "dayOfGrowth"
              },
              {
                label: "recent1Week",
                value: "recent1Week"
              },
              {
                label: "recent3Month",
                value: "recent3Month"
              },
              {
                label: "recent6Month",
                value: "recent6Month"
              },
              {
                label: "recent1Year",
                value: "recent1Year"
              },
              {
                label: "recent2Year",
                value: "recent2Year"
              },
              {
                label: "recent3Year",
                value: "recent3Year"
              },
              {
                label: "fromThisYear",
                value: "fromThisYear"
              },
              {
                label: "fromBuild",
                value: "fromBuild"
              },
              {
                label: "serviceCharge",
                value: "serviceCharge"
              }
            
            ];
        /// 接口数据转换
        const json2csvParser = new Parser({fields});
        const csv = json2csvParser.parse(this.content);
        // console.log(csv);

        /// 数据编码调整
        // let csvBuf = new Buffer(csv);
        let csvBuf = Buffer.from(csv)  

        var str = iconv.decode(csvBuf, "utf-8");
        var str2 = iconv.encode(str, "gbk");
        ///  TODO: 下一步要对接 api,存到 mongodb
        ///  文件导出, 暂时保存在本地
        fs.outputFileSync('records/' + this.path, str2);

        
        // githubDB.writeFileContent(this.path, this.content).then(response => {
        //     if (response.status >= 200 && response.status <= 300) {
        //         Log.success('Succeed to write ' + this.path)
        //         return Promise.resolve(true)
        //     } else {
        //         Log.error('Failed to write ' + this.path + ' status = ' + response.status)
        //         return Promise.resolve(false)               
        //     }
        // }).catch(err => {
        //     Log.error('Failed to write ' + this.path + ' err = ' + err)
        //     return Promise.resolve(false)
        // })
        // return true
        return Promise.resolve(true)
    }
}

const queue = new DBTaskQueue()

// insert or update
exports.write = function(path, content) {
    var dbTask = new DBTask(path, content) //创建 DB 任务
    queue.addDBTask(dbTask) // 加入任务队列去排队
}

