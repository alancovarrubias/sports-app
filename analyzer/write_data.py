import requests
import json

res = requests.get("http://nba:3001/games/1")
game_data = json.loads(res.text)["data"]["attributes"]

with open("data.json", "w") as outfile:
    json.dump(game_data, outfile)