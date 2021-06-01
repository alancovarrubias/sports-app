import json


class MlbBattingStat:
    attributes = [
        "ab",
        "r",
        "h",
        "rbi",
        "bb",
        "so",
        "pa",
        # "ba",
        # "obp",
        # "slg",
        # "ops",
        # "fb",
        # "ld",
        # "gb",
    ]

    def __init__(self):
        for attr in MlbBattingStat.attributes:
            setattr(self, attr, 0)

    def add_stat(self, stat):
        for attr in MlbBattingStat.attributes:
            current = getattr(self, attr)
            setattr(self, attr, current + stat[attr])

    def toJson(self):
        json_string = json.dumps(self, default=lambda o: o.__dict__)
        return json.loads(json_string)