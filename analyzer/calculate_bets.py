from nba.stat import NbaStat
from nba.player_stat import NbaPlayerStat
from nba.team_stat import NbaTeamStat
from helpers import read_json
from data_store import DataStore


def predict_ortg(team_data, opponent_data):
    season_stat = NbaTeamStat(team_data.season_stat, opponent_data.season_stat)
    prev_stat = NbaTeamStat(team_data.previous_stat, opponent_data.previous_stat)
    return (season_stat.ortg + prev_stat.ortg) / 2


def predict_tot_poss(team_data, opponent_data):
    season_tot_poss = (
        NbaTeamStat(team_data.season_stat, opponent_data.season_stat).tot_poss
        / team_data.count
    )
    prev_tot_poss = (
        NbaTeamStat(team_data.previous_stat, opponent_data.previous_stat).tot_poss
        / team_data.previous_size
    )
    return (season_tot_poss + prev_tot_poss) / 2


def add_data(data_store, attributes):
    data_store.add_data(attributes["away_team"])
    data_store.add_data(attributes["home_team"])
    for player in attributes["away_players"]:
        data_store.add_data(player)
    for player in attributes["home_players"]:
        data_store.add_data(player)


PREVIOUS_SIZE = 10
data_store = DataStore(PREVIOUS_SIZE)
games = read_json("data/games.json")
games = games["data"]
for game in games:
    attributes = game["attributes"]
    away_team_data = data_store.get_data(attributes["away_team"])
    home_team_data = data_store.get_data(attributes["home_team"])
    if not away_team_data or not home_team_data:
        add_data(data_store, attributes)
        continue
    away_players_data = [
        data_store.get_data(player) for player in attributes["away_players"]
    ]
    home_players_data = [
        data_store.get_data(player) for player in attributes["home_players"]
    ]
    away_team_prev_len = len(away_team_data.previous_stats)
    home_team_prev_len = len(home_team_data.previous_stats)
    prev_len_valid = (
        away_team_prev_len == PREVIOUS_SIZE and home_team_prev_len == PREVIOUS_SIZE
    )
    if not prev_len_valid:
        add_data(data_store, attributes)
        continue
    away_tot_poss = predict_tot_poss(away_team_data, home_team_data)
    home_tot_poss = predict_tot_poss(home_team_data, away_team_data)
    away_ortg = predict_ortg(away_team_data, home_team_data)
    home_ortg = predict_ortg(home_team_data, away_team_data)
    away_score = away_tot_poss * away_ortg / 100
    home_score = home_tot_poss * home_ortg / 100
    add_data(data_store, attributes)
