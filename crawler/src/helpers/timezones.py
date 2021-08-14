from pytz import timezone


TEAM_TZ = {
    "LAA": "W",
    "BAL": "E",
    "BOS": "E",
    "CHW": "C",
    "CLE": "E",
    "DET": "E",
    "KCR": "C",
    "MIN": "C",
    "NYY": "E",
    "OAK": "W",
    "SEA": "W",
    "TBR": "E",
    "TEX": "C",
    "TOR": "E",
    "ARI": "A",
    "ATL": "E",
    "CHC": "C",
    "CIN": "E",
    "COL": "M",
    "MIA": "E",
    "HOU": "C",
    "LAD": "W",
    "MIL": "C",
    "WSN": "E",
    "NYM": "E",
    "PHI": "E",
    "PIT": "E",
    "STL": "C",
    "SDP": "W",
    "SFG": "W",
}


TZ_KEY = {
    "A": "US/Arizona",
    "W": "US/Pacific",
    "M": "US/Mountain",
    "C": "US/Central",
    "E": "US/Eastern",
}


def get_timezone(team):
    return timezone(TZ_KEY[TEAM_TZ[team]])
