from mlb.pitching_stat import MlbPitchingStat
from mlb.batting_stat import MlbBattingStat
import json


class MlbModel:
    def __init__(self):
        self.pitching_stat = MlbPitchingStat()
        self.batting_stat = MlbBattingStat()

    def add_data(self, data):
        stat = data["stat"]
        pitching = stat["pitching"]
        batting = stat["batting"]
        if pitching:
            self.pitching_stat.add_stat(pitching)
        if batting:
            self.batting_stat.add_stat(batting)

    def toJson(self):
        json_string = json.dumps(self, default=lambda o: o.__dict__)
        return json.loads(json_string)