from nba.player import NbaPlayer
from nba.team import NbaTeam
from nba.stat import NbaStat
from helpers import sum_stats, read_json


data = read_json("game.json")["data"]["attributes"]
away_team_data = data["away_team"]
home_team_data = data["home_team"]
away_players_data = data["away_players"]
home_players_data = data["home_players"]


def assert_ortg(stat, json):
    assert abs(round(stat.ortg) - json["stat"]["ortg"]) <= 1


class TestOrtg:
    def test_team_ortg(self):
        away_team_stat = NbaTeam(away_team_data, home_team_data)
        assert_ortg(away_team_stat, away_team_data)
        home_team_stat = NbaTeam(home_team_data, away_team_data)
        assert_ortg(home_team_stat, home_team_data)

    def test_player_ortg(self):
        for player in away_players_data:
            player_stat = NbaPlayer(player, away_team_data, home_team_data)
            assert_ortg(player_stat, player)
        for player in home_players_data:
            player_stat = NbaPlayer(player, home_team_data, away_team_data)
            assert_ortg(player_stat, player)

    def test_team_match_player_sum(self):
        away_player_stats = [player["stat"] for player in away_players_data]
        home_player_stats = [player["stat"] for player in home_players_data]
        away_players_sum_data = away_team_data.copy()
        home_players_sum_data = home_team_data.copy()
        away_players_sum_data["stat"] = sum_stats(away_player_stats, NbaStat.attributes)
        home_players_sum_data["stat"] = sum_stats(home_player_stats, NbaStat.attributes)
        away_team_stat = NbaTeam(away_team_data, home_team_data)
        summed_away_players_stat = NbaTeam(away_players_sum_data, home_players_sum_data)
        home_team_stat = NbaTeam(home_team_data, away_team_data)
        summed_home_players_stat = NbaTeam(home_players_sum_data, away_players_sum_data)
        assert away_team_stat.ortg == summed_away_players_stat.ortg
        assert home_team_stat.ortg == summed_home_players_stat.ortg