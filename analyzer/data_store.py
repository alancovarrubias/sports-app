from nba.stat import NbaStat
from helpers import combine_stats


def get_data_from_map(map, model):
    id = model["id"]
    if id not in map:
        return None
    return map[id]


def add_model_to_map(map, model):
    id = model["id"]
    if id not in map:
        map[id] = {"season_model": model, "count": 1}
    else:
        map[id]["count"] += 1
        season_model = map[id]["season_model"]
        season_model["stat"] = combine_stats(
            season_model["stat"], model["stat"], NbaStat.attributes
        )


class DataStore:
    def __init__(self):
        self.teams = {}
        self.players = {}

    def add_model(self, model):
        model_type = model["stat"]["model_type"]
        if model_type == "Team":
            add_model_to_map(self.teams, model)
        elif model_type == "Player":
            add_model_to_map(self.players, model)

    def get_data(self, model):
        model_type = model["stat"]["model_type"]
        if model_type == "Team":
            return get_data_from_map(self.teams, model)
        elif model_type == "Player":
            return get_data_from_map(self.players, model)
