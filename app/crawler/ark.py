import requests
from bs4 import BeautifulSoup
import json

# 基金代码列表
fund_codes = ['ARKK', 'ARKQ', 'ARKW', 'ARKG', 'ARKF']

# URL for ARK fund data
url = "https://finance.yahoo.com/quote/ARKK/history/"
urls = ['https://finance.yahoo.com/quote/' + code.lower() + "/history/" for code in fund_codes]
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

# Send request to the server to get the data
pages  = [requests.get(url,headers=headers).content for url in urls]

for code,page in zip(fund_codes, pages):
  # Parse the HTML content using BeautifulSoup
  soup = BeautifulSoup(page, "html.parser")

  # Find the table with the historical data
  table = soup.find("table", {"data-test": "historical-prices"})

  # Get the date and closing price of the latest trading day
  latest_data = table.tbody.find_all("tr")[0]
  date = latest_data.find_all("td")[0].text
  closing_price = latest_data.find_all("td")[4].text

  # Print the date and closing price
  print(f"The latest closing price of ARK {code} as of {date} is ${closing_price}.")
  # 构建请求数据
  # data = {
  #     "field_5f456d73c3f1d": "ARKK",
  #     "field_5f456d6ac3f1c": "2022-03-25",
  #     "field_5f456d7cc3f1e": "123.45"
  # }
  data = {"message":{"code":code ,"date":date,"price":closing_price}}
  # # 发送POST请求
  # 构建POST请求的URL
  url = "http://127.0.0.1:5000/api/v1/fund/daily/price"

  # 构建请求头
  headers = {
      "Content-Type": "application/json",
  }
  response = requests.post(url, headers=headers, json=data)

  # # 打印响应内容
  print(response.text)
