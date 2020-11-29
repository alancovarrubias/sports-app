import requests
import json
import numpy as np
from nba_team_stat import NbaTeamStat
from nba_player_stat import NbaPlayerStat

res = requests.get("http://nba:3001/games/1")
game_data = json.loads(res.text)["data"]["attributes"]
away_team = game_data["away_team"]
home_team = game_data["home_team"]
away_players = game_data["away_players"]
home_players = game_data["home_players"]

away_team_stat = NbaTeamStat(away_team, home_team)
away_player_stats = [
    NbaPlayerStat(player, away_team, home_team) for player in away_players
]
