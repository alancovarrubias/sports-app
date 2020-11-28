import requests
import json

res = requests.get("http://nba:3001/seasons")
data = json.loads(res.text)["data"]

print(data)
