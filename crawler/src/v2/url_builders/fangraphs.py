BASE = "https://www.fangraphs.com/api/leaders/major-league/data"

TEAM_IDS = {
    "LAA": 1, "BAL": 2, "BOS": 3, "CHW": 4, "CLE": 5, "DET": 6,
    "KCR": 7, "MIN": 8, "NYY": 9, "OAK": 10, "SEA": 11, "TBR": 12,
    "TEX": 13, "TOR": 14, "ARI": 15, "ATL": 16, "CHC": 17, "CIN": 18,
    "COL": 19, "MIA": 20, "HOU": 21, "LAD": 22, "MIL": 23, "WSN": 24,
    "NYM": 25, "PHI": 26, "PIT": 27, "STL": 28, "SDP": 29, "SFG": 30,
}

# fangraphs "month" param encodes the split, not a calendar month
FULL_SEASON = 0
LAST_14 = 2
LAST_30 = 3
VS_LEFT = 13
VS_RIGHT = 14


def _leaders(stats, season, team_id, month):
    return (
        f"{BASE}?pos=all&stats={stats}&lg=all&qual=0"
        f"&season={season}&season1={season}&ind=0&team={team_id}"
        f"&rost=1&month={month}&pageitems=50&pagenum=1"
    )


class FangraphsUrlBuilder:
    def __init__(self, team, season):
        self.team_id = TEAM_IDS[team]
        self.season = season

    def batting_full_season(self):
        return _leaders("bat", self.season, self.team_id, FULL_SEASON)

    def batting_vs_left(self):
        return _leaders("bat", self.season, self.team_id, VS_LEFT)

    def batting_vs_right(self):
        return _leaders("bat", self.season, self.team_id, VS_RIGHT)

    def batting_last_14(self):
        return _leaders("bat", self.season, self.team_id, LAST_14)

    def pitching_full_season(self):
        return _leaders("pit", self.season, self.team_id, FULL_SEASON)

    def pitching_vs_left(self):
        return _leaders("pit", self.season, self.team_id, VS_LEFT)

    def pitching_vs_right(self):
        return _leaders("pit", self.season, self.team_id, VS_RIGHT)

    def pitching_last_30(self):
        return _leaders("pit", self.season, self.team_id, LAST_30)
