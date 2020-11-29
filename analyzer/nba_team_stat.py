from nba_team_opponent_stat import NbaTeamOpponentStat


class NbaTeamStat:
    def __init__(self, team_json, opponent_json):
        self.team = NbaTeamOpponentStat(team_json, opponent_json)
        opponent = NbaTeamOpponentStat(opponent_json, team_json)
        self.tot_poss = 0.5 * (
            (
                self.fga
                + 0.4 * self.fta
                - 1.07 * self.orb_percent * (self.fga - self.fg)
                + self.tov
            )
            + (
                opponent.fga
                + 0.4 * opponent.fta
                - 1.07 * opponent.orb_percent * (opponent.fga - opponent.fg)
                + opponent.tov
            )
        )
        self.drtg = 100 * (opponent.pts / self.tot_poss)
        self.ortg = 100 * self.pts / self.tot_poss

    def __getattr__(self, name):
        return getattr(self.team, name)
