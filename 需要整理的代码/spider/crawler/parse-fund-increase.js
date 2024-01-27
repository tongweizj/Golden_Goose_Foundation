const DateFormat = require('dateformat')
var today = DateFormat(new Date(), 'yyyy/mm/dd')

function parseDataFI(data, task) {
  const jsonObj = parseJsonObject(data)

  const fundItems = []
  for (const item of jsonObj['datas']) {
    let fundItem = {}
    const fundArray = item.split('|')

    fundItem['code'] = fundArray[0]
    fundItem['name'] = fundArray[1]
    fundItem['type'] = task.type
    fundItem['lastUpdate'] = today
    fundItem['unitNetWorth'] = fundArray[4]
    fundItem['dayOfGrowth'] = fundArray[5]
    fundItem['recent1Week'] = fundArray[6]
    fundItem['recent1Month'] = fundArray[7]
    fundItem['recent3Month'] = fundArray[8]
    fundItem['recent6Month'] = fundArray[9]
    fundItem['recent1Year'] = fundArray[10]
    fundItem['recent2Year'] = fundArray[11]
    fundItem['recent3Year'] = fundArray[12]
    fundItem['fromThisYear'] = fundArray[13]
    fundItem['fromBuild'] = fundArray[14]
    fundItem['serviceCharge'] = fundArray[20]
    fundItems.push(fundItem)
  }
  return fundItems
}

function parseJsonObject(data) {
  const start = data.indexOf('{')
  const end = data.indexOf('}') + 1
  const jsonStr = data.slice(start, end)
  const jsonObj = eval('(' + jsonStr + ')')

  return jsonObj
}
module.exports = parseDataFI
