class MlbBattingStat:
    attributes = [
        "ab",
        "r",
        "r",
        "h",
        "rbi",
        "bb",
        "so",
        "pa",
        "ba",
        "obp",
        "slg",
        "ops",
        "fb",
        "ld",
        "gb",
    ]

    def __init__(self, stat):
        for attr in MlbBattingStat.attributes:
            setattr(self, attr, stat[attr])