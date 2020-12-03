from nba_team_stat import NbaTeamStat


class NbaTeam:
    def __init__(self, team_json, opponent_json):
        self.name = team_json["name"]
        team_stat = team_json["stat"]
        opponent_stat = opponent_json["stat"]
        self.stat = NbaTeamStat(team_stat, opponent_stat)

    def __getattr__(self, name):
        return getattr(self.stat, name)