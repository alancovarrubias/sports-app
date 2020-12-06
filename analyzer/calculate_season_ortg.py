from nba.stat import NbaStat
from nba.player import NbaPlayer
from nba.team import NbaTeam
from helpers import sum_stats, read_json
from data_store import DataStore


games = read_json("season_games.json")
store = DataStore()
games = games["data"]
for game in games:
    attributes = game["attributes"]
    away_team = attributes["away_team"]
    home_team = attributes["home_team"]
    away_players = attributes["away_players"]
    home_players = attributes["home_players"]

    store.add_model(away_team)
    store.add_model(home_team)
    for player in away_players:
        store.add_model(player)
    for player in home_players:
        store.add_model(player)
    season_data = store.get_data(away_team)
    season_stat = season_data["season_model"]["stat"]
    count = season_data["count"]
    print(season_stat["sp"])
