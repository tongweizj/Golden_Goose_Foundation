# Smart Fund Tracker 智能基金跟踪工具

这个工具的核心目标,是完成如下三件事:

- 帮助设计土豆理财法的基金组合
- 跟踪组合的涨幅
- 跟踪组合调仓的节奏

## 文档使用说明

README 包含以下内容:

- 项目计划
- 代码模块说明

## 代码模块说明

本应用包含3个模块

- spider  数据爬虫
- api     数据API
- analysis 数据分析
- admin   web,快速查看数据

## 技术栈

- crawler
  - python
- api
  - python flask
- chatbot
  - python
- web
  - nodejs koa
- DB
  - PostgreSQL

## Feature List

## Crawler

- 定时任务, 每天定时抓取目标基金(list)的前一天交易数据
- 临时任务, 一次性抓取特殊基金指定时间段的交易数据

## api

- 接收 crawler 的上传的单基金,单天数据
- 根据时间,发送基金的情况

## chatbot

- 定时任务,发送前一天目标基金的情况
- 

## web

- 基金列表,显示所有基金的情况
- 基金详情,显示某一只基金的情况

## 参考

#### nodejs-fund-crawler

- 用 js 在天天基金网上抓基金数据
- 有一个统计多年排行榜的算法可以参考
https://github.com/nullpointer/fund-crawler