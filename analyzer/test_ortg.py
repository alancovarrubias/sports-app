from nba_player_stat import NbaPlayerStat
from nba_team_stat import NbaTeamStat
import json


def read_json(file):
    f = open(file, "r")
    data = json.loads(f.read())
    return data


def test_team_ortg():
    data = read_json("data.json")
    away_team = data["away_team"]
    home_team = data["home_team"]
    away_team_stat = NbaTeamStat(away_team, home_team)
    assert round(away_team_stat.ortg) == away_team["stat"]["ortg"]


def test_player_ortg():
    data = read_json("data.json")
    away_team = data["away_team"]
    home_team = data["home_team"]
    away_players = data["away_players"]
    player = away_players[0]
    print(player)
    player_stat = NbaPlayerStat(player, away_team, home_team)
    assert round(player_stat.ortg) == player["stat"]["ortg"]
