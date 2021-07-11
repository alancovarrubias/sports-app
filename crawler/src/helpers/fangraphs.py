def get_fangraph_id(team):
    fangraph_dict = {
        "LAA": 1,
        "BAL": 2,
        "BOS": 3,
        "CHW": 4,
        "CLE": 5,
        "DET": 6,
        "KCR": 7,
        "MIN": 8,
        "NYY": 9,
        "OAK": 10,
        "SEA": 11,
        "TBR": 12,
        "TEX": 13,
        "TOR": 14,
        "ARI": 15,
        "ATL": 16,
        "CHC": 17,
        "CIN": 18,
        "COL": 19,
        "MIA": 20,
        "HOU": 21,
        "LAD": 22,
        "MIL": 23,
        "WSN": 24,
        "NYM": 25,
        "PHI": 26,
        "PIT": 27,
        "STL": 28,
        "SDP": 29,
        "SFG": 30,
    }
    return fangraph_dict[team]


def build_endpoint(season, fangraph_id, month, type, stats):
    return f"leaders.aspx?pos=all&stats={stats}&lg=all&qual=0&type={type}&season={season}&month={month}&season1={season}&ind=0&team={fangraph_id}&rost=1&age=0&filter=&players=0&page=1_50"


def build_batting_endpoint(season, fangraph_id, month, type):
    return build_endpoint(season, fangraph_id, month, type, "bat")


def build_handed_batting_endpoint(season, fangraph_id, month):
    return build_batting_endpoint(
        season, fangraph_id, month, "c,5,21,14,16,38,37,50,54,43,44,45"
    )


def build_left_handed_batting_endpoint(season, fangraph_id):
    return build_handed_batting_endpoint(season, fangraph_id, "13")


def build_right_handed_batting_endpoint(season, fangraph_id):
    return build_handed_batting_endpoint(season, fangraph_id, "14")


def build_last_14_batting_endpoint(season, fangraph_id):
    return build_batting_endpoint(
        season, fangraph_id, "2", "c,5,21,14,16,38,37,50,61,43,44,45"
    )


def build_full_season_batting_endpoint(season, fangraph_id):
    return build_batting_endpoint(
        season,
        fangraph_id,
        "0",
        "21",
    )


def build_pitching_endpoint(season, fangraph_id, month, type):
    return build_endpoint(season, fangraph_id, month, type, "pit")


def build_handed_pitching_endpoint(season, fangraph_id, month):
    return build_pitching_endpoint(
        season, fangraph_id, month, "c,36,31,4,14,11,5,38,43,27,47,37,7"
    )


def build_full_season_pitching_endpoint(season, fangraph_id):
    return build_pitching_endpoint(
        season,
        fangraph_id,
        "0",
        "c,13,-1,229,230,231,234,226,235,228,118,122",
    )


def build_left_handed_pitching_endpoint(season, fangraph_id):
    return build_handed_pitching_endpoint(season, fangraph_id, "13")


def build_right_handed_pitching_endpoint(season, fangraph_id):
    return build_handed_pitching_endpoint(season, fangraph_id, "14")


def build_last_30_pitching_endpoint(season, fangraph_id):
    return build_pitching_endpoint(season, fangraph_id, "3", "c,47,42,13,24,19,122")