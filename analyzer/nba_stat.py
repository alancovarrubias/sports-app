from helpers import safe_div


class NbaStat:
    def __init__(self, team_json):
        stat = team_json["stat"]
        self.mp = stat["sp"] / 60
        self.ft = stat["ft"]
        self.fta = stat["fta"]
        self.fg = stat["fg"]
        self.fga = stat["fga"]
        self.fg3 = stat["fg3"]
        self.fg3a = stat["fg3a"]
        self.ast = stat["ast"]
        self.orb = stat["orb"]
        self.drb = stat["drb"]
        self.tov = stat["tov"]
        self.pts = stat["pts"]
        self.ft_percent = safe_div(self.ft, self.fta)