from mlb.store import MlbStore


class Attributes:
    def __init__(self, game):
        self.id = game["id"]
        attributes = game["attributes"]
        self.away_team = attributes["away_team"]
        self.home_team = attributes["home_team"]
        self.away_players = attributes["away_players"]
        self.home_players = attributes["home_players"]


class SeasonStat:
    def __init__(self, games):
        self.games = [Attributes(game) for game in games]
        self.data_store = MlbStore()

    def run(self):
        for game in self.games:
            self.add_game_data(game)
        return self.data_store.get_data()

    def add_game_data(self, game):
        self.data_store.add_data(game.away_team)
        self.data_store.add_data(game.home_team)
        for player in game.away_players:
            self.data_store.add_data(player)
        for player in game.home_players:
            self.data_store.add_data(player)
