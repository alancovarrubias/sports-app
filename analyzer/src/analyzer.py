from nba.stat import NbaStat
from nba.player_stat import NbaPlayerStat
from nba.team_stat import NbaTeamStat
from helpers import read_json
from data.store import DataStore


def predict_score(team, opponent):
    season_stat = NbaTeamStat(team.season_stat, opponent.season_stat)
    previous_stat = NbaTeamStat(team.previous_stat, opponent.previous_stat)
    ortg = (season_stat.ortg + previous_stat.ortg) / 2
    season_tot_poss = season_stat.tot_poss / team.count
    previous_tot_poss = previous_stat.tot_poss / team.previous_size
    tot_poss = (season_tot_poss + previous_tot_poss) / 2
    return tot_poss * ortg / 100


class Attributes:
    def __init__(self, game):
        self.id = game["id"]
        attributes = game["attributes"]
        self.away_team = attributes["away_team"]
        self.home_team = attributes["home_team"]
        self.away_players = attributes["away_players"]
        self.home_players = attributes["home_players"]


class Analyzer:
    def __init__(self, games, previous_length):
        self.previous_length = previous_length
        self.data_store = DataStore(previous_length)
        self.games = [Attributes(game) for game in games]

    def run(self):
        games_dict = {}
        for game in self.games:
            away_team = self.data_store.get_data(game.away_team)
            home_team = self.data_store.get_data(game.home_team)
            if not away_team or not home_team:
                self.add_game_data(game)
                continue
            enough_away_stats = len(away_team.previous_stats) == self.previous_length
            enough_home_stats = len(home_team.previous_stats) == self.previous_length
            enough_previous_stats = enough_away_stats and enough_home_stats
            if not enough_previous_stats:
                self.add_game_data(game)
                continue
            away_pred = predict_score(away_team, home_team)
            home_pred = predict_score(home_team, away_team)
            games_dict[game.id] = (away_pred, home_pred)
        return games_dict

    def add_game_data(self, game):
        self.data_store.add_data(game.away_team)
        self.data_store.add_data(game.home_team)
        for player in game.away_players:
            self.data_store.add_data(player)
        for player in game.home_players:
            self.data_store.add_data(player)
