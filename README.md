# 金母鹅基金

当前的技术栈中使用了 graphql,对于只有一个人在维护的代码,显得过于复杂了.
并且,时间就了,现在也暂时不能恢复.
放弃这个版本!

## 文档使用说明

README 包含以下内容:
- 项目计划
- 代码模块说明

不包含以下内容:
- 项目说明文档,请看 Notion/workspace/个人项目/GGF

## ToDo

### v 0.1 打底

- [x] #spider 借用代码打底, [fund-crawler](https://github.com/nullpointer/fund-crawler)
- [x] #spider 删除多余代码: 分析模块\保存数据到 github 模块
- [x] #spider 增加模块,将采集的数据,以 csv 的格式保存在本地

### v0.3 观测基金

- [ ] 更新已有基金的当天价格 #API #spider
- [ ] 新添加的基金，更新历史数据 #API #spider
- [ ] 新增观测基金列表，点击单基金,跳转详情页 #web 

### v0.4 持有基金
- [ ] #analysis 4433 法则，筛选目标基金
- [ ] #API 给基金打 4433 标签
- [ ] #API 给基金算4433积分
- [ ] #web 增加 4433 基金列表
- [ ] #analysis 算 4433 积分

## 代码模块说明

本应用包含3个模块
- spider  数据爬虫
- api     数据API
- analysis 数据分析
- admin   web,快速查看数据

###  api


### spider 基金蜘蛛


### sprider 基金分析


购买基金可以参考一个法则：

最近一年、两年、三年、五年及成立以来收益率排名同类基金的前1/4
最近三个月、六个月收益率排名同类基金的前1/3
笔者实现了一个应用，依据上述法则筛选基金，降低广大基民踩雷的风险。


## Reference 参考

### 参考

#### nodejs-fund-crawler

- 用 js 在天天基金网上抓基金数据
- 有一个统计多年排行榜的算法可以参考
https://github.com/nullpointer/fund-crawler