import requests
import json

res = requests.get("http://nba:3001/seasons/1/games?team=1&player=1")
game_data = json.loads(res.text)

with open("season_games.json", "w") as outfile:
    json.dump(game_data, outfile)