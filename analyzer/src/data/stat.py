from nba.stat import NbaStat
from helpers import sum_attributes, subtract_attributes


class DataStat:
    def __init__(self, model, previous_size):
        stat = model["stat"]
        self.id = model["id"]
        self.name = model["name"]
        self.model_type = stat["model_type"]
        self.season_stat = stat
        self.previous_stat = stat
        self.previous_stats = [stat]
        self.previous_size = previous_size
        self.count = 1

    def add_model(self, model):
        stat = model["stat"]
        self.season_stat = sum_attributes(NbaStat.attributes, self.season_stat, stat)
        self.count += 1
        self.previous_stats.insert(0, stat)
        self.previous_stat = sum_attributes(
            NbaStat.attributes, self.previous_stat, stat
        )
        if len(self.previous_stats) > self.previous_size:
            last_stat = self.previous_stats.pop()
            self.previous_stat = subtract_attributes(
                NbaStat.attributes, self.previous_stat, last_stat
            )
