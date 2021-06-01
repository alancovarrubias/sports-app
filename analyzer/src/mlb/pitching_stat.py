import json


def calculate_outs(ip):
    full, thirds = str(ip).split(".")
    return int(full) * 3 + int(thirds)


class MlbPitchingStat:
    summables = [
        "h",
        "r",
        "er",
        "bb",
        "so",
        "hr",
    ]
    attributes = summables + [
        "ip",
        # "era",
        # "fb",
        # "ld",
        # "gb",
    ]

    def __init__(self):
        for attr in MlbPitchingStat.attributes:
            setattr(self, attr, 0)

    def add_stat(self, stat):
        for attr in MlbPitchingStat.summables:
            current = getattr(self, attr)
            setattr(self, attr, current + stat[attr])
        self.ip = self.ip + calculate_outs(stat["ip"])

    def toJson(self):
        json_string = json.dumps(self, default=lambda o: o.__dict__)
        return json.loads(json_string)