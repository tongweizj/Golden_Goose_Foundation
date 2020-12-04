import pandas
import datetime
import tushare

# Step1. Get ticker list
# tickersRawData = tushare.get_stock_basics()
pro = tushare.pro_api()
data = pro.query('stock_basic', exchange='', list_status='L', fields='ts_code,symbol,name,area,industry,list_date')
print(data)
# Step2. save to local file
