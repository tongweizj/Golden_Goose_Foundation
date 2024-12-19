const DateFormat = require('dateformat')
var today = DateFormat(new Date(), 'yyyy/mm/dd')

function parseFundPrice(data) {
  const jsonObj = parseJsonObject(data.split('data=')[1])
  // console.log(jsonObj.content)
  const string = jsonObj.content.split('</thead><tbody>')[1]
  var re = /[^<>]+(?=<\/)/g
  var result = string.match(re)
  result[3] = result[3].split('%')[0]
  return result
}

module.exports.fundPrice = parseFundPrice

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
module.exports.dataFI = parseDataFI

function parseJsonObject(data) {
  const start = data.indexOf('{')
  const end = data.indexOf('}') + 1
  const jsonStr = data.slice(start, end)
  const jsonObj = eval('(' + jsonStr + ')')

  return jsonObj
}
