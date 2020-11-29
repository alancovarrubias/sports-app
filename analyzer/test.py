import requests
import json
import numpy as np

res = requests.get("http://nba:3001/games/1")
game_data = json.loads(res.text)["data"]["attributes"]
away_team = game_data["away_team"]
home_team = game_data["home_team"]
away_players = game_data["away_players"]
home_players = game_data["home_players"]


def attribute(model, key):
    stat = model["stat"]
    return stat[key]


away_team_attr = attribute(away_team, "pts")
home_team_attr = attribute(home_team, "pts")
away_players_attr = np.array([attribute(player, "pts") for player in away_players])
home_players_attr = np.array([attribute(player, "pts") for player in home_players])
print(np.sum(away_players_attr))
print(away_team_attr)