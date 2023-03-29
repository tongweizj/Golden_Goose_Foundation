module.exports = {
  database: {
    url: 'mongodb://ggfadmin:12345678@192.168.0.100:27017/ggf',
    testUrl: 'mongodb://ggfadmin:12345678@192.168.0.100:27017/ggf'
  },
  api: {
    db: 'http://192.168.0.100:2000/graphql',
    testDb: 'http://127.0.0.1:4000/graphql'
  },
  crawl: {
    rankUri:
      'https://fundapi.eastmoney.com/fundtradenew.aspx?ft=%s&pi=1&pn=10000',
    fundPriceUri:
      'https://fundf10.eastmoney.com/F10DataApi.aspx?type=lsjz&code=%s&page=1&per=1'
  }
}
