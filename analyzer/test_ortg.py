from nba.player_stat import NbaPlayerStat
from nba.team_stat import NbaTeamStat
from nba.stat import NbaStat
from helpers import combine_stats, read_json


data = read_json("data/game.json")["data"]["attributes"]
away_team_stat = data["away_team"]["stat"]
home_team_stat = data["home_team"]["stat"]
away_players = data["away_players"]
home_players = data["home_players"]


def assert_ortg(advanced_stat, stat):
    assert abs(round(advanced_stat.ortg) - stat["ortg"]) <= 1


class TestOrtg:
    def test_team_ortg(self):
        away_team_advanced_stat = NbaTeamStat(away_team_stat, home_team_stat)
        assert_ortg(away_team_advanced_stat, away_team_stat)
        home_team_advanced_stat = NbaTeamStat(home_team_stat, away_team_stat)
        assert_ortg(home_team_advanced_stat, home_team_stat)

    def test_player_ortg(self):
        for player in away_players:
            player_stat = player["stat"]
            player_advanced_stat = NbaPlayerStat(
                player_stat, away_team_stat, home_team_stat
            )
            assert_ortg(player_advanced_stat, player_stat)
        for player in home_players:
            player_stat = player["stat"]
            player_advanced_stat = NbaPlayerStat(
                player_stat, home_team_stat, away_team_stat
            )
            assert_ortg(player_advanced_stat, player_stat)

    def test_team_match_player_sum(self):
        away_player_stats = [player["stat"] for player in away_players]
        home_player_stats = [player["stat"] for player in home_players]
        away_players_sum_stat = combine_stats(away_player_stats, NbaStat.attributes)
        home_players_sum_stat = combine_stats(home_player_stats, NbaStat.attributes)
        away_team_advanced_stat = NbaTeamStat(away_team_stat, home_team_stat)
        away_players_sum_advanced_stat = NbaTeamStat(
            away_players_sum_stat, home_players_sum_stat
        )
        home_team_advanced_stat = NbaTeamStat(home_team_stat, away_team_stat)
        home_players_sum_advanced_stat = NbaTeamStat(
            home_players_sum_stat, away_players_sum_stat
        )
        assert away_team_advanced_stat.ortg == away_players_sum_advanced_stat.ortg
        assert home_team_advanced_stat.ortg == home_players_sum_advanced_stat.ortg