const string =
  "<table class='w782 comm lsjz'><thead><tr><th class='first'>净值日期</th><th>单位净值</th><th>累计净值</th><th>日增长率</th><th>申购状态</th><th>赎回状态</th><th class='tor last'>分红送配</th></tr></thead><tbody><tr><td>2021-01-22</td><td class='tor bold'>2.2409</td><td class='tor bold'>2.2409</td><td class='tor bold grn'>-0.77%</td><td>开放申购</td><td>开放赎回</td><td class='red unbold'></td></tr></tbody></table>"

var string2 = string.split('</thead><tbody>')[1]

var re = /[^<>]+(?=<\/)/g
var result = string2.match(re)
console.log(result)
result.forEach(function ($var) {
  console.log($var)
})
console.log(result)
