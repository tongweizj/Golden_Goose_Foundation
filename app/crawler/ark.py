import requests
from bs4 import BeautifulSoup
import json

# URL for ARK fund data
url = "https://finance.yahoo.com/quote/ARKK/history/"

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

# Send request to the server to get the data
response = requests.get(url,headers=headers)

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.content, "html.parser")

# Find the table with the historical data
table = soup.find("table", {"data-test": "historical-prices"})

# Get the date and closing price of the latest trading day
latest_data = table.tbody.find_all("tr")[0]
date = latest_data.find_all("td")[0].text
closing_price = latest_data.find_all("td")[4].text

# Print the date and closing price
print(f"The latest closing price of ARK Innovation ETF (ARKK) as of {date} is ${closing_price}.")
