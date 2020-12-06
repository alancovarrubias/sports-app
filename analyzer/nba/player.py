from .player_stat import NbaPlayerStat
from .team_stat import NbaTeamStat


class NbaPlayer:
    def __init__(self, player_json, team_json, opponent_json):
        self.name = player_json["name"]
        player_stat = player_json["stat"]
        team_stat = team_json["stat"]
        opponent_stat = opponent_json["stat"]
        self.stat = NbaPlayerStat(player_stat, team_stat, opponent_stat)

    def __getattr__(self, name):
        return getattr(self.stat, name)