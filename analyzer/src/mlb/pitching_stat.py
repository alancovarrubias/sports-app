class MlbPitchingStat:
    attributes = [
        "ip",
        "h",
        "r",
        "er",
        "bb",
        "so",
        "hr",
        "era",
        "fb",
        "ld",
        "gb",
    ]

    def __init__(self, stat):
        for attr in MlbPitchingStat.attributes:
            setattr(self, attr, stat[attr])