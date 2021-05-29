from mlb.pitching_stat import MlbPitchingStat
from mlb.batting_stat import MlbBattingStat


class MlbModel:
    def __init__(self, data):
        print(data)
        stat = data["stat"]
        batting = stat["batting"]
        pitching = stat["pitching"]
        self.key = self.get_model_type(batting, pitching) + str(data["id"])
        self.pitching_stat = MlbPitchingStat(pitching) if pitching else None
        self.batting_stat = MlbBattingStat(batting) if batting else None

    def add_model(self, model):
        return

    def get_model_type(self, batting, pitching):
        stat = batting if batting else pitching
        return stat["model_type"]
