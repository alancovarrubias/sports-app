from helpers import safe_div


class NbaStat:
    attributes = [
        "sp",
        "ft",
        "fta",
        "fg",
        "fga",
        "fg3",
        "fg3a",
        "ast",
        "orb",
        "drb",
        "tov",
        "pts",
    ]

    def __init__(self, stat):
        for attr in NbaStat.attributes:
            setattr(self, attr, stat[attr])
        self.mp = self.sp / 60
        self.ft_percent = safe_div(self.ft, self.fta)