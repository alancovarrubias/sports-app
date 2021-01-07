import requests
import json
import os


os.mkdir("data")
games_res = requests.get("http://nba:3001/seasons/1/games?team=1&player=1&line=1")
games_data = json.loads(games_res.text)

with open("data/games.json", "w") as outfile:
    json.dump(games_data, outfile)

game_res = requests.get("http://nba:3001/games/1?team=1&player=1&line=1")
game_data = json.loads(game_res.text)

with open("data/game.json", "w") as outfile:
    json.dump(game_data, outfile)