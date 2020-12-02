from nba_player_stat import NbaPlayerStat
from nba_team_stat import NbaTeamStat
import json


def assert_ortg(stat, json):
    assert abs(round(stat.ortg) - json["stat"]["ortg"]) <= 1


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
        assert_ortg(away_team_stat, away_team)
        home_team_stat = NbaTeamStat(home_team, away_team)
        assert_ortg(home_team_stat, home_team)

    def test_player_ortg(self):
        for player in away_players:
            player_stat = NbaPlayerStat(player, away_team, home_team)
            assert_ortg(player_stat, player)
        for player in home_players:
            player_stat = NbaPlayerStat(player, home_team, away_team)
            assert_ortg(player_stat, player)
