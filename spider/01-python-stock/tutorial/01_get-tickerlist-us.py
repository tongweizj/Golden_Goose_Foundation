import requests
import pandas as pd
from datetime import date
import io

# Step1. Get ticker list

# print(dataString.head(5))
# 从 url 读取原始 csv 文件
# url = 'https://old.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download'
# dataString = requests.get(url).content


CSV_FILE_PATH = './data/01-companylist-us.csv'
tickerRawData = pd.read_csv(CSV_FILE_PATH)
# print (tickerRawData)
tickers = tickerRawData['Symbol'].tolist()
# print(tickers)

# Step2. save to local file
today = date.today().strftime("%Y%m%d")
fileName = './data/02-companylist-us-'+ today +'.csv'
tickerRawData.to_csv(fileName, index= False)