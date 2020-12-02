from nba_player_stat import NbaPlayerStat
from nba_team_stat import NbaTeamStat
import json


def read_json(file):
    f = open(file, "r")
    data = json.loads(f.read())
    return data


data = read_json("data.json")
away_team = data["away_team"]
home_team = data["home_team"]
away_players = data["away_players"]
home_players = data["home_players"]


class TestOrtg:
    def test_team_ortg(self):
        away_team_stat = NbaTeamStat(away_team, home_team)
        assert round(away_team_stat.ortg) == away_team["stat"]["ortg"]

    def test_player_ortg(self):
        for player in home_players:
            player_stat = NbaPlayerStat(player, home_team, away_team)
            assert round(player_stat.ortg) == player["stat"]["ortg"]
